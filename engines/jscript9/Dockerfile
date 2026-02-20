# Builds a minimal JScript9 (Chakra/IE JsRT) host executable and bundles
# jscript9.dll extracted from IE11 redistributable payload.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
      gcc-multilib \
      g++-multilib \
      libc6-dev-i386 \
      binutils-mingw-w64-i686 \
      gcc-mingw-w64-i686 \
      g++-mingw-w64-i686 \
      gcc-mingw-w64-x86-64 \
      g++-mingw-w64-x86-64 \
      libxkbcommon-dev

RUN dpkg --add-architecture i386 && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends wine wine32 wine64

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends curl cabextract unzip p7zip-full

COPY engines/jscript9/download-jscript9.sh /tmp/download-jscript9.sh
RUN chmod a+rx /tmp/download-jscript9.sh && /tmp/download-jscript9.sh /dist/jscript9-dist

WORKDIR /src

COPY engines/jscript9/jsrt.cc .
COPY engines/jscript9/repl.js .
RUN { echo 'static const wchar_t kReplCode[] = LR"(\n'; cat repl.js; echo '\n)";\n'; } >kReplCode.inc
RUN i686-w64-mingw32-g++ -o /dist/jscript9-dist/jsrt32.exe -Os -s -fno-rtti -fno-exceptions -municode jsrt.cc -static-libgcc -static-libstdc++
RUN x86_64-w64-mingw32-g++ -o /dist/jscript9-dist/jsrt64.exe -Os -s -fno-rtti -fno-exceptions -municode jsrt.cc -static-libgcc -static-libstdc++

COPY build/dist.py ./
RUN ./dist.py /dist/jscript9 \
      --dist_files=/dist/jscript9-dist/jscript9.dll \
      --no-license \
      --wrapper='export WINEDEBUG="${WINEDEBUG:--all,+err}" LD_PRELOAD= XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/tmp}"; exec wine "$SCRIPT_DIR/jscript9-dist/jsrt64.exe" --dll "$SCRIPT_DIR/jscript9-dist/jscript9.dll" "$@"' \
      console_log=console.log
