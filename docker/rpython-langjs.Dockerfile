# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      libbz2-dev \
      libexpat-dev \
      libffi-dev \
      libreadline-dev \
      libsqlite3-dev \
      libssl-dev \
      zlib1g-dev

WORKDIR /opt

# Build last Python 2.7 from source to bootstrap pypy2
RUN wget https://www.python.org/ftp/python/2.7.18/Python-2.7.18.tgz && \
    tar xf Python-2.7.18.tgz && \
    (echo "da3080e3b488f648a3d7a4560ddee895284c3380b11d6de75edb986526b9a814  Python-2.7.18.tgz" | sha256sum -c) && \
    cd Python-2.7.18 && \
    mkdir -p /opt/python2.7 && \
    CFLAGS=-O3 ./configure --prefix=/opt/python2.7 && \
    make -j && \
    make install && \
    cd .. && \
    rm -rf Python-2.7.18 Python-2.7.18.tgz
# Get pip for python 2.7
RUN wget https://bootstrap.pypa.io/pip/2.7/get-pip.py && \
    (echo "40ee07eac6674b8d60fce2bbabc148cf0e2f1408c167683f110fd608b8d6f416  get-pip.py" | sha256sum -c) && \
    /opt/python2.7/bin/python2.7 get-pip.py && \
    rm -f get-pip.py
# Dependencies for pypy2
RUN /opt/python2.7/bin/pip install --no-cache-dir pycparser cffi

ENV DIST=/dist/rpython-langjs-dist

# Build pypy2 from source (~1h)
RUN wget https://downloads.python.org/pypy/pypy2.7-v7.3.20-src.tar.bz2 && \
    (echo "bf958498445f7bf78338723c8d86bd6711e8792461725d2481df77a9566a3e62  pypy2.7-v7.3.20-src.tar.bz2" | sha256sum -c) && \
    tar -xjf pypy2.7-v7.3.20-src.tar.bz2 && \
    rm -f pypy2.7-v7.3.20-src.tar.bz2 && \
    mkdir -p $DIST && \
    mv pypy2.7-v7.3.20-src $DIST/pypy2.7
RUN sed -i 's/# Print a top-level warning.*/return -1/' $DIST/pypy2.7/rpython/memory/gc/env.py
RUN rm -rf "$DIST/pypy2.7/rpython/_cache" && ln -s /tmp "$DIST/pypy2.7/rpython/_cache"
RUN cd $DIST/pypy2.7 && make RUNINTERP=/opt/python2.7/bin/python2.7
# missing isnan/isinf that rpython-langjs uses
RUN echo '\ndef isnan(x):\n    return x != x\n\ndef isinf(x):\n    return x == INFINITY or x == -INFINITY' >>$DIST/pypy2.7/rpython/rlib/rfloat.py

RUN rm -rf $DIST/pypy2.7/site-packages $DIST/pypy2.7/bin $DIST/pypy2.7/dotviewer
RUN find $DIST -name '*test*' -exec rm -rf {} ';' 2>/dev/null || true
RUN find $DIST -name '*doc*' -exec rm -rf {} ';' 2>/dev/null || true
RUN find $DIST -name '*.pyc' -exec rm -rf {} ';' 2>/dev/null || true

ARG REPO=https://github.com/progval/rpython-langjs.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN sed -i 's/^_version_string = .*/_version_string = "1.0"/' js/builtins/js_global.py

RUN cp -a js py-js.py $DIST/ && \
    echo >/dist/rpython-langjs \
'#!/bin/bash'"\n"\
'SCRIPT_DIR=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")'"\n"\
'DIST=$SCRIPT_DIR/rpython-langjs-dist'"\n"\
'export PYTHONPATH=$DIST/pypy2.7'"\n"\
'exec $DIST/pypy2.7/pypy/goal/pypy-c $DIST/py-js.py "$@"' && \
    chmod a+rx /dist/rpython-langjs && \
    du -bc $DIST | tail -1 | cut -f 1 >jsz_dist_size

ENV JS_BINARY=/dist/rpython-langjs
CMD ${JS_BINARY}
