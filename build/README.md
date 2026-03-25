# Build

Docker/make-based scripts for building open-source JavaScript engines.

Prerequisites: Linux/macOS with docker or equivalent.
Preferably, podman (in [rootless mode](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md))
or Apple's [container](https://github.com/apple/container) tool.

Build system is make-driven:
  * `build/`: shared scripts and base images
    * `make jsz-<name>`: builds `jsz-<name>.Dockerfile` image - base build containers with Debian, toolchains (rust, clang, clang23, etc) and testing runtime environment (`jsz-runtime.Dockerfile`). Normally, make will automatically discover dependencies in `FROM` / `COPY --from=` / `--build-arg BASE=` and build them as needed.
    * `make jsz-<name>-sh`: build and open shell in a base image
    * `make sh`: open shell in the testing image, with bind-mounted `../dist/<arch>` directory with all engines built so far
    * `make hub`: build and publish Docker Hub container.
    * `build.mk`: macro definitions for engine Makefiles to define build targets
  * `engines/<project>/`: per-engine directory with Makefile, Dockerfile, patches, etc.
    * `Makefile`: includes `build/build.mk` and defines build targets via macros:
      * `$(eval $(call build_engine,<name>,<Dockerfile>[,<docker build extra args>]))`
      * May pin a specific revision: `REV ?= ...`. These will get passed as `--build-arg REV=...` to docker.
      * Dockerfiles are normally parametrized with `REPO` (git url) and `REV` (revision to build, commit/branch/tag). You can override default values from Dockerfile/Makefile on the command-line by passing them as environment variables to make, e.g. `REV=master make`.
    * `make <name>`: build a particular variant
      * Calls `build/build.sh <name> <dockerfile> [<args>]` to build the image - wrapper for `docker build`
      * Then `build/dist.sh <name>`: copies build artifacts into `../dist/<arch>/<name>`
    * `make` / `make all`: build all variants defined in Makefile
    * `make build[-<name>]` / `make dist[-<name>]`: build/dist all variants or a single variant
    * `make rebuild[-<name>]`: force rebuild with docker's `--no-cache` flag
    * `make sh` / `make <name>-sh`: build and open shell in the build container
    * `make conformance`: test the engine on conformance test suite inside a test container (jsz-runtime). By default runs the main binary artifact on all tests in conformance/ dir. Can be customized via `CONFORMANCE_BINARY` / `CONFORMANCE_SUITE` / `CONFORMANCE_CMD` vars.
    * `make conformance-direct`: run conformance testing command directly on host without launching a test container
  * `dist/<arch>/`: build artifacts get copied here. `make <name>` typically produces:
    * `<name>`: built binary, bash wrapper or shebanged script
    * `<name>.json`: metadata json with git revision info, compiler version, etc
    * `<name>.LICENSE`: license copy from the source tree
    * `<name>-dist/`: directory with binaries (if using a bash wrapper) and extra files necessary to run the engine

Some targets have several build variants (naming convention: `engine_variant`):
  * `*_jitless`: build with JIT compiled out
  * `*_clang`, `*_gcc`: build using a secondary compiler choice (usually inferior)
  * `*_intl`: build with full Intl/ECMA-402 support (in a non-intl build, if possible, compiled out to trim binary size)

## Building on macOS

Install latest Apple's [container](https://github.com/apple/container/releases) tool.
Build and run quickjs's REPL, for example:

```sh
$ container system start
$ make -C engines/quickjs sh   # or: cd engine/quickjs && make sh
...
root@...:/src# ./quickjs
QuickJS - Type "\h" for help
qjs >
```

## Cross-arch builds

Set `DOCKER_ARCH` environment variable to a [GOARCH](https://go.dev/doc/install/source#environment) id.
`amd64` and `arm64` are fully supported and tested.
Other official [Debian architectures](https://www.debian.org/ports/) should mostly work:
`arm`, `386`, `loong64`, `ppc64le`, `riscv64`, `s390x`.

It should work out of the box with Apple's containerization; on Linux, podman needs extra qemu binaries:

```sh
$ sudo apt install qemu-user-static
$ DOCKER_ARCH=amd64 make -C engines/quickjs sh
```

## Docker Hub

[Docker Hub image](https://hub.docker.com/r/ivankra/javascript-zoo) with pre-built binaries (amd64/arm64):

  * `docker run -it ivankra/javascript-zoo`
  * `podman run -it docker.io/ivankra/javascript-zoo`
  * `container run -it docker.io/ivankra/javascript-zoo`
  * `container run --arch amd64 -it docker.io/ivankra/javascript-zoo` (run amd64 image)

## New engine template

Template for a new `engines/<engine>/Dockerfile`:

```Dockerfile
# Always keep BASE configurable for customization by Makefile and CI/CD (needs to inject ghcr registry)
ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=<repository to check out>
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git parse-rev HEAD

# Or shallow clone for large repositories:
#RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
#    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
#    && git parse-rev HEAD

RUN make -j$(nproc)

# dist.py strips and copies binary to /dist/engine, test runs it and writes metadata
# to /dist/engine.json. You can pass extra key=value metadata pairs at the end, if needed.
COPY dist.py ./
RUN ./dist.py /dist/engine --binary=/src/binary version="$(/src/binary --version)"
# If a shell wrapper is needed, use --wrapper flag to create it:
#RUN ./dist.py /dist/engine --wrapper='exec "$SCRIPT_DIR/engine-dist/binary" "$@"'
# console.log or equivalent function should normally get autodetermined by a test run.
# If build environment can't run the binary, set it explicitly:
#RUN ./dist.py /dist/engine console_log=print
```

Makefile:

```Makefile
include ../../build/build.mk

# Pinned revision if necessary (takes precedence over Dockerfile's default REV)
#REV ?= <git hash>

# Limit builds to specific archs
#SUPPORTED_ARCHS = arm64 amd64

$(eval $(call build_engine,<engine>,Dockerfile))

# Additional variants can be defined using different Dockerfiles or build args:
#$(eval $(call build_engine,<engine>_jitless,Dockerfile,--build-arg JITLESS=true))
```
