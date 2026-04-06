# Image for Docker Hub: https://hub.docker.com/r/ivankra/javascript-zoo
# Run hub.sh to build and push.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-runtime
FROM $BASE

ARG TAG
ARG TARGETARCH

# Repackaged binaries from GitHub release as a single tarball with <arch>/ directory.
ADD dist/$TARGETARCH-$TAG.tar /tmp

RUN rm -rf /dist /zoo && \
    mv /tmp/$TARGETARCH /dist && \
    git clone --depth=1 --branch="$TAG" "https://github.com/ivankra/javascript-zoo.git" /zoo && \
    cd /zoo && \
    git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*' && \
    git fetch --depth=1 origin main && \
    git checkout -B main origin/main && \
    git submodule update --init --depth=1 && \
    mkdir -p /zoo/dist && ln -s /dist /zoo/dist/$TARGETARCH && \
    cat /zoo/build/hub.motd | sed "2s/\$/ @$TAG $TARGETARCH/" >/etc/motd && \
    echo 'eval $(dircolors); alias ls="ls --color=auto"; export PATH=/zoo/bench:/zoo/conformance:/opt/node/bin:/opt/dotnet:$PATH; cat /etc/motd' >>/etc/profile

# Build AOT cache for faster startup
RUN rm -rf /dist/rhino-dist/rhino.aot* && /dist/rhino /zoo/bench/v8-v7.js || true

WORKDIR /dist

CMD /bin/bash --login -i
