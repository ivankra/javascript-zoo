# Image for Docker Hub: https://hub.docker.com/r/ivankra/javascript-zoo
# Run hub.sh to build and push.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-runtime
FROM $BASE

ARG TAG
ARG TARGETARCH
# Optional: commit sha to locally tag as $TAG in case github release is still a draft (no git tag)
ARG REV=

# Repackaged binaries from GitHub release as a single tarball with <arch>/ directory.
ADD dist/$TARGETARCH-$TAG.tar /tmp

# /zoo intentionally tracks main HEAD (not $TAG) so `git pull` inside the
# container fetches the latest harness/scripts.
RUN rm -rf /dist /zoo && \
    mv /tmp/$TARGETARCH /dist && \
    if [ -n "$REV" ]; then \
        git clone --depth=1 "https://github.com/ivankra/javascript-zoo.git" /zoo && \
        cd /zoo && git fetch --depth=1 origin "$REV" && git tag -f "$TAG" "$REV"; \
    else \
        git clone --depth=1 --branch="$TAG" "https://github.com/ivankra/javascript-zoo.git" /zoo && \
        cd /zoo; \
    fi && \
    git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*' && \
    git fetch --depth=1 origin main && \
    git checkout -B main origin/main && \
    git submodule update --init --depth=1 && \
    mkdir -p /zoo/dist && ln -s /dist /zoo/dist/$TARGETARCH && \
    cat /zoo/build/hub.motd | sed "2s/\$/ @$TAG $TARGETARCH/" >/etc/motd && \
    echo 'eval $(dircolors); alias ls="ls --color=auto"; export PATH=/zoo/harness:/opt/node/bin:/opt/dotnet:$PATH; cat /etc/motd' >>/etc/profile

# Build AOT cache for faster startup
RUN rm -rf /dist/rhino-dist/rhino.aot* && /dist/rhino /zoo/bench/v8-v7.js || true; \
    rm -rf /dist/reeva-dist/reeva.aot* && /dist/reeva /zoo/bench/richards.js || true;

WORKDIR /dist

CMD /bin/bash --login -i
