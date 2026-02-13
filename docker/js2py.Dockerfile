# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/PiotrDabkowski/Js2Py.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      libbz2-dev \
      libffi-dev \
      libreadline-dev \
      libsqlite3-dev \
      libssl-dev \
      zlib1g-dev

ENV DIST=/dist/js2py-dist

# Depends on python's bytecode format, incompatible with 3.11+.
# Build latest python 3.10 from source.
RUN wget https://www.python.org/ftp/python/3.10.19/Python-3.10.19.tgz && \
    tar xf Python-3.10.19.tgz && \
    cd Python-3.10.19 && \
    mkdir -p $DIST/python3.10 && \
    ./configure --prefix=$DIST/python3.10 --enable-optimizations && \
    make -j && \
    make install && \
    rm -rf Python-3.10.19*

RUN $DIST/python3.10/bin/python3 -m venv $DIST/venv && \
    $DIST/venv/bin/pip install -r requirements.txt && \
    $DIST/venv/bin/pip install numpy && \
    $DIST/venv/bin/pip install .

COPY js2py.py /dist/js2py
RUN chmod a+rx /dist/js2py

COPY dist.py ./
RUN ./dist.py /dist/js2py
