# Microsoft JScript engine installer and runner for Linux
# via Wine + winetricks + Windows Script Host.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

COPY jscript.sh /dist/jscript
RUN chmod a+rx /dist/jscript && /dist/jscript --version >jscript_version

COPY dist.py ./
RUN ./dist.py /dist/jscript \
      --dist_files=/root/.cache/jsz-jscript/drive_c/windows/system32/jscript.dll \
      version="$(cat jscript_version)"
