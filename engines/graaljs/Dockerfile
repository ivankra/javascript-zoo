# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

# Currently we only download pre-built GraalJS releases.
# REV=master => nightly from https://github.com/graalvm/graalvm-ce-dev-builds/releases

#ARG REPO=https://github.com/oracle/graaljs.git
#ARG REV=graal-25.0.2
ARG REV=master

WORKDIR /dist
RUN arch="$(uname -m | sed 's/x86_64/amd64/')" && \
    if [ "$REV" = master ]; then \
      asset="graaljs-community-dev-linux-$arch.tar.gz"; \
      tag="$(wget -qO- https://api.github.com/repos/graalvm/graalvm-ce-dev-builds/releases/latest | sed -En 's/^[[:space:]]*\"tag_name\":[[:space:]]*\"([^\"]+)\".*/\1/p' | head -n1)" && \
      echo "$tag" | sed -En 's@.*-([0-9]{4})([0-9]{2})([0-9]{2})_[0-9]{4}$@\1-\2-\3@p' > revision-date.txt && \
      wget "https://github.com/graalvm/graalvm-ce-dev-builds/releases/latest/download/$asset"; \
    else \
      asset="$(echo "$REV" | sed 's/graal/graaljs/')-linux-$arch.tar.gz"; \
      wget "https://github.com/oracle/graaljs/releases/download/$REV/$asset"; \
    fi && \
    tar xf graaljs-*.tar.gz && \
    rm -f graaljs-*.tar.gz && \
    mv graaljs-* graaljs-dist

WORKDIR /src
COPY build/dist.py ./
RUN revision_date_arg="" && \
    if [ -s /dist/revision-date.txt ]; then \
      revision_date_arg="revision_date=$(cat /dist/revision-date.txt)"; \
    fi && \
    ./dist.py /dist/graaljs \
      --wrapper='exec "$SCRIPT_DIR/graaljs-dist/bin/js" "$@"' \
      --license=/dist/graaljs-dist/LICENSE.txt \
      version="$(/dist/graaljs-dist/bin/js --version | egrep -o '[0-9.]+')" \
      revision="$(sed -En 's/^SOURCE=\".* graal-js:([0-9a-f]+) .*/\1/p' </dist/graaljs-dist/release)" \
      $revision_date_arg
