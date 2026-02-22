# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN sed -i 's/ stable-updates$/ stable-updates bullseye/' /etc/apt/sources.list.d/debian.sources && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends python2

RUN python2 modules/hardcore/scripts/operasetup.py --only --generate_pch --generate_strings -I/src

# Default config assumes executable .rodata on non-Windows
RUN sed -i '/# define CONSTANT_DATA_IS_EXECUTABLE/d' modules/ecmascript/carakan/src/es_pch.h

# Bump CCFLAGS_RELEASE from -O2 to -O3
RUN sed -i 's/ -O2 / -O3 /' modules/ecmascript/carakan/standalone/Makefile

# Enable JIT (-np flag) by default
RUN sed -i 's/opt.native_dispatcher = FALSE;/opt.native_dispatcher = TRUE; g_native_dispatcher = TRUE;/' modules/ecmascript/carakan/standalone/programs/jsshell.cpp

RUN cd /src/modules/ecmascript/carakan/standalone && \
    make -j"$(nproc)" \
      CCFLAGS_OBJ="-fpermissive -w" \
      ES_STANDALONE_VERSION="$(git rev-parse --short=8 HEAD)" \
      MODE=RELEASE \
      PYTHON=python2

COPY build/dist.py ./
RUN ./dist.py /dist/carakan \
      --binary=/src/modules/ecmascript/carakan/standalone/fast-jsshell \
      --no-license \
      console_log=print \
      repository=
