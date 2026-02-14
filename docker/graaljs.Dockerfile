# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/oracle/graaljs.git
ARG REV=graal-25.0.2

# Download pre-built release
WORKDIR /dist
RUN wget "https://github.com/oracle/graaljs/releases/download/$REV/$(echo "$REV" | sed 's/graal/graaljs/')-linux-$(uname -m | sed 's/x86_64/amd64/').tar.gz" && \
    tar xf graaljs-*.tar.gz && \
    rm -f graaljs-*.tar.gz && \
    mv graaljs-* graaljs-dist

WORKDIR /src
COPY dist.py ./
RUN ./dist.py /dist/graaljs \
      --wrapper='exec "$SCRIPT_DIR/graaljs-dist/bin/js" "$@"' \
      --license=/dist/graaljs-dist/LICENSE.txt \
      version="$(/dist/graaljs-dist/bin/js --version | egrep -o '[0-9.]+')" \
      revision="$(sed -En 's/^SOURCE=\".* graal-js:([0-9a-f]+) .*/\1/p' </dist/graaljs-dist/release)"
