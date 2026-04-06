# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import os
import re
import signal

from .config import EngineConfig
from .runner import ErrorType, RunResult, Verdict


# Regex to match JS error constructor names in engine output.
_JS_ERROR_NAME_RE = re.compile(
        r"(?<!\bdoes not throw )"
        r"\b([A-Za-z_][A-Za-z0-9_]*Error)\b"
)


class Annotator:
    """Annotates RunResult with verdict/error_type/error_message."""

    # Strip ANSI escape sequences (CSI codes) from all engine output by default.
    _ANSI_RE = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")

    def __init__(self, config: EngineConfig) -> None:
        self._config = config
        self._errors_cres = [re.compile(p) for p in config.errors_re]
        self._crash_cres = [re.compile(p) for p in config.crash_re]

        # Pattern coming from conformance/compat-table test's wrapper
        kangax_re = re.compile('(?:kangax|compat-table/|es[0-9])[^ :]+: exception: (?P<type>[A-Za-z]*Error)(?:: )?(?P<message>.*?)$')
        self._errors_cres.append(kangax_re)

        src = config.stdout_replace_re
        user = [(re.compile(p, re.MULTILINE), r) for d in (src if isinstance(src, list) else [src]) for p, r in d.items()]
        self._stdout_replace: list[tuple[re.Pattern[str], str]] = [(self._ANSI_RE, "")] + user
        src = config.stderr_replace_re
        user = [(re.compile(p, re.MULTILINE), r) for d in (src if isinstance(src, list) else [src]) for p, r in d.items()]
        self._stderr_replace: list[tuple[re.Pattern[str], str]] = [(self._ANSI_RE, "")] + user

    def classify(
        self,
        run: RunResult,
        *,
        ok_pattern: str | None = None,
        fail_pattern: str | None = None,
        expect_async: bool = False,
        negative_phase: str | None = None,
        negative_type: str | None = None,
        strip_line_prefix: str | None = None,
    ) -> RunResult:
        """Classify run outcome; returns the same RunResult with fields set.

        Args:
            ok_pattern:        regex that must match a line for OK verdict.
            fail_pattern:      regex matching explicit failure lines from the test wrapper.
                               If both ok_pattern and fail_pattern match, test will fail.
            expect_async:      require Test262:AsyncTestComplete token (test262).
            negative_phase:    expected failure phase for negative tests ("parse", "resolution", "runtime").
            negative_type:     expected JS error constructor name for negative tests (e.g. "SyntaxError").
            strip_line_prefix: fixed string prefix stripped from the start of each error
                               message line (e.g. "test/foo.js: " added by test wrappers).
        """
        self._classify_impl(run, ok_pattern=ok_pattern, fail_pattern=fail_pattern,
                            expect_async=expect_async, strip_line_prefix=strip_line_prefix)

        if negative_type:
            self._check_negative(run, negative_phase=negative_phase, negative_type=negative_type)

        return run

    def _classify_impl(
        self,
        run: RunResult,
        *,
        ok_pattern: str | None = None,
        fail_pattern: str | None = None,
        expect_async: bool = False,
        strip_line_prefix: str | None = None,
    ) -> None:
        # Produce cleaned streams by applying engine-specific replacements.
        run.stdout_cleaned = apply_replacements(run.stdout or "", self._stdout_replace)
        run.stderr_cleaned = apply_replacements(run.stderr or "", self._stderr_replace)

        # Timeout and OOM were already classified by Runner.
        if run.error_type in (ErrorType.TIMEOUT, ErrorType.OOM):
            run.verdict = Verdict.FAILED
            return

        # Clear any stale classification from Runner.
        run.error_type = None
        run.error_message = None

        # Crash = negative exit code (terminated by signal).
        if run.exit_code is not None and run.exit_code < 0 and \
                not (self._config.ignore_sigabrt and run.exit_code == -6):
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.CRASHED
            signum = -run.exit_code
            try:
                run.error_message = signal.Signals(signum).name
            except ValueError:
                run.error_message = f"signal {signum}"
            return

        # Check for runtime panic messages
        exc = (self._match_exception(run.stderr_cleaned or "", self._crash_cres) or
               self._match_exception(run.stdout_cleaned or "", self._crash_cres))
        if exc:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.CRASHED
            run.error_message = exc[1]
            self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return

        output = run.combined_output().strip()
        lines = output.splitlines()
        ok_required = ok_pattern is not None
        ok_found = bool(ok_pattern and any(re.search(ok_pattern, ln) for ln in lines))
        fail_found = bool(fail_pattern and any(re.search(fail_pattern, ln) for ln in lines))

        errors = (self._collect_errors(run.stderr_cleaned or "", self._errors_cres) +
                  self._collect_errors(run.stdout_cleaned or "", self._errors_cres))
        test262_error = any(e[0] == ErrorType.TEST262_ERROR for e in errors)

        if "Test262: This statement should not be evaluated." in output:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.DONOTEVALUATE
            return

        # test262 async protocol
        if expect_async:
            if "Test262:AsyncTestFailure:" in output:
                m = re.search(r"Test262:AsyncTestFailure:\s*(.*)", output)
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.ASYNC_TEST_FAILURE
                run.error_message = m.group(1).strip() if m else None
                # Strip redundant "Test262Error: " prefixes from message
                while run.error_message and run.error_message.startswith("Test262Error:"):
                    run.error_message = run.error_message[len("Test262Error:"):].strip()
                return

            ok_found = ("Test262:AsyncTestComplete" in output) and (ok_found or not ok_required)
            ok_required = True

        if ok_found and fail_found:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.GENERIC
            run.error_message = "found both ok and fail markers"
            return

        # ok_found means the script ran to completion (ScriptExecutionFinished
        # printed at the end).  Errors in output are likely incidental — caught
        # exceptions, subprocess/module output, or engine warnings.
        # E.g. test/built-ins/ShadowRealm/prototype/importValue/throws-typeerror-import-syntax-error.js
        # must pass despite reporting SyntaxError in an imported module.
        # Do not ignore Test262Error's however here
        # e.g. libjs test/language/module-code/instn-named-bndng-var.js
        if ok_found and not fail_found and not test262_error:
            run.verdict = Verdict.OK
            return

        if errors:
            best_et, best_msg = errors[0]
            for et, msg in errors:
                if et != ErrorType.GENERIC:
                    best_et, best_msg = et, msg
                    break
            msgs = [msg for _, msg in errors if msg]
            run.verdict = Verdict.FAILED
            run.error_type = best_et
            run.error_message = "\n".join(msgs) if msgs else None
            self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return

        # Heuristic: scan output lines for the first JS error class name.
        for line in output.splitlines():
            line_filt = line.removeprefix(strip_line_prefix or '')
            if run.test_path:
                line_filt = line.replace(os.path.basename(run.test_path), "<test>")
            for m in _JS_ERROR_NAME_RE.finditer(line_filt):
                js_exc = ErrorType.from_js_error(m.group(1))
                if js_exc is not None:
                    run.verdict = Verdict.FAILED
                    run.error_type = js_exc
                    run.error_message = line
                    self._shorten_message(run, strip_line_prefix=strip_line_prefix)
                    return

        if fail_found or (ok_required and not ok_found):
            run.verdict = Verdict.FAILED
            if expect_async and "Test262:AsyncTestComplete" not in output:
                run.error_type = ErrorType.NO_ASYNC_TEST_COMPLETE
            else:
                run.error_type = ErrorType.GENERIC
                run.error_message = output or None
                self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return

        # TODO: fix Promise.prototype.finally.js - many engines pass with non-zero exit code
        assert run.exit_code is not None
        if run.exit_code != 0 and 'es2018/Promise.prototype.finally.js' not in (run.test_path or ''):
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.EXIT
            run.error_message = f"exit code {run.exit_code}"
            if self._config.exit_code_for_syntax_error == run.exit_code:
                run.error_type = ErrorType.SYNTAX_ERROR
                run.error_message = f"exit code {run.exit_code}"
            return

        run.verdict = Verdict.OK

    def _check_negative(
        self,
        run: RunResult,
        *,
        negative_phase: str | None,
        negative_type: str,
    ) -> None:
        """Post-classify check for negative tests. Mutates run in place."""
        if run.error_type in (ErrorType.TIMEOUT, ErrorType.CRASHED, ErrorType.OOM):
            return

        if negative_phase in ("parse", "resolution"):
            if run.error_type is None:
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.NEGATIVE
                run.error_message = "negative test did not fail"
                return

        if run.error_type is not None:
            got = run.error_type
            got_message = run.verdict_message()
            expected = ErrorType.from_js_error(negative_type)
            assert expected is not None, f"Unknown negative.type in test262 frontmatter: {negative_type}"

            # Heuristic: accept exit code as a substitute error type for
            # negative tests when the engine doesn't format the error properly.
            if got != expected and run.error_type == ErrorType.EXIT:
                if expected == ErrorType.SYNTAX_ERROR and self._config.exit_code_may_be_syntax_error == run.exit_code:
                    got = ErrorType.SYNTAX_ERROR
                elif expected == ErrorType.TEST262_ERROR and self._config.exit_code_may_be_test262_error == run.exit_code:
                    got = ErrorType.TEST262_ERROR

            if got != expected:
                run.error_message = f"expected {negative_type}, got: {got_message}"
                run.verdict = Verdict.FAILED
                run.error_type = ErrorType.NEGATIVE
                return
        else:
            run.verdict = Verdict.FAILED
            run.error_type = ErrorType.NEGATIVE
            run.error_message = "expected error not thrown"
            return

        run.verdict = Verdict.OK
        run.error_type = None
        run.error_message = None

    def _collect_errors(
        self, text: str, cres: list[re.Pattern[str]]
    ) -> list[tuple[ErrorType, str | None]]:
        """Collect all structured error matches from text lines."""
        results = []
        for line in text.splitlines():
            for cre in cres:
                m = cre.search(line)
                if m:
                    raw_type = m.group("type") if "type" in cre.groupindex else None
                    et = ErrorType.from_js_error(raw_type) if raw_type else None
                    message = m.group("message") if "message" in cre.groupindex else None
                    if et is None:
                        if raw_type:
                            message = f"{raw_type}: {message}" if message else raw_type
                        results.append((ErrorType.GENERIC, message or None))
                    else:
                        results.append((et, message or None))
                    break
        return results

    def _match_exception(
        self, text: str, cres: list[re.Pattern[str]]
    ) -> tuple[ErrorType, str | None] | None:
        """Return the first structured exception match, or None."""
        matches = self._collect_errors(text, cres)
        return matches[0] if matches else None

    def _shorten_message(self, run: RunResult, *, strip_line_prefix: str | None = None) -> None:
        if not run.error_message:
            return

        # Strip per-line prefix, drop empty lines, dedup, flatten to a single line
        lines = run.error_message.splitlines()
        if strip_line_prefix:
            lines = [ln[len(strip_line_prefix):] if ln.startswith(strip_line_prefix) else ln
                     for ln in lines]
        lines = [ln.strip() for ln in lines]
        lines = [ln for (i, ln) in enumerate(lines)
                 if ln.lower() not in ('', 'failed', 'error', 'undefined') and (i == 0 or ln != lines[i-1])]
        run.error_message = '; '.join(lines)

        # Shorten full absolute script path in messages to just
        # the basename of the original test file to keep messages
        # short and consistent between runs.
        for path in [run.script_path, run.test_path]:
            if path and path.startswith('/') and path in run.error_message:
                run.error_message = run.error_message.replace(path, os.path.basename(run.test_path or path))

        # Replace temporary script basename (from test262.py) with
        # the basename of the original test filename
        if 't262-temp-' in run.error_message and run.test_path:
            run.error_message = re.sub(
                    't262-temp-[a-z0-9-]+[.]js',
                    os.path.basename(run.test_path),
                    run.error_message
            )

        # Strip staging root (temp dir or --stage-dir) from module paths
        # to keep error messages short and consistent between runs.
        if run.cwd:
            assert run.cwd.startswith('/'), f"cwd must be absolute: {run.cwd}"
            cwd_slash = run.cwd + '/'
            run.error_message = run.error_message.replace('file://' + cwd_slash, '')
            run.error_message = run.error_message.replace(cwd_slash, '')

        while True:
            message = run.error_message
            assert message is not None
            lowered = message.lower()
            for prefix in ("error:", "failed:"):
                if lowered.startswith(prefix):
                    run.error_message = message[len(prefix):].strip()
                    break
            else:
                break

        if run.error_type and run.error_type.endswith('Error') and run.error_message.startswith(run.error_type + ':'):
            run.error_message = run.error_message[len(run.error_type)+1:].strip()

        # Collapse tautological pairs like "SyntaxError: syntax error".
        if run.error_type == ErrorType.SYNTAX_ERROR and run.error_message.lower() == 'syntax error':
            run.error_message = ''

        run.error_message = run.error_message.strip()
        if len(run.error_message) > 200:
            run.error_message = run.error_message[:200] + '...'

        if run.error_message and run.error_message.lower() in ('ok', 'error', 'fail', 'failed', 'skipped', str(run.error_type)):
            run.error_message = None

        if not run.error_message:
            run.error_message = None


def apply_replacements(text: str, replacements: list[tuple[re.Pattern[str], str]]) -> str:
    """Apply regex substitutions to text, then drop lines that became empty."""
    if not replacements or not text:
        return text
    for cre, repl in replacements:
        text = cre.sub(repl, text)
    lines = [ln.rstrip() for ln in text.splitlines() if ln.strip()]
    return "\n".join(lines) + "\n" if lines else ""
