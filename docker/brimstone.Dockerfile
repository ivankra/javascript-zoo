ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/Hans-Halverson/brimstone.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN cargo build --release

ENV JS_BINARY=/src/target/release/bs
# No REPL
