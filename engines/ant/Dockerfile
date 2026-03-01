ARG BASE=jsz-zig
FROM $BASE

RUN apt-get update && \
    apt-get install -y gnupg python3-pip ninja-build meson cmake pkg-config uuid-dev libssl-dev libsodium-dev libz-dev nodejs npm

WORKDIR /src/llhttp
RUN export CFLAGS="-Os -flto" \
    && git clone --depth 1 --branch release/v9.2.1 https://github.com/nodejs/llhttp.git . \
    && cmake -B build -DCMAKE_INSTALL_PREFIX=/usr/local -DBUILD_SHARED_LIBS=OFF -DBUILD_STATIC_LIBS=ON -DCMAKE_BUILD_TYPE=MinSizeRel \
    && cmake --build build \
    && cmake --install build

WORKDIR /src/uv
RUN export CFLAGS="-Os -flto" \
    && git clone --depth 1 --branch v1.51.0 https://github.com/libuv/libuv.git . \
    && cmake -B build -DCMAKE_INSTALL_PREFIX=/usr/local -DBUILD_TESTING=OFF -DLIBUV_BUILD_SHARED=OFF -DCMAKE_BUILD_TYPE=MinSizeRel \
    && cmake --build build \
    && cmake --install build

ARG REPO=https://github.com/theMackabu/ant.git
ARG REV=master

WORKDIR /src/ant
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

RUN npm ci --prefix src/tools

RUN export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH" \
    && export CMAKE_PREFIX_PATH="/usr/local:$CMAKE_PREFIX_PATH" \
    && meson setup build -Db_lto=true --buildtype=release \
    && meson compile -C build

COPY build/dist.py ./
RUN ./dist.py /dist/ant --binary=/src/ant/build/ant
