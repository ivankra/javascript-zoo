# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/DigitalMars/DMDScript.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN apt-get update -y && apt-get install -y --no-install-recommends ldc dub

RUN bash ./build.sh

COPY build/dist.py ./
RUN ./dist.py /dist/dmdscript --binary=/src/dmdscript console_log=println
