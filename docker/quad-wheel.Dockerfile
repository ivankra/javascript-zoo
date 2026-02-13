# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/radare/quad-wheel.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

# Fix crap like:
#   unichar *rr = (unichar *)((int)r + sizeof(int));
#   #define UNISTR(_len) struct{int len;unichar unistr[(_len)+1];}
#   #define unistrlen(str) (*((int *)(((int)(str)) - sizeof(int))))
RUN sed -i -E -e 's/[(][(]int[)]([a-z]+|[(][a-z]+[)])[)] ([-+0-9* ]* sizeof[(]int[)])/((char*)\1) \2/' *.c *.h && \
    sed -i -E -e 's/[(]int[)]([a-z]+|[(][a-z]+[)]) ([-+0-9* ]* sizeof[(]int[)])/((char*)\1) \2/' *.c *.h && \
    sed -i -e 's/(_len) struct{/(_len) struct __attribute__((aligned(4))) {/' *.h && \
    sed -i -e 's/-O2/-O3/g; s/-Werror//g' Makefile && \
    make

# Per https://code.google.com/archive/p/quad-wheel/
RUN echo "MIT" >LICENSE

COPY dist.py ./
RUN ./dist.py /dist/quad-wheel --binary=/src/quadwheel
