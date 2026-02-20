# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-wine
FROM $BASE

WORKDIR /src

COPY engines/jscript/jscript.cc .
COPY engines/jscript/repl.js .
RUN { echo 'static const wchar_t kReplCode[] = LR"(\n'; cat repl.js; echo '\n)";\n'; } >kReplCode.inc

RUN mkdir -p /dist/jscript-dist
RUN i686-w64-mingw32-g++ -o /dist/jscript-dist/jscript32.exe -Wall -Os -s -fno-rtti -fno-exceptions -municode jscript.cc -lole32 -loleaut32 -luuid -static-libgcc -static-libstdc++
RUN x86_64-w64-mingw32-g++ -o /dist/jscript-dist/jscript64.exe -Wall -Os -s -fno-rtti -fno-exceptions -municode jscript.cc -lole32 -loleaut32 -luuid -static-libgcc -static-libstdc++

COPY engines/jscript/jscript.sh /dist/jscript
RUN /dist/jscript --download

COPY build/dist.py ./
RUN ./dist.py /dist/jscript \
      --no-license \
      console_log=console.log

#      --dist_files=/dist/jscript-dist/jscript_5.7.dll \
# COPY build/dist.py ./
# RUN ./dist.py /dist/jscript \
#       --dist_files=/dist/jscript-dist/jscript_5.7.dll \
#       --no-license \
#       console_log=console.log

# COPY engines/jscript/jscript.sh /dist/jscript
# RUN chmod a+rx /dist/jscript && /dist/jscript --version >jscript_version
#
# COPY build/dist.py ./
# RUN ./dist.py /dist/jscript \
#       --dist_files=/root/.wine-jscript/drive_c/windows/system32/jscript.dll \
#       --no-license \
#       console_log=console.log \
#       version="$(cat jscript_version)"
