# First ES5-compliant SpiderMonkey version, shipped in Firefox 4.0 (2011).
# Features TraceMonkey tracing JIT, JägerMonkey method JIT, PIC, YARR.
#
# Doesn't work on arm64: JIT doesn't support this target.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

# Python 2 required for build
# Alternatively, for 1.8.5 only minimal fixes are needed:
#    sed -i -e 's/"import sys; sys.exit.*"/""/' configure
#    sed -i -E -e 's/print "(.*)"/print("\1")/' imacro_asm.py
RUN sed -i 's/ stable-updates$/ stable-updates bullseye/' /etc/apt/sources.list.d/debian.sources && \
    apt-get update -y && apt-get install -y --no-install-recommends python2 python2-dev

# JavaScript-C 1.8.5 2011-03-31
ARG TARBALL=https://archive.mozilla.org/pub/js/js185-1.0.0.tar.gz
# SpiderMonkey 17 and 24 can also be built with this script
#ARG TARBALL=https://archive.mozilla.org/pub/js/mozjs17.0.0.tar.gz
#ARG TARBALL=https://archive.mozilla.org/pub/js/mozjs-24.2.0.tar.bz2

WORKDIR /src
RUN wget "$TARBALL" && tar xf "$(basename "$TARBALL")"

RUN cloc */js/src --csv --fullpath --not_match_f="(OBJ|test|/configure$|UnicodeData.txt$|/(t|v8|octane|parjs-benchmarks|ctypes|metrics|config|ref-config|build|editline|perlconnect|liveconnect|fdlibm|devtools|python)/)" \ 
      | sed -ne '$ s/.*,\([^,]*\)$/\1/p' >jsz_loc

RUN cd */js/src && \
    export CXXFLAGS="--std=gnu++03" && \
    export CFLAGS="--std=gnu99 -Wno-implicit-int -Wno-implicit-function-declaration" && \
    export SHELL=/bin/bash && \
    # fix buggy gcc wrapper in 1.8.5 \
    if [ -f build/hcpp ]; then \
      chmod a+rx build/hcc build/hcpp && \
      sed -i "s|CXX=.*|shift; $CXX \"\$@\"; exit \$?|" build/hcpp; \
    fi && \
    sed -i 's/\(QuoteString(&sprinter, s, quote)\) >= 0/\1 >= (char*)NULL/' jsopcode.cpp && \
    ./configure --enable-static --enable-optimize="-O3" --disable-warnings-as-errors && \
    make -j $(nproc)

# Metadata
ENV JS_BINARY=/src/js/src/shell/js
RUN ln -s */js js && \
    (cp */LICENSE ./ || sed -n '/BEGIN LICENSE BLOCK/,/END LICENSE BLOCK/p' js/src/jsinterp.h >LICENSE) && \
    echo "$TARBALL" >jsz_sources && \
    echo "$TARBALL" | sed -E 's/.*js185.*/1.8.5/; s/.*mozjs-?([0-9.]*)\.tar.*/\1/' >jsz_version && \
    stat -c %y */README | grep -o '20[0-9][0-9]-[0-9][0-9]-[0-9][0-9]' >jsz_revision_date && \
    echo YARR >jsz_regex && \
    echo ES5 >jsz_standard
CMD ${JS_BINARY}

# JIT-less 1.8.5 crashes on arm64:
# sed -i 's/ -DENABLE_ASSEMBLER=.*//' Makefile.in
# ./configure --host="$(uname -m)-unknown-linux" ...
