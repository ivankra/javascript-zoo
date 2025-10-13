ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/sablejs/sablejs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install
RUN sed -i 's/.*spawn.sync.*/process.exit(0);/' cli.js && node ./cli.js cli.js

COPY sablejs.js ./

RUN mkdir -p /dist/sablejs-dist && \
    cp -r .pkg/sablejs-linux-* /dist/sablejs-dist/ && \
    cp runtime.js /dist/sablejs-dist/runtime.js && \
    cp sablejs.js /dist/sablejs && \
    chmod a+rx /dist/sablejs && \
    du -bc /dist/sablejs-dist | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/sablejs
# No REPL
