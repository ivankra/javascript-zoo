ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/acornjs/acorn.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install
RUN npm run build

RUN npm install esbuild
RUN sed -i '1i #!/usr/bin/env node' acorn/dist/bin.js && \
    npx esbuild --bundle acorn/dist/bin.js --outfile=/dist/parsers/acorn --platform=node --minify && \
    cp acorn/LICENSE /dist/parsers/acorn.LICENSE && \
    du -bc /dist/parsers/acorn | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV DIST_BIN=/dist/parsers/acorn
