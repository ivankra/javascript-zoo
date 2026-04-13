# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/lynx-family/primjs.git
RUN git clone --depth=1 "$REPO" .

ARG REV=develop
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

# RUN sed -i '/^machine = "x86_64" if/a machine = "arm64" if machine == "aarch64" else machine' DEPS
# RUN bash -c 'source tools/envsetup.sh && hab sync .'

RUN git clone --depth=1 https://github.com/lynx-family/buildroot.git build
RUN mkdir -p buildtools/gn && \
    curl -fsSL "https://github.com/lynx-family/buildtools/releases/download/gn-cc28efe6/buildtools-gn-linux-$(uname -m | sed 's/^aarch64$/arm64/').tar.gz" | tar xz -C buildtools/gn && \
    chmod +x buildtools/gn/gn
RUN mkdir -p buildtools/llvm/bin && \
    for x in clang clang++ llvm-ar llvm-nm llvm-readelf llvm-objcopy llvm-readobj; do \
      target=$(command -v $x 2>/dev/null) || \
      target=$(ls /usr/bin/$x-[0-9]* 2>/dev/null | sort -V | tail -1); \
      if [ -n "$target" ]; then ln -s "$target" buildtools/llvm/bin/$x; fi \
    done
RUN git clone --depth=1 https://github.com/tc39/test262 third_party/test262 && \
    REV=$(echo "root_dir=''; $(cat DEPS); print(deps['third_party/test262']['commit'])" | python3) && \
    git -C third_party/test262 fetch origin $REV && \
    git -C third_party/test262 checkout $REV
ENV PATH=/src/buildtools/gn:$PATH

# Fix for newer clang/libc++
RUN sed -i '/<sys\/time.h>/a #include <cstring>' src/gc/thread_pool.cc && \
    sed -i '/#include <fstream>/a #include <functional>' src/gc/cartesian_tree.h && \
    sed -i 's/size_t allocatedSize = AllocatedMemory();/size_t allocatedSize = this->AllocatedMemory();/' src/gc/ros_allocator.h

# Copy embedded.S (closed source blob)
RUN cp -a src/interpreter/primjs/android/ src/interpreter/primjs/linux

RUN gn gen out/Release --args="target_cpu=\"$(uname -m | sed 's/aarch64/arm64/; s/x86_64/x64/; s/armv7l/arm/; s/i686/x86/')\" target_os=\"linux\" enable_primjs_snapshot=true enable_compatible_mm=true enable_tracing_gc=true enable_unittests=true use_default_linux_sysroot=false use_flutter_cxx=false use_lepusng=true" && \
    ninja -C out/Release qjs run_test262

COPY build/dist.py ./
RUN ./dist.py /dist/primjs --binary=/src/out/Release/qjs
RUN ./dist.py /dist/primjs_262 --binary=/src/out/Release/run_test262 --smoke-test-cmd='$BINARY -N'
