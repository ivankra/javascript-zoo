ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://github.com/grafana/sobek
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY sobek.go ./
RUN go build sobek.go

ENV JS_BINARY=/src/sobek
CMD ${JS_BINARY}
