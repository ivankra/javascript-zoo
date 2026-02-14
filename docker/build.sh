#!/bin/bash
# Wrapper for building container images (podman/docker/container).
# Also handles dependency tracking for Makefile.

set -e

PRINT_DEPS=0
if [[ "$1" == "--deps" ]]; then
  PRINT_DEPS=1
  shift
fi

ID="$1"
if [[ -z "$ID" ]]; then
  echo "Usage: ./build.sh <name>[.Dockerfile]"
  exit 1
fi

ID=${ID%.Dockerfile}

if [[ -z "$DOCKER_ARCH" ]]; then
  DOCKER_ARCH="$(uname -m | sed 's/aarch64/arm64/; s/x86_64/amd64/')"
fi
IID_DIR="../.cache/iid/$DOCKER_ARCH"
DIST_DIR="../dist/$DOCKER_ARCH"

ARGS=$(sed -ne "s/#.*//; s/^$ID: *//p" args.txt 2>/dev/null)
ARGS_FROM_FILE=0
if [[ -n "$ARGS" ]]; then
  ARGS_FROM_FILE=1
fi

# Print dependencies for Makefile
if [[ "$PRINT_DEPS" == 1 ]]; then
  deps=( build.sh )
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
  for base in $(echo "$ARGS" | grep -Eo -- '--build-arg(=|[[:space:]]+)BASE=jsz-[-a-z0-9._]+' | sed -E 's/.*BASE=(jsz-[-a-z0-9._]+)/\1/'); do
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
    done < <(egrep -o '^COPY ([a-z][-a-z0-9._]+)' "$df" | sed 's/COPY //' 2>/dev/null)

    for f in $(egrep -o '^COPY --from=jsz-([-a-z0-9._]+)' "$df" | sed 's/^COPY --from=//' 2>/dev/null); do
      add_dep "$IID_DIR/$f"
      if [[ -f "$f.Dockerfile" ]]; then
        add_dep "$f.Dockerfile"
      fi
    done

    if [[ "$explicit_base_arg" == 0 ]]; then
      for f in $(egrep -o '^ARG BASE=jsz-([-a-z0-9._]+)' "$df" | sed 's/^ARG BASE=//' 2>/dev/null); do
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

DOCKERFILE="$(echo " $ARGS " | sed -nE 's/.* -f(=| +)([^ ]+).*/\2/p')"

# Add REV/REPO overrides from the environment variables.
if [[ -n "$REPO" && -f "$DOCKERFILE" ]] && grep -Eq '^ARG +REPO=' "$DOCKERFILE"; then
  ARGS="$(echo " $ARGS " | sed -E \
    -e 's/ --build-arg[= ]REPO=[^ ]+ / /g' \
    -e 's/^ +//; s/ +$//; s/ +/ /g')"
  ARGS="$ARGS --build-arg REPO=$REPO"
  echo "Using REPO=$REPO override to build $DOCKERFILE"
fi
if [[ -n "$REV" && -f "$DOCKERFILE" ]] && grep -Eq '^ARG +REV=' "$DOCKERFILE"; then
  ARGS="$(echo " $ARGS " | sed -E \
    -e 's/ --build-arg[= ]REV=[^ ]+ / /g' \
    -e 's/^ +//; s/ +$//; s/ +/ /g')"
  ARGS="$ARGS --build-arg REV=$REV"
  echo "Using REV=$REV override to build $DOCKERFILE"
fi

if [[ -z "$DOCKER" ]]; then
  if command -v podman >/dev/null 2>&1; then
    DOCKER=podman
  elif command -v container >/dev/null 2>&1; then
    DOCKER=container
  elif command -v docker >/dev/null 2>&1; then
    DOCKER=docker
  else
    echo "No docker engine found. Install podman, docker, macOS containerization or point DOCKER to a docker-like tool." >&2
    exit 1
  fi
fi

mkdir -p "$IID_DIR" "$DIST_DIR"
rm -f "$DIST_DIR/$ID.json"

# Ensure docker tags always have a jsz- prefix
TAG="$ID"
if [[ "$ID" != jsz-* ]]; then
  TAG="jsz-$ID"
fi

if [[ "$DOCKER" != "container" ]]; then
  set -x
  $DOCKER build --arch "$DOCKER_ARCH" --iidfile="$IID_DIR/$TAG" -t "$TAG" $ARGS .
else
  set -x
  $DOCKER build --arch "$DOCKER_ARCH" -t "$TAG" $ARGS .
  touch "$IID_DIR/$TAG"
fi
