#!/dist/js2py-dist/venv/bin/python3
import js2py, sys
e = js2py.EvalJs()
if len(sys.argv) <= 1:
    e.console()
else:
    for filename in sys.argv[1:]:
        e.execute(open(filename).read())
