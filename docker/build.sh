#!/bin/bash
# Wrapper for 'podman build'

set -e

DEP=0
if [[ "$1" == "--dep" ]]; then
  DEP=1
  shift
fi

ID="$1"
if [[ -z "$ID" ]]; then
  echo "Usage: ./build.sh <name>[.Dockerfile]"
  exit 1
fi

ID=${ID%.Dockerfile}

DOCKER="$(command -v podman 2>/dev/null || echo docker)"
DOCKER_ARCH="$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/amd64/')"
IID_DIR="../.cache/iid"
DIST_DIR="../dist/$DOCKER_ARCH"

ARGS=$(sed -ne "s/#.*//; s/^$ID: *//p" args.txt 2>/dev/null)
ARGS_FROM_FILE=0
if [[ -n "$ARGS" ]]; then
  ARGS_FROM_FILE=1
fi

# Print dependencies for Makefile
if [[ "$DEP" == 1 ]]; then
  deps=()
  add_dep() {
    deps+=( "$1" )
  }

  if [[ "$ARGS_FROM_FILE" == 1 ]]; then
    add_dep args.txt
  fi

  # Build-arg can override BASE from Dockerfile, e.g. --build-arg BASE=jsz-gcc15.
  explicit_base_arg=0
  explicit_bases=()
  if echo "$ARGS" | grep -Eq -- '--build-arg(=|[[:space:]]+)BASE='; then
    explicit_base_arg=1
  fi
  for base in $(echo "$ARGS" | grep -Eo -- '--build-arg(=|[[:space:]]+)BASE=jsz-[-a-z0-9._]+' | sed -Ee 's/.*BASE=(jsz-[-a-z0-9._]+)/\1/'); do
    explicit_bases+=( "$base" )
    add_dep "$IID_DIR/$base"
    if [[ -f "$base.Dockerfile" ]]; then
      add_dep "$base.Dockerfile"
    fi
  done

  dfs=()
  if [[ $ARGS =~ -f[[:space:]]([-a-z0-9_.]+.Dockerfile) ]]; then
    dfs=( "${BASH_REMATCH[1]}" )
  fi
  if [[ -f $ID.Dockerfile ]]; then
    dfs+=( "$ID.Dockerfile" )
  fi
  for df in "${dfs[@]}"; do
    add_dep "$df"
    while read -r copy_dep; do
      [[ -n "$copy_dep" ]] && add_dep "$copy_dep"
    done < <(egrep -o '^COPY ([a-z][-a-z0-9._]+)' "$df" | sed -e 's/COPY //' 2>/dev/null)

    for f in $(egrep -o '^COPY --from=jsz-([-a-z0-9._]+)' "$df" | sed -e 's/^COPY --from=//' 2>/dev/null); do
      add_dep "$IID_DIR/$f"
      if [[ -f "$f.Dockerfile" ]]; then
        add_dep "$f.Dockerfile"
      fi
    done

    if [[ "$explicit_base_arg" == 0 ]]; then
      for f in $(egrep -o '^ARG BASE=jsz-([-a-z0-9._]+)' "$df" | sed -e 's/^ARG BASE=//' 2>/dev/null); do
        add_dep "$IID_DIR/$f"
        if [[ -f "$f.Dockerfile" ]]; then
          add_dep "$f.Dockerfile"
        fi
      done
    fi
  done

  printf '%s\n' "${deps[@]}" | awk '!x[$0]++'
  exit 0
fi

if [[ "$ARGS" != *-f* ]]; then
  ARGS="-f $ID.Dockerfile $ARGS"
fi

mkdir -p "$IID_DIR" "$DIST_DIR"
rm -f "$DIST_DIR/$ID.json"

TAG="$ID"
if [[ "$ID" != jsz-* ]]; then
  TAG="jsz-$ID"
fi
set -x
$DOCKER build --platform="linux/$DOCKER_ARCH" --iidfile="$IID_DIR/$TAG" -t "$TAG" $ARGS .
