# Builds Wine's jscript.dll and a minimal host for it.
# https://gitlab.winehq.org/wine/wine/-/tree/master/dlls/jscript
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

# Runtime deps - not needed for build, only to actually run wine binaries
RUN dpkg --add-architecture i386 && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends wine wine32 wine64

#ARG REPO=https://gitlab.winehq.org/wine/wine.git
ARG REPO=https://github.com/wine-mirror/wine.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# Build 32-bit jscript.dll
RUN mkdir -p build32 && cd build32 && \
    ../configure --without-x --without-freetype --disable-tests
RUN cd build32 && \
    make -C dlls/jscript -j"$(nproc)"

# Build 64-bit jscript.dll
RUN mkdir -p build64 && cd build64 && \
    ../configure --without-x --without-freetype --disable-tests --enable-win64
RUN cd build64 && \
    make -C dlls/jscript -j"$(nproc)"

# Need to pick a different name for the dll from jscript.dll to prevent Wine
# from falling back to its pre-built jscript.dll even with absolute path passed
# to LoadLibrary.
RUN mkdir -p /dist/wine-dist && \
    strip -o /dist/wine-dist/jscript_wine32.dll build32/dlls/jscript/i386-windows/jscript.dll && \
    strip -o /dist/wine-dist/jscript_wine64.dll build64/dlls/jscript/x86_64-windows/jscript.dll

# Build host
COPY engines/wine/jscript.cc jscript.cc
RUN i686-w64-mingw32-gcc -o /dist/wine-dist/jscript_wine32.exe -x c++ -Os -s -fno-rtti -fno-exceptions -municode jscript.cc -lole32 -loleaut32 -luuid -static-libgcc
RUN x86_64-w64-mingw32-gcc -o /dist/wine-dist/jscript_wine64.exe -x c++ -Os -s -fno-rtti -fno-exceptions -municode jscript.cc -lole32 -loleaut32 -luuid -static-libgcc

# Use 64-bit library/executable by default for compatibility with default
# macOS containerization's amd64 kernel which doesn't run 32-bit binaries.
COPY build/dist.py ./
RUN ./dist.py /dist/wine \
      --dist_files=/dist/wine-dist/jscript_wine64.dll \
      --wrapper='export XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/tmp}" WINEDEBUG="${WINEDEBUG:--all,+err}"; exec wine "$SCRIPT_DIR/wine-dist/jscript_wine64.exe" --dll "$SCRIPT_DIR/wine-dist/jscript_wine64.dll" "$@"' \
      console_log=console.log
