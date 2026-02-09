# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/quickjs-ng/quickjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN sed -i '/-Werror/d' CMakeLists.txt
RUN make

ENV JS_BINARY=/src/build/qjs
CMD ${JS_BINARY}
