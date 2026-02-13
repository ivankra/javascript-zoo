# javascript-zoo/docker

Dockerfiles for building open-source JavaScript engines.

Currently we only target x86-64 and arm64 Linux binaries here.
Rationale: Linux is the common denominator today, you can get them to
run on any modern system through virtualization/containerization solutions,
and that should be enough for benchmarking and testing.

Build prerequisites: Linux with [rootless podman](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md)
(preferably) or docker or equivalent.

Make targets:
  * `make all`: build every Dockerfile
  * `make all-ignoring-errors`: build every Dockerfile, skip failing ones.
  * `make <name>`: build a single engine
    * Calls `./build.sh <name>[.Dockerfile]`: wrapper for `docker build`.
    * Then `./dist.sh <name>[.Dockerfile]`: copies packaged artifacts from
      container `/dist` into `../dist/<arch>/<name>`, along with metadata files.
  * `make <engine>[-repl/-sh]`: build and drop into REPL/bash in build container
  * `make sh`: drop into bash in a throwaway test container with pre-installed
    libraries/runtimes and dist directory with all engines built so far.
  * `make hub`: create a multiarch version of `sh` container for publishing
    on Dockerhub. Prerequisite: `sudo apt install qemu-user-static`.

Some targets have several build variants (naming convention: `engine_variant`):
  * `*_jitless`: built with JIT compiled out
  * `*_clang`, `*_gcc`: built with a secondary compiler choice (usually worse)
  * `*_intl`: built with full Intl/ECMA-402 support (in a non-intl build,
     if possible, it is disabled to trim binary size)

Variant-specific build arguments are defined in `args.txt`. It is also
used to pin specific revisions.

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

ARG REPO=<repository to check out>
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

# Or shallow clone for large repositories:
#RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
#    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN make -j$(nproc)

# dist.py finishes packaging: strips and copies binary or creates bash wrapper,
# writes /dist/engine.json with given key=value pairs, git metadata etc.
COPY dist.py ./
RUN ./dist.py /dist/engine --binary=./binary version="$(./binary --version)"
```
