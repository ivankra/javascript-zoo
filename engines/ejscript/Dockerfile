# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/embedthis/ejscript.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN sed -i '/^PUBLIC void mprAssert(cchar \\*loc, cchar \\*msg)/,/^}/ s/^}$/    exit(1);\\\n}/' src/mpr/mprLib.c

RUN export CFLAGS='-std=gnu89 -fpermissive -w' \
           ME_EJSCRIPT_COMPILE='\"\"' \
           DEBUG=release \
           ME_COM_MBEDTLS=0 \
           ME_COM_SSL=0 \
           ME_COM_HTTP=1 \
           ME_COM_OPENSSL=0 \
           BINDIR="build/linux-$(uname -m | sed 's/^x86_64$/x64/')-default/bin"; \
    make -f projects/ejscript-linux-default.mk prep && \
    for target in libzlib.so libmpr.so libpcre.so libhttp.so libejs.so ejsc ejsmod ejs.mod ejs; do \
      make -f projects/ejscript-linux-default.mk -j1 "$BINDIR/$target"; \
    done

RUN export BINDIR="build/linux-$(uname -m | sed 's/^x86_64$/x64/')-default/bin"; \
    mkdir -p /dist/ejscript-dist && \
    cp -a "$BINDIR/." /dist/ejscript-dist/ && \
    (strip /dist/ejscript-dist/* || true)

COPY build/dist.py ./
RUN ./dist.py /dist/ejscript \
      --wrapper='DIST="$SCRIPT_DIR/ejscript-dist"; export LD_LIBRARY_PATH="$DIST${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"; exec "$DIST/ejs" -C "$DIST" --search "$DIST" "$@"'
