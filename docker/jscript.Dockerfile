# Microsoft JScript engine installer and runner for Linux
# via Wine + winetricks + Windows Script Host.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN dpkg --add-architecture i386 && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends ca-certificates cabextract curl wine wine32

COPY jscript.sh /dist/jscript

RUN chmod a+rx /dist/jscript; \
    /dist/jscript --version >/dist/jsz_version; \
    du -bc ~/.cache/jsz-jscript/drive_c/windows/system32/jscript.dll | tail -1 | cut -f 1 >/dist/jsz_binary_size

ENV JS_BINARY=/dist/jscript
CMD ${JS_BINARY}
