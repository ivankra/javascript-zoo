# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/charliesome/twostroke.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get update && \
    apt-get install -y --no-install-recommends ruby ruby-dev && \
    gem install bundler

COPY twostroke.patch ./
RUN git apply twostroke.patch

RUN export DIST=/dist/twostroke-dist && \
    mkdir -p $DIST/.bundle && \
    bundle install --path $DIST/bundle && \
    cp -a lib *.rb Gemfile* $DIST/ && \
    echo '---' > $DIST/.bundle/config && \
    echo 'BUNDLE_PATH: "bundle"' >> $DIST/.bundle/config

COPY twostroke.sh /dist/twostroke

RUN chmod a+rx /dist/twostroke && \
    du -bc $DIST | tail -1 | cut -f 1 >jsz_dist_size

ENV JS_BINARY=/dist/twostroke
CMD ${JS_BINARY}
