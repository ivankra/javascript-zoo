# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-runtime
FROM $BASE

ARG REPO=https://github.com/ivankra/javascript-zoo.git \
    REV=master \
    TARGETARCH=amd64

ADD dist/$TARGETARCH.tar /tmp

RUN mv /tmp/$TARGETARCH /dist && \
    git clone --depth=1 --branch="$REV" "$REPO" /zoo && \
    cd /zoo && git submodule update --init --depth=1 && \
    cd /zoo/bench && make && ln -s zoo/bench /bench && \
    mkdir -p /zoo/dist && ln -s /dist /zoo/dist/$TARGETARCH && \
    cat /zoo/docker/hub.motd | sed "2s/\$/ @$REV $TARGETARCH/" >/etc/motd && \
    echo 'eval $(dircolors); alias ls="ls --color=auto"; export PATH=/bench:$PATH; cat /etc/motd' >>/etc/profile

WORKDIR /dist

CMD /bin/bash --login -i
