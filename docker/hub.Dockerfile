# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-runtime
FROM $BASE

ARG REPO=https://github.com/ivankra/javascript-zoo.git \
    REV=master \
    TARGETARCH=amd64

RUN mkdir -p /zoo && cd /zoo && \
    (git clone --depth=1 --branch="$REV" "$REPO" . || \
     (git clone --depth=1 "$REPO" /zoo && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git submodule update --init --depth=1 && \
    cd /zoo/bench && make && ln -s zoo/bench /bench && \
    mkdir -p /zoo/dist && ln -s zoo/dist/$TARGETARCH /dist && \
    cat /zoo/docker/hub.motd | sed "2s/\$/ @$REV $TARGETARCH/" >/etc/motd && \
    echo 'eval $(dircolors); alias ls="ls --color=auto"; export PATH=/bench:$PATH; cat /etc/motd' >>/etc/profile

ADD dist/$TARGETARCH.tar /zoo/dist

WORKDIR /zoo/dist
CMD /bin/bash --login -i
