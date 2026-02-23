# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/hak/criscript.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"
COPY engines/criscript/criscript.patch /tmp/criscript.patch
RUN git apply /tmp/criscript.patch

# Linux case-sensitive filesystem fixes for upstream mixed-case includes.
RUN ln -sf criscript.h inc/CRIScript.h && \
    ln -sf criscript.h inc/CriScript.h && \
    ln -sf criscript.h inc/criScript.h && \
    ln -sf criscriptparser.hpp inc/CriScriptparser.hpp && \
    ln -sf error.h inc/Error.h && \
    ln -sf icodegen.h inc/iCodeGen.h && \
    ln -sf icodegen.h inc/ICodeGen.h && \
    ln -sf idebugger.h inc/IDebugger.h && \
    ln -sf lexer.h inc/Lexer.h && \
    ln -sf cilCodegen.h inc/cilCodeGen.h && \
    ln -sf cilVm.h inc/cilVM.h && \
    ln -sf StopWatch_osx.h inc/osx/stopwatch_osx.h && \
    ln -sf StopWatch.h inc/win32/stopwatch.h && \
    ln -sf Parser src/parser

RUN python3 -c 'from pathlib import Path; p=Path("inc/osx/stdafx_osx.h"); s=p.read_text(); needle="#include \"osx/stopwatch_osx.h\"\\n"; ins="#include <cstring>\\n"; p.write_text(s if ins in s else s.replace(needle, needle+ins, 1))'

RUN make -f Makefile.criscript -j"$(nproc)"

RUN mkdir -p /dist/criscript-dist && cp -a /tmp/bin/cscl /dist/criscript-dist/cscl

COPY build/dist.py ./
RUN ./dist.py /dist/criscript \
      --wrapper='exec "$SCRIPT_DIR/criscript-dist/cscl" -execute "$@"' \
      --dist_files=/dist/criscript-dist \
      --license=/src/CriScript_License_1_0.txt \
      console_log=print
