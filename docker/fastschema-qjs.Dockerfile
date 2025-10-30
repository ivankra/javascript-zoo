ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/fastschema/qjs
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

# Disable strict mode by default. No easy way to do it from main package.
RUN sed -i 's/ | JsEvalFlagStrict//' options.go

COPY fastschema-qjs.go ./
RUN go build fastschema-qjs.go

ENV JS_BINARY=/src/fastschema-qjs
CMD ${JS_BINARY}
