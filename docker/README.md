# javascript-zoo/docker

Docker-based scripts for building open-source JavaScript engines.

Prerequisites: Linux/macOS with docker or equivalent.
Preferably, podman (in [rootless mode](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md))
or Apple's [container](https://github.com/apple/container) tool.

Build system is make-driven:
  * `make <engine>`: build a single engine, e.g. `make quickjs`
    * Calls `./build.sh <engine>[.Dockerfile]`: wrapper for `docker build`
    * Then `./dist.sh <engine>[.Dockerfile]`: copies build artifacts into `../dist/<arch>/<engine>`
    * Build scripts here are normally parametrized with `REPO` (git url) and `REV` (revision to build, commit/branch/tag). You can override default/args.txt values on the command-line by passing them as environment variables to make, e.g. `REV=static_h make hermes-sh`
  * `make <engine>-sh`: build and drop into bash in the build container for debugging and exploration
  * `make all`: build every Dockerfile
  * `make all-ignoring-errors`: build every Dockerfile, skip failing ones
  * `make sh`: drop into bash in a throwaway test container with bind-mounted `../dist/<arch>` directory with all engines built so far
  * `make hub`: build and publish Docker Hub container
  * `make jsz-<name>`: builds `jsz-<name>` image - these are base build containers with Debian and different build environments/compilers (rust, clang, clang23, etc).
    Normally, make will automatically build them as needed, e.g. `make quickjs` will build `jsz-debian` and `jsz-clang` first.

Some targets have several build variants (naming convention: `engine_variant`):
  * `*_jitless`: build with JIT compiled out
  * `*_clang`, `*_gcc`: build using a secondary compiler choice (usually inferior)
  * `*_intl`: build with full Intl/ECMA-402 support (in a non-intl build, if possible, compiled out to trim binary size)

Variant-specific build arguments are defined in [`args.txt`](args.txt).
It is also used to pin specific revisions to keeps builds more stable and reproducible.

Currently we only target building Linux binaries here -
Linux is the common denominator today, you can get them to
run on any modern system through virtualization/containerization,
and that should be enough for benchmarking and testing.

## Building on macOS

Install latest Apple's [container](https://github.com/apple/container/releases) tool.
Build and run quickjs's REPL, for example:

```sh
$ container system start
$ make quickjs-sh
...
root@...:/src# ./quickjs
QuickJS - Type "\h" for help
qjs >
```

## Cross-platform builds

Set `DOCKER_ARCH` environment variable to `amd64` or `arm64` explicitly before make.
Other architectures supported by debian/docker/qemu may work too, but not tested/polished.

It should work out of the box with Apple's containerization; on Linux, podman needs extra qemu binaries.

```sh
$ sudo apt install qemu-user-static
$ rm -rf ../.cache/iid    # maybe force rebuild of base containers
$ DOCKER_ARCH=amd64 make quickjs-sh
```

## Docker Hub

[Docker image](https://hub.docker.com/r/ivankra/javascript-zoo) with pre-built binaries (amd64/arm64):

  * `docker run -it ivankra/javascript-zoo`
  * `podman run -it docker.io/ivankra/javascript-zoo`
  * <code>[container](https://github.com/apple/container/releases) run -it docker.io/ivankra/javascript-zoo</code>
  * `container run --arch amd64 -it docker.io/ivankra/javascript-zoo` (run amd64 image)

## Template

Template for adding a new engine:

```Dockerfile
# Always parametrize BASE to enable swapping compilers and stacking containers via args.txt
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
