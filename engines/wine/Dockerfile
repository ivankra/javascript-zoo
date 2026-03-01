# Builds Wine's open-source reimplementation of jscript.dll
# https://gitlab.winehq.org/wine/wine/-/tree/master/dlls/jscript
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-mingw
FROM $BASE

#ARG REPO=https://gitlab.winehq.org/wine/wine.git
ARG REPO=https://github.com/wine-mirror/wine.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD

# Build 64-bit jscript.dll
RUN mkdir -p build64 && cd build64 && \
    ../configure --without-x --without-freetype --disable-tests --enable-win64
RUN cd build64 && \
    make -C dlls/jscript -j"$(nproc)"
# Use non-standard jscript32.dll/jscript64.dll over jscript.dll to prevent Wine's
# fallback to internal jscript.dll even with absolute path passed to LoadLibrary.
RUN mkdir -p /dist/wine-dist && \
    strip -o /dist/wine-dist/jscript64.dll build64/dlls/jscript/x86_64-windows/jscript.dll

# Build 32-bit jscript.dll. Some build steps require running i386 binaries
# which doesn't work under macOS containerization's kernel - skip.
RUN if ! grep -q /sbin/vminitd /proc/cmdline; then \
      mkdir -p build32 && cd build32 && \
      ../configure --without-x --without-freetype --disable-tests && \
      make -C dlls/jscript -j"$(nproc)" && \
      strip -o /dist/wine-dist/jscript32.dll dlls/jscript/i386-windows/jscript.dll; \
    fi

# Build DLL host binaries
COPY engines/jscript/jscript.cc .
COPY engines/jscript/repl.js .
RUN { echo 'static const wchar_t kReplCode[] = LR"(\n'; cat repl.js; echo '\n)";\n'; } >kReplCode.inc
RUN mkdir -p /dist/wine-dist
RUN i686-w64-mingw32-g++ -o /dist/wine-dist/jscript32.exe -Wall -Os -s -fno-rtti -fno-exceptions -municode jscript.cc -lole32 -loleaut32 -luuid -static-libgcc -static-libstdc++
RUN x86_64-w64-mingw32-g++ -o /dist/wine-dist/jscript64.exe -Wall -Os -s -fno-rtti -fno-exceptions -municode jscript.cc -lole32 -loleaut32 -luuid -static-libgcc -static-libstdc++

# TODO: copy DLL host binaries from engines/jscript/, add jsz-jscript dep to build/Makefile
# Broken under Apple's containerization - misresolves COPY --from=<local tag>
#COPY --from=jsz-jscript /dist/jscript-dist/jscript32.exe /dist/wine-dist/
#COPY --from=jsz-jscript /dist/jscript-dist/jscript64.exe /dist/wine-dist/

COPY build/dist.py ./
RUN ./dist.py /dist/wine \
      --dist_files=/dist/wine-dist/jscript64.dll \
      --wrapper='export WINEDEBUG="${WINEDEBUG:--all,+err}" LD_PRELOAD= XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/tmp}"; if [[ -x /usr/lib/wine/wine64 ]]; then WINE=/usr/lib/wine/wine64; fi; exec "${WINE:-wine}" "$SCRIPT_DIR/wine-dist/jscript64.exe" --dll "$SCRIPT_DIR/wine-dist/jscript64.dll" "$@"' \
      console_log=console.log
