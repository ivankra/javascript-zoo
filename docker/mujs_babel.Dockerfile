# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-node
FROM $BASE

RUN npm install --prefix=/dist/mujs_babel-dist \
        @babel/core @babel/cli @babel/preset-env
        #rollup @rollup/plugin-babel core-js@3

COPY mujs_babel.sh /dist/mujs_babel

ENV JS_BINARY=/dist/mujs_babel
