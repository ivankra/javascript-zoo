ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/nyariv/SandboxJS.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install && npm install esbuild && npm run build

COPY sandboxjs.js ./

RUN npx esbuild sandboxjs.js --outfile=/dist/sandboxjs --bundle --platform=node && \
    npx esbuild sandboxjs.js --outfile=/dist/sandboxjs.min.js --bundle --platform=node --minify

ENV JS_BINARY=/dist/sandboxjs
# No REPL
