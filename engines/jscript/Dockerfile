# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-mingw
FROM $BASE

WORKDIR /src

COPY engines/jscript/jscript.cc .
COPY engines/jscript/repl.js .
RUN { echo 'static const wchar_t kReplCode[] = LR"(\n'; cat repl.js; echo '\n)";\n'; } >kReplCode.inc

RUN mkdir -p /dist/jscript-dist
RUN i686-w64-mingw32-g++ -o /dist/jscript-dist/jscript32.exe -Wall -Os -s -fno-rtti -fno-exceptions -municode jscript.cc -lole32 -loleaut32 -luuid -static-libgcc -static-libstdc++
RUN x86_64-w64-mingw32-g++ -o /dist/jscript-dist/jscript64.exe -Wall -Os -s -fno-rtti -fno-exceptions -municode jscript.cc -lole32 -loleaut32 -luuid -static-libgcc -static-libstdc++

COPY engines/jscript/jscript.sh /dist/jscript
RUN /dist/jscript --version | tr -d '\r' >version

COPY build/dist.py ./
RUN ./dist.py /dist/jscript \
      --dist_files=/dist/jscript-dist/jscript64.dll \
      --no-license \
      console_log=console.log \
      version="$(cat version)"
