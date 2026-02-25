#!/bin/bash
# Print dependency summaries for ELF binaries: <filename>: [GLIC_X.Y] <.so basenames>

set -euo pipefail

usage() {
  echo "Usage: ./build/ldd-check.sh <binary-or-directory>" >&2
  exit 1
}

if [[ $# -ne 1 ]]; then
  usage
fi

for tool in ldd objdump; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "ldd-check.sh: missing required tool: $tool" >&2
    exit 1
  fi
done

target="$1"
ALL_LIBS_TMP="$(mktemp)"
ALL_GLIBC_TMP="$(mktemp)"
trap 'rm -f "$ALL_LIBS_TMP" "$ALL_GLIBC_TMP"' EXIT

so_list_for_binary() {
  local bin="$1"
  (ldd "$bin" 2>&1 || true) | awk '
    function base(p, n, a) {
      n = split(p, a, "/")
      return a[n]
    }
    {
      # Typical lines:
      #   libm.so.6 => /lib/.../libm.so.6 (...)
      #   linux-vdso.so.1 (...)
      #   /lib64/ld-linux-x86-64.so.2 (...)
      if ($1 ~ /\.so([.0-9]*)?$/) {
        print base($1)
      } else if ($2 == "=>" && $1 ~ /\.so([.0-9]*)?$/) {
        print base($1)
      }
    }
  ' | sort -u
}

glibc_versions_for_binary() {
  local bin="$1"
  objdump -T "$bin" 2>/dev/null \
    | grep -Eo 'GLIBC_[0-9]+(\.[0-9]+)*' \
    | sort -uV || true
}

max_glibc_for_binary() {
  local bin="$1"
  glibc_versions_for_binary "$bin" | tail -n1
}

binary_kind() {
  local bin="$1"
  local ldd_out

  if head -c 2 "$bin" 2>/dev/null | grep -q '^#!'; then
    printf 'script\n'
    return 0
  fi

  ldd_out="$(ldd "$bin" 2>&1 || true)"
  if grep -Eq 'not a dynamic executable|statically linked' <<< "$ldd_out"; then
    printf 'static\n'
    return 0
  fi

  printf 'dynamic\n'
}

print_report_line() {
  local bin="$1"
  local name kind libs glibc line
  name="$(basename "$bin")"
  kind="$(binary_kind "$bin")"

  if [[ "$kind" == "script" ]]; then
    printf '%-20s script\n' "$name"
    return 0
  fi

  libs="$(
    so_list_for_binary "$bin" | paste -sd' ' - || true
  )"
  if [[ "$kind" == "dynamic" ]]; then
    glibc="$(max_glibc_for_binary "$bin")"
  else
    glibc=""
  fi

  if [[ -n "$libs" ]]; then
    tr ' ' '\n' <<< "$libs" | sed '/^$/d' >> "$ALL_LIBS_TMP"
  fi
  if [[ "$kind" == "dynamic" ]]; then
    glibc_versions_for_binary "$bin" >> "$ALL_GLIBC_TMP"
  fi

  line="$(printf '%-20s' "$name")"
  if [[ -n "$glibc" ]]; then
    line+=" $glibc"
  fi
  if [[ -n "${libs// }" ]]; then
    line+=" $libs"
  elif [[ "$kind" == "static" ]]; then
    line+=" static"
  else
    line+=" -"
  fi
  printf '%s\n' "$line"
}

print_total_line() {
  local libs glibc

  libs="$(
    if [[ -s "$ALL_LIBS_TMP" ]]; then
      sort -u "$ALL_LIBS_TMP" | paste -sd' ' -
    fi
  )"

  glibc="$(
    if [[ -s "$ALL_GLIBC_TMP" ]]; then
      sort -uV "$ALL_GLIBC_TMP" | tail -n1
    fi
  )"

  printf '%-20s' "ALL"
  if [[ -n "$glibc" ]]; then
    printf ' %s' "$glibc"
  fi
  if [[ -n "${libs// }" ]]; then
    printf ' %s' "$libs"
  else
    printf ' -'
  fi
  printf '\n'
}

if [[ -f "$target" ]]; then
  if [[ ! -x "$target" ]]; then
    echo "ldd-check.sh: file is not executable: $target" >&2
    exit 1
  fi
  print_report_line "$target"
  print_total_line
  exit 0
fi

if [[ -d "$target" ]]; then
  found=0
  while IFS= read -r -d '' bin; do
    found=1
    print_report_line "$bin"
  done < <(find "$target" -maxdepth 1 -mindepth 1 -type f -executable -print0 | sort -z)

  if [[ "$found" -eq 0 ]]; then
    echo "ldd-check.sh: no executable files found in $target" >&2
  else
    print_total_line
  fi
  exit 0
fi

echo "ldd-check.sh: path not found: $target" >&2
exit 1
