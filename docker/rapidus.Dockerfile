ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/maekawatoshiki/rapidus.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN rustup toolchain install nightly-2023-02-01 && rustup override set nightly-2023-02-01
RUN cargo build --release

ENV JS_BINARY=/src/target/release/rapidus-repl
CMD ${JS_BINARY}
