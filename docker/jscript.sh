#!/bin/bash
# Microsoft JScript engine installer and runner for Linux
# via Wine + winetricks + Windows Script Host.
#
# On first run will download binaries into ./jscript-dist directory.
# Due to licensing, these binaries are not redistributable - we can only
# ship this installer script to users.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"

export WINEPREFIX="$SCRIPT_DIR/jscript-dist"
export WINEARCH=win32
export WINEDEBUG="${WINEDEBUG:--all,+err}"

# XXX JScript 5.8 is the last release, but only 5.7 is available in winetricks
install_wsh57() {
  local install_marker="$WINEPREFIX/wsh57-installed"
  if [[ -f "$install_marker" ]]; then
    return
  fi

  echo "Installing JScript via wine+winetricks into $WINEPREFIX" >&2

  local arch="$(uname -m)"
  if [[ "$arch" != "x86_64" && "$arch" != "amd64" ]]; then
    echo "Error: jscript.sh is only supported on amd64" >&2
    exit 1
  fi

  local missing_packages=0
  for cmd in wine xvfb-run cabextract unzip curl; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      missing_packages=1
      break
    fi
  done

  if [[ "$missing_packages" == 1 ]]; then
    if ! command -v apt-get >/dev/null 2>&1 || ! command -v dpkg >/dev/null 2>&1; then
      echo "Error: jscript.sh only supports Debian/Ubuntu" >&2
      exit 1
    fi

    CMD="export DEBIAN_FRONTEND=noninteractive; dpkg --add-architecture i386 && apt-get update -y && apt-get install -y --no-install-recommends ca-certificates wine wine32 xvfb xauth cabextract unzip curl"
    if [[ $UID == 0 ]]; then
      (set -x; bash -c "$CMD")
    else
      (set -x; sudo bash -c "$CMD")
    fi
  fi

  (set -x; xvfb-run -a wineboot -i)

  mkdir -p "$WINEPREFIX"
  if [[ ! -x "$WINEPREFIX/winetricks" ]]; then
    echo "Downloading winetricks" >&2
    curl -fsSL -o "$WINEPREFIX/winetricks" "https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks" >&2
    chmod a+rx "$WINEPREFIX/winetricks"
  fi

  (set -x; xvfb-run -a "$WINEPREFIX/winetricks" -q wsh57)

  (set -x; wineserver -w || true)
  date +%s >"$install_marker"
  echo "Success - installed JScript into $WINEPREFIX" >&2
}

run_wine_cscript() {
  local script_path="$1"
  shift

  # Convert to Z:\home\... path for wine
  script_path="$(readlink -f "$script_path")"
  script_win="Z:${script_path//\//\\}"

  if [[ -n "${DISPLAY:-}" ]]; then
    exec wine cscript.exe //Nologo "$script_win" "$@"
  fi

  xvfb-run -a wine cscript.exe //Nologo "$script_win" "$@"
}

run_script() {
  local script_path="$1"
  shift

  if [[ ! -f "$script_path" ]]; then
    echo "Error: script not found: $script_path" >&2
    exit 1
  fi

  local wrapped_script
  wrapped_script="$(mktemp /tmp/jscript.XXXXXX.js)"
  trap "rm -f -- '$wrapped_script'" EXIT
  cat >"$wrapped_script" <<'EOF'
function __wscript_print() { WScript.Echo(Array.prototype.join.call(arguments, " ")); }
if (typeof print === "undefined") { print = __wscript_print; }
if (typeof console === "undefined") { console = { log: __wscript_print }; }
EOF
  cat "$script_path" >>"$wrapped_script"

  run_wine_cscript "$wrapped_script" "$@"
}

run_repl() {
  local script="$WINEPREFIX/repl.js"
  cat >"$script" <<'EOF'
function __wscript_print() { WScript.Echo(Array.prototype.join.call(arguments, " ")); }
if (typeof print === "undefined") { print = __wscript_print; }
if (typeof console === "undefined") { console = { log: __wscript_print }; }

var stdin = WScript.StdIn;
var stdout = WScript.StdOut;

WScript.Echo(ScriptEngine() + " " + ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion() + "." + ScriptEngineBuildVersion());

while (true) {
  stdout.Write("> ");
  if (stdin.AtEndOfStream) {
    break;
  }

  var line = stdin.ReadLine();
  var trimmed = line.replace(/^\s+|\s+$/g, "");
  if (trimmed === "exit" || trimmed === "quit" || trimmed == "\x04") {  /* ^D */
    break;
  }
  if (trimmed.length === 0) {
    continue;
  }

  try {
    var result = eval(line);
    if (typeof result !== "undefined") {
      WScript.Echo(result);
    }
  } catch (e) {
    WScript.Echo(e.name + ": " + e.message);
  }
}
EOF
  run_wine_cscript "$script" "$@"
}

print_version() {
  local script="$WINEPREFIX/version.js"
  cat >"$script" <<'EOF'
WScript.Echo(ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion() + "." + ScriptEngineBuildVersion());
EOF
  run_wine_cscript "$script"
}

if [[ "${1:-}" == -h || "${1:-}" == --help ]]; then
  cat <<EOF
Installs and runs Microsoft JScript engine on Linux via wine+winetricks.
Usage:
  jscript.sh                  start REPL
  jscript.sh path.js [args]   run script
  jscript.sh --version        print engine version
EOF
  exit 0
fi

install_wsh57

if [[ "${1:-}" == --version ]]; then
  print_version
elif [[ $# != 0 ]]; then
  run_script "$@"
else
  run_repl
fi
