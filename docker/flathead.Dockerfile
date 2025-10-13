ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/ndreynolds/flathead.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends libreadline-dev
RUN sed -i -e 's/yycolumn/yycolumn2/' src/lexer.l && \
    (make -j regexp=off HAS_FPU=yes || true) && \
    make -j regexp=off HAS_FPU=yes

ENV JS_BINARY=/src/bin/flat
CMD ${JS_BINARY}
