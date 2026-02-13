# Microsoft JScript engine installer and runner for Linux
# via Wine + winetricks + Windows Script Host.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

COPY jscript.sh /dist/jscript
RUN chmod a+rx /dist/jscript && /dist/jscript --version

COPY dist.py ./
RUN ./dist.py /dist/jscript \
      version="$(/dist/jscript --version)" \
      binary_size="$(du -bc ~/.cache/jsz-jscript/drive_c/windows/system32/jscript.dll | tail -1 | cut -f 1)"
