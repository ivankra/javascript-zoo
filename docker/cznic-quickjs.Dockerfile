ARG BASE=jsz-golang
FROM $BASE

ARG REPO=https://gitlab.com/cznic/quickjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

COPY cznic-quickjs.go main.go

RUN go build main.go

ENV JS_BINARY=/src/main LICENSES="LICENSE LICENSE-LIBQUICKJS"
CMD ${JS_BINARY}
