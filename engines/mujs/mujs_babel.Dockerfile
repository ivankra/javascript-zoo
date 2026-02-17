# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

RUN npm install --prefix=/dist/mujs_babel-dist \
        @babel/core @babel/preset-env \
        @rollup/plugin-babel @rollup/plugin-node-resolve @rollup/plugin-commonjs \
        rollup core-js@3

COPY engines/mujs/mujs_babel.sh /dist/mujs_babel

COPY build/dist.py ./
RUN ./dist.py /dist/mujs_babel --no-license console_log=console.log
