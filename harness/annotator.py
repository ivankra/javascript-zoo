# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

from __future__ import annotations

import os
import re
import signal

from .config import EngineConfig
from .data import RunResult, Verdict


# Regex to match JS error constructor names in engine output.
JS_ERROR_NAME_RE = re.compile(
    r"(?<!\bdoes not throw )"
    r"\b([A-Za-z_][A-Za-z0-9_]*Error)\b"
)

# Test262's assert.throws messages. Capture whole message to avoid
# a heuristic from tagging it using the first error class name.
ASSERT_THROWS_RE = re.compile(
    '(?P<message>Expected a ([A-Za-z0-9]*Error) ' +
    '(but got a ([A-Za-z0-9]*Error)' +
    '|but got a different error constructor with the same name' +
    '|to be thrown but no exception was thrown at all' +
    '|to be thrown asynchronously)' +
    r'( \(Testing with [^()]+\))?' +
    ')'
)

DONOTEVALUATE_MESSAGE = "Test262: This statement should not be evaluated."


def verdict_from_js_error(exception_name: str) -> Verdict | None:
    if exception_name == "Error":
        return Verdict.FAIL
    try:
        verdict = Verdict(exception_name)
        return verdict if verdict.value.endswith("Error") else None
    except ValueError:
        return None


class Annotator:
    """Annotates RunResult with verdict_type/verdict_detail."""

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
        pass_pattern: str | None = None,
        fail_pattern: str | None = None,
        expect_async: bool = False,
        negative_phase: str | None = None,
        negative_type: str | None = None,
        strip_line_prefix: str | None = None,
    ) -> RunResult:
        """Classify run outcome; returns the same RunResult with fields set.

        Args:
            pass_pattern:      regex that must match a line for PASS verdict.
            fail_pattern:      regex matching explicit failure lines from the test wrapper.
                               If both pass_pattern and fail_pattern match, test will fail.
            expect_async:      require Test262:AsyncTestComplete token (test262).
            negative_phase:    expected failure phase for negative tests ("parse", "resolution", "runtime").
            negative_type:     expected JS error constructor name for negative tests (e.g. "SyntaxError").
            strip_line_prefix: fixed string prefix stripped from the start of each error
                               message line (e.g. "test/foo.js: " added by test wrappers).
        """
        self._classify_impl(run, pass_pattern=pass_pattern, fail_pattern=fail_pattern,
                            expect_async=expect_async, strip_line_prefix=strip_line_prefix)

        if negative_type:
            self._check_negative(run, negative_phase=negative_phase, negative_type=negative_type)

        return run

    def _classify_impl(
        self,
        run: RunResult,
        *,
        pass_pattern: str | None = None,
        fail_pattern: str | None = None,
        expect_async: bool = False,
        strip_line_prefix: str | None = None,
    ) -> None:
        # Produce cleaned streams by applying engine-specific replacements.
        run.stdout_cleaned = apply_replacements(run.stdout or "", self._stdout_replace)
        run.stderr_cleaned = apply_replacements(run.stderr or "", self._stderr_replace)

        # Timeout and OOM were already classified by Runner.
        if run.verdict_type in (Verdict.TIMEOUT, Verdict.OOM):
            return

        # Clear any stale classification from Runner.
        run.verdict_type = None
        run.verdict_detail = None

        # Crash = negative exit code (terminated by signal).
        if run.exit_code is not None and run.exit_code < 0 and \
                not (self._config.ignore_sigabrt and run.exit_code == -6):
            run.verdict_type = Verdict.CRASH
            signum = -run.exit_code
            try:
                run.verdict_detail = signal.Signals(signum).name
            except ValueError:
                run.verdict_detail = f"signal {signum}"
            return

        # Check for runtime panic messages
        exc = (self._match_exception(run.stderr_cleaned or "", self._crash_cres) or
               self._match_exception(run.stdout_cleaned or "", self._crash_cres))
        if exc:
            run.verdict_type = Verdict.CRASH
            run.verdict_detail = exc[1]
            self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return

        output = run.combined_output().strip()
        lines = output.splitlines()
        pass_required = pass_pattern is not None
        pass_found = bool(pass_pattern and any(re.search(pass_pattern, ln) for ln in lines))
        fail_found = bool(fail_pattern and any(re.search(fail_pattern, ln) for ln in lines))

        errors = (self._collect_errors(run.stderr_cleaned or "", self._errors_cres) +
                  self._collect_errors(run.stdout_cleaned or "", self._errors_cres))
        test262_error = any(e[0] == Verdict.TEST262_ERROR for e in errors)

        # test262 async protocol
        if expect_async:
            if "Test262:AsyncTestFailure:" in output:
                m = re.search(r"Test262:AsyncTestFailure:\s*(.*)", output)
                run.verdict_type = Verdict.ASYNC_TEST_FAILURE
                run.verdict_detail = m.group(1).strip() if m else None
                # Strip redundant "Test262Error: " prefixes from message
                while run.verdict_detail and run.verdict_detail.startswith("Test262Error:"):
                    run.verdict_detail = run.verdict_detail[len("Test262Error:"):].strip()
                self._shorten_message(run, strip_line_prefix=strip_line_prefix)
                return

            pass_found = ("Test262:AsyncTestComplete" in output) and (pass_found or not pass_required)
            pass_required = True

        if pass_found and fail_found:
            run.verdict_type = Verdict.FAIL
            run.verdict_detail = "found both pass and fail markers"
            return

        # pass_found means the script ran to completion (ScriptExecutionFinished
        # printed at the end).  Errors in output are likely incidental — caught
        # exceptions, subprocess/module output, or engine warnings.
        # E.g. test/built-ins/ShadowRealm/prototype/importValue/throws-typeerror-import-syntax-error.js
        # must pass despite reporting SyntaxError in an imported module.
        # Do not ignore Test262Error's however here
        # e.g. libjs test/language/module-code/instn-named-bndng-var.js
        if pass_found and not fail_found and not test262_error:
            run.verdict_type = Verdict.PASS
            return

        if errors:
            best_et, best_msg = errors[0]
            for et, msg in errors:
                if et != Verdict.FAIL:
                    best_et, best_msg = et, msg
                    break
            msgs = [msg for _, msg in errors if msg]
            run.verdict_type = best_et
            run.verdict_detail = "\n".join(msgs) if msgs else None
            if run.verdict_detail and DONOTEVALUATE_MESSAGE in run.verdict_detail:
                run.verdict_type = Verdict.DONOTEVALUATE
                run.verdict_detail = None
            self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return

        # Lower priority after primary exception patterns:
        # kiesel prints source line with DONOTEVALUATE_MESSAGE, then SyntaxError line.
        if DONOTEVALUATE_MESSAGE in output:
            run.verdict_type = Verdict.DONOTEVALUATE
            return

        # Heuristic: scan output lines for the first JS error class name.
        for line in output.splitlines():
            line_filt = line.removeprefix(strip_line_prefix or '')
            if run.test_path:
                line_filt = line.replace(os.path.basename(run.test_path), "<test>")

            for m in ASSERT_THROWS_RE.finditer(line_filt):
                run.verdict_type = Verdict.TEST262_ERROR
                run.verdict_detail = m.group(1)
                return

            for m in JS_ERROR_NAME_RE.finditer(line_filt):
                js_exc = verdict_from_js_error(m.group(1))
                if js_exc is not None:
                    run.verdict_type = js_exc
                    run.verdict_detail = line
                    self._shorten_message(run, strip_line_prefix=strip_line_prefix)
                    return

        if fail_found or (pass_required and not pass_found):
            run.verdict_type = Verdict.FAIL
            if expect_async and "Test262:AsyncTestComplete" not in output:
                run.verdict_type = Verdict.NO_ASYNC_TEST_COMPLETE
            else:
                run.verdict_detail = output or None
                self._shorten_message(run, strip_line_prefix=strip_line_prefix)
            return

        # TODO: fix Promise.prototype.finally.js - many engines pass with non-zero exit code
        assert run.exit_code is not None
        if run.exit_code != 0 and 'es2018/Promise.prototype.finally.js' not in (run.test_path or ''):
            run.verdict_type = Verdict.EXIT
            run.verdict_detail = str(run.exit_code)
            if self._config.exit_code_for_syntax_error == run.exit_code:
                run.verdict_type = Verdict.SYNTAX_ERROR
                run.verdict_detail = f"exit code {run.exit_code}"
            return

        run.verdict_type = Verdict.PASS

    def _check_negative(
        self,
        run: RunResult,
        *,
        negative_phase: str | None,
        negative_type: str,
    ) -> None:
        """Post-classify check for negative tests. Mutates run in place."""
        assert run.verdict_type is not None
        if run.verdict_type in (Verdict.TIMEOUT, Verdict.CRASH, Verdict.OOM):
            return

        # if negative_phase in ("parse", "resolution"):
        if run.is_passed():
            run.verdict_type = Verdict.NEGATIVE
            run.verdict_detail = f"NOT({negative_type}): PASS"
            return

        got = run.verdict_type
        got_message = run.verdict_message()
        expected = verdict_from_js_error(negative_type)
        assert expected is not None, f"Unknown negative.type in test262 frontmatter: {negative_type}"

        # Heuristic: accept exit code as a substitute error type for
        # negative tests when the engine doesn't format the error properly.
        if got != expected and run.verdict_type == Verdict.EXIT:
            if expected == Verdict.SYNTAX_ERROR and self._config.exit_code_may_be_syntax_error == run.exit_code:
                got = Verdict.SYNTAX_ERROR
            elif expected == Verdict.TEST262_ERROR and self._config.exit_code_may_be_test262_error == run.exit_code:
                got = Verdict.TEST262_ERROR

        if got != expected:
            run.verdict_type = Verdict.NEGATIVE
            run.verdict_detail = f"NOT({negative_type}): {got_message}"
            return

        run.verdict_type = Verdict.PASS
        run.verdict_detail = None

    def _collect_errors(
        self, text: str, cres: list[re.Pattern[str]]
    ) -> list[tuple[Verdict, str | None]]:
        """Collect all structured error matches from text lines."""
        results = []
        for line in text.splitlines():
            for cre in cres:
                m = cre.search(line)
                if m:
                    raw_type = m.group("type") if "type" in cre.groupindex else None
                    et = verdict_from_js_error(raw_type) if raw_type else None
                    message = m.group("message") if "message" in cre.groupindex else None
                    if et is None:
                        if raw_type:
                            message = f"{raw_type}: {message}" if message else raw_type
                        results.append((Verdict.FAIL, message or None))
                    else:
                        results.append((et, message or None))
                    break
        return results

    def _match_exception(
        self, text: str, cres: list[re.Pattern[str]]
    ) -> tuple[Verdict, str | None] | None:
        """Return the first structured exception match, or None."""
        matches = self._collect_errors(text, cres)
        return matches[0] if matches else None

    def _shorten_message(self, run: RunResult, *, strip_line_prefix: str | None = None) -> None:
        if not run.verdict_detail:
            return

        # Strip per-line prefix, drop empty lines, dedup, flatten to a single line
        lines = run.verdict_detail.splitlines()
        if strip_line_prefix:
            lines = [ln[len(strip_line_prefix):] if ln.startswith(strip_line_prefix) else ln
                     for ln in lines]
        lines = [ln.strip() for ln in lines]
        lines = [ln for (i, ln) in enumerate(lines)
                 if ln.lower() not in ('', 'failed', 'error', 'undefined') and (i == 0 or ln != lines[i-1])]
        run.verdict_detail = '; '.join(lines)

        # Shorten full absolute script path in messages to just
        # the basename of the original test file to keep messages
        # short and consistent between runs.
        for path in [run.script_path, run.test_path]:
            if path and path.startswith('/') and path in run.verdict_detail:
                run.verdict_detail = run.verdict_detail.replace(path, os.path.basename(run.test_path or path))

        # Replace temp script basename (from assembler.py: "t262-{os.getpid()}.{...}")
        # with the basename of the original test filename
        if run.script_path and run.test_path and '/t262-' in run.script_path:
            run.verdict_detail = run.verdict_detail.replace(os.path.basename(run.script_path), os.path.basename(run.test_path))

        # Strip staging root (temp dir or --stage-dir) from module paths
        # to keep error messages short and consistent between runs.
        if run.cwd:
            assert run.cwd.startswith('/'), f"cwd must be absolute: {run.cwd}"
            cwd_slash = run.cwd + '/'
            run.verdict_detail = run.verdict_detail.replace('file://' + cwd_slash, '')
            run.verdict_detail = run.verdict_detail.replace(cwd_slash, '')

        while True:
            message = run.verdict_detail
            assert message is not None
            lowered = message.lower()
            for prefix in ("error:", "failed:"):
                if lowered.startswith(prefix):
                    run.verdict_detail = message[len(prefix):].strip()
                    break
            else:
                break

        if run.verdict_type and run.verdict_type.endswith('Error') and run.verdict_detail.startswith(run.verdict_type + ':'):
            run.verdict_detail = run.verdict_detail[len(run.verdict_type)+1:].strip()

        # Collapse tautological pairs like "SyntaxError: syntax error".
        if run.verdict_type == Verdict.SYNTAX_ERROR and run.verdict_detail.lower() == 'syntax error':
            run.verdict_detail = ''

        run.verdict_detail = run.verdict_detail.strip()
        if len(run.verdict_detail) > 200:
            run.verdict_detail = run.verdict_detail[:200] + '...'

        if run.verdict_detail and run.verdict_detail.lower() in ('ok', 'pass', 'error', 'fail', 'failed', 'skipped'):
            run.verdict_detail = ''

        if run.verdict_detail == str(run.verdict_type):
            run.verdict_detail = ''

        if not run.verdict_detail:
            run.verdict_detail = None


def apply_replacements(text: str, replacements: list[tuple[re.Pattern[str], str]]) -> str:
    """Apply regex substitutions to text, then drop lines that became empty."""
    if not replacements or not text:
        return text
    for cre, repl in replacements:
        text = cre.sub(repl, text)
    lines = [ln.rstrip() for ln in text.splitlines() if ln.strip()]
    return "\n".join(lines) + "\n" if lines else ""
