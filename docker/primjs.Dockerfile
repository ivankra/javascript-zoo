ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/lynx-family/primjs.git
ARG REV=develop

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN sed -i '/#include <queue>/a #include <string>' src/gc/thread_pool.h && \
    sed -i '/^set(quickjs_sources/a     ${CMAKE_CURRENT_SOURCE_DIR}/src/basic/log/primjs_logging.cc' CMakeLists.txt && \
    sed -i 's/ -Os / -O3 /' CMakeLists.txt && \
    cmake -S . -B build -G Ninja -DENABLE_UNITTESTS=ON && \
    ninja -C build qjs

ENV JS_BINARY=/src/build/qjs
# No REPL

# TODO: GC build, https://github.com/lynx-family/primjs/blob/develop/docs/benchmark.md
# sed -i 's/ -Os / -O3 -DENABLE_COMPATIBLE_MM -DENABLE_TRACING_GC /' CMakeLists.txt && \
# cmake -S . -B build -G Ninja -DENABLE_UNITTESTS=ON -DENABLE_COMPATIBLE_MM=ON -DENABLE_PRIMJS_SNAPSHOT=ON && \
# /src/src/gc/collector.cc:149:12: error: no member named 'js_callbacks_' in 'LEPUSRuntime'
