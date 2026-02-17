# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/gkmail/SophonJS.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN sed -i 's/ARCH:=i686-linux/ARCH:=x86_64-linux/' config.mk && \
    sed -i 's/GLOBAL/#GLOBAL/' build/arch/x86_64-linux.mk && \
    make -j

RUN head -30 src/sophonjs.c >LICENSE

COPY build/dist.py ./
RUN ./dist.py /dist/sophonjs --binary=/src/out/x86_64-linux/sophonjs
