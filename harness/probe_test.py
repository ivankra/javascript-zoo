# SPDX-License-Identifier: MIT

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from harness.config import EngineConfig
from harness.probe import DEFAULT_TEST262_DIR, run_script_probes, split_engine_and_script_args


class ProbeCliTest(unittest.TestCase):
    def test_split_engine_and_script_args_without_scripts(self) -> None:
        engines, scripts = split_engine_and_script_args(["-j", "2", "node"])
        self.assertEqual(engines, ["-j", "2", "node"])
        self.assertEqual(scripts, [])

    def test_split_engine_and_script_args_with_scripts(self) -> None:
        engines, scripts = split_engine_and_script_args([
            "-c", "node", "dist/v8", "dist/jsc", "--", "conformance/es5/Array.isArray.js",
        ])
        self.assertEqual(engines, ["-c", "node", "dist/v8", "dist/jsc"])
        self.assertEqual(scripts, ["conformance/es5/Array.isArray.js"])


class ProbeScriptTest(unittest.TestCase):
    def test_conformance_script_probe(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            binary = Path(td) / "probe-fake-engine"
            binary.write_text(
                "#!/bin/sh\n"
                "printf '%s: OK\\n' \"$(basename \"$1\")\"\n",
                encoding="utf-8",
            )
            binary.chmod(0o755)

            cfg = EngineConfig.load(str(binary))
            cfg.resolve()

            script = Path("conformance/es5/Array.isArray.js")
            results = list(run_script_probes(cfg, DEFAULT_TEST262_DIR, [script]))

        self.assertEqual(results, [("es5/Array.isArray.js", "PASS")])

    def test_test262_script_probe_runs_both_modes(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            root = Path(td) / "test262"
            harness = root / "harness"
            test = root / "test" / "probe.js"
            harness.mkdir(parents=True)
            test.parent.mkdir(parents=True)
            (harness / "assert.js").write_text("", encoding="utf-8")
            (harness / "sta.js").write_text("", encoding="utf-8")
            test.write_text("/*---\ndescription: probe\n---*/\n", encoding="utf-8")

            binary = Path(td) / "probe-fake-engine"
            binary.write_text("#!/bin/sh\nprintf 'ScriptExecutionFinished\\n'\n", encoding="utf-8")
            binary.chmod(0o755)

            cfg = EngineConfig.load(str(binary))
            cfg.resolve()

            results = list(run_script_probes(cfg, root, [test]))

        self.assertEqual(results, [("test/probe.sloppy.js", "PASS"), ("test/probe.strict.js", "PASS")])


if __name__ == "__main__":
    unittest.main()
