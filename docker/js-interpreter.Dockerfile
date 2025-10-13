ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/NeilFraser/JS-Interpreter.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install esbuild

COPY js-interpreter.js ./

RUN npx esbuild js-interpreter.js --outfile=/dist/js-interpreter --bundle --platform=node && \
    npx esbuild js-interpreter.js --outfile=/dist/js-interpreter.min.js --bundle --platform=node --minify && \
    du -bc /dist/js-interpreter.min.js | tail -1 | cut -f 1 >/dist/jsz_dist_size

ENV JS_BINARY=/dist/js-interpreter
CMD ${JS_BINARY}
