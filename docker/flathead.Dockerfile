ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/ndreynolds/flathead.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN apt-get update -y && apt-get install -y --no-install-recommends libreadline-dev
RUN sed -i -e 's/xint yycolumn/extern int yycolumn/' src/grammar.y && \
    sed -i -e 's/yycolumn/yycolumn2/' src/lexer.l && \
    for n in 1 2; do make -j regexp=off HAS_FPU=yes; done

ENV JS_BINARY=/src/bin/flat
CMD ${JS_BINARY}
