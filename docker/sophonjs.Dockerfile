ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/gkmail/SophonJS
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN sed -i 's/ARCH:=i686-linux/ARCH:=x86_64-linux/' config.mk && \
    sed -i 's/GLOBAL/#GLOBAL/' build/arch/x86_64-linux.mk && \
    make -j

ENV JS_BINARY=/src/out/x86_64-linux/sophonjs
CMD ${JS_BINARY}
