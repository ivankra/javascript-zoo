# javascript-zoo/docker

Dockerfiles for building open-source JavaScript engines.

Currently we only target x86-64 and arm64 Linux binaries here.
Rationale: Linux is the common denominator today, you can get them to
run on any modern system through virtualization/containerization solutions,
and that should be enough for benchmarking and testing.

Build prerequisites: Linux with podman (preferably) or docker.

Make targets:
  * `make all`: build every Dockerfile
    * If some build fail, try deleting (or renaming with `_` prefix)
      corresponding Dockerfile or comment out entry in args.txt to keep going.
  * `make <name>`: build a single engine
    * Calls `./build.sh <name>[.Dockerfile]`: wrapper for `docker build`.
    * Then `./dist.sh <name>[.Dockerfile]`: strips and copies binary into
      `../dist/<arch>/<name>`, along with build metadata and auxialiry files.
  * `make <engine>[-repl/-sh]`: build and drop into REPL/bash in build container
  * `make sh`: drop into bash in a throwaway test container with pre-installed
    libraries/runtimes and dist directory with all engines built so far.
  * `make hub`: create a multiarch version of `sh` container for publishing
    on Dockerhub. Prerequisite: `sudo apt install qemu-user-static`.

Some targets have several build variants, e.g. `*_jitless` variants with
JIT compiled out. Naming convention: `engine_variant`. Variant-specific
build arguments are defined in `args.txt`. It is also used to pin
specific revisions.

Most engines are built statically from the original source code.
Some (esp. V8) are built without libicu/Intl (ECMA-402), Temporal and
Wasm to trim excessive binary bloat. `*_full` variants are built with
all features.

## Docker Hub

[Docker image](https://hub.docker.com/r/ivankra/javascript-zoo)
with pre-built binaries (amd64/arm64):

  * `docker run -it ivankra/javascript-zoo`
  * `podman run -it docker.io/ivankra/javascript-zoo`
  * <code>[container](https://github.com/apple/containerization) run -it docker.io/ivankra/javascript-zoo</code>

## Template

Template for adding a new engine:

```Dockerfile
# Make BASE an option so that we could easily swap compilers via args.txt
ARG BASE=jsz-gcc
FROM $BASE

# Point to master/lkgr-like branch so it could be usable for daily builds later
ARG REPO=<repository to check out>
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

# Or shallow clone for large repositories:
#RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
#    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN make -j

ENV JS_BINARY=<path to javascript shell binary>

# Point WORKDIR to project's main source code directory for dist.sh -
# it will get git metadata from current directory's repository.
# Tweak metadata if needed: drop jsz_<key> files in source or /dist dir.
#RUN ${JS_BINARY} --version >jsz_version

# REPL command if engine supports it
CMD ${JS_BINARY}

# TODO: COPY dist.sh ./; RUN ./dist.sh ${JS_BINARY} -o /dist/engine --key=value ...
```
