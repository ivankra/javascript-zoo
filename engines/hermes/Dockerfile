Building Hermes:
# https://github.com/facebook/hermes/blob/main/doc/BuildingAndRunning.md
#
# Hermes - main branch:
#   * Not actively developed anymore
#   * Release branches: rn/0.xx-stable
#   * Tags: v0.x.x, hermes-v0.14.0
#
# Hermes V1 (formerly Static Hermes) - static_h branch:
#   * Next generation of Hermes in active development, ~3k commits ahead of main
#   * Release branch: 250829098.0.0-stable
#   * Tags: hermes-v250829098.0.x
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends libicu-dev libreadline-dev
    #build-essential ca-certificates cmake git ninja-build python3 zip

ARG REPO=https://github.com/facebook/hermes.git
ARG REV=main

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

# Fix broken -DHERMES_ENABLE_INTL=ON build on main branch
RUN grep -q cstdint lib/Platform/Intl/impl_icu/IntlUtils.cpp || \
    sed -i 's/std::uint8_t/unsigned char/g' lib/Platform/Intl/impl_icu/IntlUtils.cpp
# Fix broken gcc15 build in v0.14.0
RUN grep -q cstdint API/jsi/jsi/jsi.h || sed -i '/<cassert>/a #include <cstdint>' API/jsi/jsi/jsi.h
# Fix broken gcc16 build
RUN if [ `${CC:-cc} -dumpversion` = 16 ]; then \
      echo 'set_source_files_properties(raw_ostream.cpp PROPERTIES COMPILE_FLAGS "-frtti")' >>external/llvh/lib/Support/CMakeLists.txt; \
      echo 'namespace hermes { LazyCompilationDataInst *Function::getLazyCompilationDataInst() { return nullptr; } }' >>lib/BCGen/HBC/HBCStub.cpp; \
      echo 'namespace hermes { namespace hbc { BytecodeFunction &BytecodeModule::getFunction(unsigned) { hermes_fatal("Lean VM called BytecodeModule::getFunction"); } } }' >>lib/BCGen/HBC/HBCStub.cpp; \
    fi

# FULL=y: enable Intl support
ARG FULL=
# STATIC=y: do a fully static build and embed ICU data - ~40M binary
ARG STATIC=

RUN cmake -Bbuild -GNinja -DCMAKE_BUILD_TYPE=Release \
      $(if [ "$FULL" = y ]; then echo -DHERMES_ENABLE_INTL=ON; fi) \
      $(if [ "$STATIC" = y ]; then echo -DHERMES_STATIC_LINK=ON; fi) && \
    cmake --build build

COPY build/dist.py ./
RUN ./dist.py /dist/hermes \
      --binary=/src/build/bin/hermes \
      version="$(git describe --tags | sed 's/hermes-//; s/^v//;')"  # --version lies

# Run test262 via util/test_runner.py, patching it to emit every result to stdout
ARG TEST262=y
RUN if [ "$TEST262" = y ] && [ "$FULL" = y ]; then \
      sed -i '/is_failure = test.code.is_failure/i\        print("RESULT: " + __import__("json").dumps({"test": test.test_name, "code": test.code.name, "msg": test.msg, "output": test.output}, ensure_ascii=False))' utils/testsuite/progress.py && \
      git clone --depth=1 https://github.com/tc39/test262 /src/test262 && \
      python3 utils/test_runner.py --test-intl /src/test262/test -b build/bin >test262.log 2>&1; \
    fi || true
COPY engines/hermes/convert262.py ./
RUN python3 ./convert262.py test262.log -o /dist/hermes.test262 -b /dist/hermes --test262-dir=/src/test262 || true
