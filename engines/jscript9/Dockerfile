# Builds a minimal JScript9/Chakra DLL host and bundles with
# jscript9.dll extracted from IE11 installer.
#
# Note: rosetta and qemu fail to emulate some x64 stuff needed
# for this engine - have to run it on real x64 hardware.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-mingw
FROM $BASE

WORKDIR /src

COPY engines/jscript9/jsrt.cc .
COPY engines/jscript/repl.js .
RUN { echo 'static const wchar_t kReplCode[] = LR"(\n'; cat repl.js; echo '\n)";\n'; } >kReplCode.inc

RUN mkdir -p /dist/jscript9-dist
RUN i686-w64-mingw32-g++ -o /dist/jscript9-dist/jsrt32.exe -Wall -Os -s -fno-rtti -fno-exceptions -municode jsrt.cc -static-libgcc -static-libstdc++
RUN x86_64-w64-mingw32-g++ -o /dist/jscript9-dist/jsrt64.exe -Wall -Os -s -fno-rtti -fno-exceptions -municode jsrt.cc -static-libgcc -static-libstdc++

COPY engines/jscript9/jscript9.sh /dist/jscript9
RUN /dist/jscript9 --download

COPY build/dist.py ./
RUN ./dist.py /dist/jscript9 \
      --dist_files=/dist/jscript9-dist/jscript9.dll \
      --no-license \
      console_log=console.log \
      version="11.0.16428"
