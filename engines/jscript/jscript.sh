#!/bin/bash
# Microsoft JScript engine installer and runner for Linux
# via Wine + winetricks + Windows Script Host.
#
# Usage:
#   jscript.sh                   start REPL
#   jscript.sh script.js [args]  run script file
#   jscript.sh --version         print engine version
#
# On the first run, the script will install Wine, winetricks and download
# WSH/JScript binaries from microsoft.com into ~/.wine-jscript.
# Due to licensing, these binaries are not redistributable - we can only
# ship this installer script to users.
#
# Needs Ubuntu/Debian-like x64 Linux system.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -euo pipefail

SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"

export WINEPREFIX="$HOME/.wine-jscript"
export WINEARCH=win32
export WINEDEBUG="${WINEDEBUG:--all,+err}"
export XDG_RUNTIME_DIR=${XDG_RUNTIME_DIR:-$WINEPREFIX/run}

mkdir -p "$XDG_RUNTIME_DIR" || true

# Silence errors from using stdbuf in conformance/run.sh
if [[ "${LD_PRELOAD:-}" == /usr/libexec/coreutils/libstdbuf.so ]]; then
  export LD_PRELOAD=
fi

install_wine() {
  local missing_packages=0
  for cmd in cabextract curl wine; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      missing_packages=1
      break
    fi
  done

  if [[ "$missing_packages" == 0 ]]; then
    return
  fi

  echo "Installing Wine packages"

  local arch="$(uname -m)"
  if [[ "$arch" != "x86_64" && "$arch" != "amd64" ]]; then
    echo "Error: jscript.sh is only supported on amd64"
    exit 1
  fi

  if ! command -v apt-get >/dev/null 2>&1 || ! command -v dpkg >/dev/null 2>&1; then
    echo "Error: jscript.sh only supports Debian/Ubuntu"
    exit 1
  fi

  CMD="export DEBIAN_FRONTEND=noninteractive; dpkg --add-architecture i386 && apt-get update -y && apt-get install -y --no-install-recommends ca-certificates cabextract curl wine wine32"
  if [[ $UID == 0 ]]; then
    (set -x; bash -c "$CMD")
  else
    (set -x; sudo bash -c "$CMD")
  fi
}

# Note: although JScript 5.8 is the last release, only 5.7 is available in winetricks
install_wsh57() {
  local install_marker="$WINEPREFIX/wsh57-installed"
  if [[ -f "$install_marker" ]]; then
    return
  fi

  echo "Installing JScript via wine+winetricks into $WINEPREFIX"

  (set -x; wineboot -i)

  # Enable Null graphics driver (better alternative to xvfb-run)
  (set -x; wine reg add 'HKEY_CURRENT_USER\Software\Wine\Drivers' /v Graphics /t REG_SZ /d null /f)

  if [[ ! -x "$WINEPREFIX/winetricks" ]]; then
    echo "Downloading winetricks"
    curl -fsSL -o "$WINEPREFIX/winetricks" "https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks"
    chmod a+rx "$WINEPREFIX/winetricks"
  fi

  (set -x; "$WINEPREFIX/winetricks" -q wsh57)

  date +%s >"$install_marker"
  echo "Success - installed JScript into $WINEPREFIX"

  print_version >/dev/null
}

# Convert unix path to Z:\... path for wine
wine_path() {
  local path="$(readlink -f "$1")"
  echo "Z:${path//\//\\}"
}

run_script() {
  local script_path="$1"
  shift

  if [[ ! -f "$script_path" ]]; then
    echo "Error: script not found: $script_path" >&2
    exit 1
  fi

  local wrapped_script="$(mktemp /tmp/jscript.XXXXXX.js)"
  trap "rm -f -- '$wrapped_script'" EXIT
  cat >"$wrapped_script" <<'EOF'
function __wscript_print() { WScript.Echo(Array.prototype.join.call(arguments, " ")); }
if (typeof print === "undefined") { print = __wscript_print; }
if (typeof console === "undefined") { console = { log: __wscript_print }; }
EOF
  cat "$script_path" >>"$wrapped_script"

  wine cscript.exe /nologo "$(wine_path "$wrapped_script")" "$@"
}

run_repl() {
  local script="$WINEPREFIX/repl.js"
  cat >"$script" <<'EOF'
function __wscript_print() { WScript.Echo(Array.prototype.join.call(arguments, " ")); }
if (typeof print === "undefined") { print = __wscript_print; }
if (typeof console === "undefined") { console = { log: __wscript_print }; }

// JSON.stringify() polyfill
var __stringify = (function() {
  var esc = {'"':'\\"','\\':'\\\\','\b':'\\b','\f':'\\f','\n':'\\n','\r':'\\r','\t':'\\t'};
  var ts = Object.prototype.toString;

  function str(s) {
    for (var r = '"', i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      r += esc[c] || (c < ' ' ? '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4) : c);
    }
    return r + '"';
  }

  function go(v, seen) {
    if (v === null) return 'null';
    var t = typeof v;
    if (t === 'string') return str(v);
    if (t === 'boolean') return v ? 'true' : 'false';
    if (t === 'number') return isFinite(v) ? '' + v : 'null';
    if (t !== 'object') return;

    for (var i = 0; i < seen.length; i++) if (seen[i] === v) throw new TypeError('Circular');
    seen.push(v);

    var out = [], isArr = ts.call(v) === '[object Array]';
    if (isArr) {
      for (var j = 0; j < v.length; j++) {
        var x = go(v[j], seen);
        out.push(x === undefined ? 'null' : x);
      }
    } else {
      for (var k in v) if (v.hasOwnProperty(k)) {
        var y = go(v[k], seen);
        if (y !== undefined) out.push(str(k) + ':' + y);
      }
    }
    seen.pop();
    return isArr ? '[' + out + ']' : '{' + out + '}';
  }

  return function(v) { return go(v, []); };
})();

(function() {
  while (true) {
    WScript.StdOut.Write("> ");
    if (WScript.StdIn.AtEndOfStream) break;

    var __line = WScript.StdIn.ReadLine().replace(/^\s+|\s+$/g, "");
    if (__line === "exit" || __line === "quit" || __line == "\x04" /*^D*/) break;
    if (__line === "") continue;

    try {
      var __res = eval(__line);
      if (typeof __res !== "undefined") {
        WScript.Echo(typeof __res === "object" ? __stringify(__res) : __res);
      }
    } catch (__err) {
      var __name = __err && __err.name;
      var __msg = __err && __err.message;
      WScript.Echo("Uncaught " + (__name ? __name + ": " : "") + (__msg || __err));
    }
  }
})();
EOF
  wine cscript.exe /logo "$(wine_path "$script")" "$@"
}

print_version() {
  local script="$WINEPREFIX/version.js"
  cat >"$script" <<'EOF'
WScript.Echo(ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion() + "." + ScriptEngineBuildVersion());
EOF
  wine cscript.exe /nologo "$(wine_path "$script")" "$@"
}

if [[ "${1:-}" == -h || "${1:-}" == --help ]]; then
  cat <<EOF
Installs and runs Microsoft JScript engine on Linux via wine+winetricks.

Usage:
  jscript.sh                   start REPL
  jscript.sh script.js [args]  run script file
  jscript.sh --version         print engine version
EOF
  exit 0
fi

install_wine >&2
install_wsh57 >&2

if [[ "${1:-}" == --version ]]; then
  print_version
elif [[ $# != 0 ]]; then
  run_script "$@"
else
  run_repl
fi
