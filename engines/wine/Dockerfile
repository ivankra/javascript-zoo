# Builds Wine's open-source reimplementation of jscript.dll
# https://gitlab.winehq.org/wine/wine/-/tree/master/dlls/jscript
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-wine
FROM $BASE

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

# Use non-standard jscript32.dll/jscript64.dll over jscript.dll to prevent Wine's
# fallback to internal jscript.dll even with absolute path passed to LoadLibrary.
RUN mkdir -p /dist/wine-dist && \
    strip -o /dist/wine-dist/jscript32.dll build32/dlls/jscript/i386-windows/jscript.dll && \
    strip -o /dist/wine-dist/jscript64.dll build64/dlls/jscript/x86_64-windows/jscript.dll

# Copy DLL host binaries from engines/jscript/
COPY --from=jsz-jscript /dist/jscript-dist/jscript32.exe /dist/wine-dist/
COPY --from=jsz-jscript /dist/jscript-dist/jscript64.exe /dist/wine-dist/

# Use 64-bit library/executable by default for compatibility with default
# macOS containerization's amd64 kernel which doesn't run 32-bit binaries.
COPY build/dist.py ./
RUN ./dist.py /dist/wine \
      --dist_files=/dist/wine-dist/jscript64.dll \
      --wrapper='export XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/tmp}" WINEDEBUG="${WINEDEBUG:--all,+err}"; exec wine "$SCRIPT_DIR/wine-dist/jscript64.exe" --dll "$SCRIPT_DIR/wine-dist/jscript64.dll" "$@"' \
      console_log=console.log
