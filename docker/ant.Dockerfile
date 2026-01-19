FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    git ca-certificates gnupg wget software-properties-common curl \
    python3-pip ninja-build cmake pkg-config \
    uuid-dev libssl-dev libsodium-dev \
    && wget -qO- https://apt.llvm.org/llvm-snapshot.gpg.key | tee /etc/apt/trusted.gpg.d/apt.llvm.org.asc \
    && echo "deb http://apt.llvm.org/jammy/ llvm-toolchain-jammy-21 main" > /etc/apt/sources.list.d/llvm.list \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get update \
    && apt-get install -y clang-21 lld-21 llvm-21 nodejs \
    && pip3 install meson \
    && rm -rf /var/lib/apt/lists/*

RUN export CFLAGS="-Os -flto" \
    && export AR=llvm-ar-21 \
    && export RANLIB=llvm-ranlib-21 \
    && git clone --depth 1 --branch release/v9.2.1 https://github.com/nodejs/llhttp.git /tmp/llhttp \
    && cd /tmp/llhttp \
    && CC=clang-21 CXX=clang++-21 cmake -B build -DCMAKE_INSTALL_PREFIX=/usr/local -DBUILD_SHARED_LIBS=OFF -DBUILD_STATIC_LIBS=ON -DCMAKE_BUILD_TYPE=MinSizeRel \
    && cmake --build build \
    && cmake --install build \
    && rm -rf /tmp/llhttp

RUN export CFLAGS="-Os -flto" \
    && export AR=llvm-ar-21 \
    && export RANLIB=llvm-ranlib-21 \
    && git clone --depth 1 --branch v1.51.0 https://github.com/libuv/libuv.git /tmp/libuv \
    && cd /tmp/libuv \
    && CC=clang-21 cmake -B build -DCMAKE_INSTALL_PREFIX=/usr/local -DBUILD_TESTING=OFF -DLIBUV_BUILD_SHARED=OFF -DCMAKE_BUILD_TYPE=MinSizeRel \
    && cmake --build build \
    && cmake --install build \
    && rm -rf /tmp/libuv

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN git clone --depth 1 --recursive https://github.com/theMackabu/ant.git /src
WORKDIR /src

RUN npm ci --prefix src/tools

RUN export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH" \
    && export CMAKE_PREFIX_PATH="/usr/local:$CMAKE_PREFIX_PATH" \
    && CC=clang-21 CC_LD=lld-21 meson setup build -Db_lto=true --buildtype=release \
    && meson compile -C build \
    && llvm-strip-21 build/ant

RUN cp build/ant /usr/local/bin/ant

FROM ubuntu:22.04
RUN apt-get update && apt-get install -y --no-install-recommends \
    libssl3 libsodium23 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=0 /usr/local/bin/ant /usr/local/bin/ant

ENTRYPOINT ["ant"]