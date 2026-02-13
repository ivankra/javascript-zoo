# XS build instructions:
# https://github.com/Moddable-OpenSource/moddable/blob/public/documentation/Moddable%20SDK%20-%20Getting%20Started.md#lin-instructions
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/Moddable-OpenSource/moddable.git
ARG REV=public

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

RUN apt-get update -y && apt-get install -y --no-install-recommends libncurses-dev
RUN cd xs/makefiles/lin && MODDABLE=/src make -j release  # -O3

COPY dist.py ./
RUN ./dist.py /dist/xs \
      --binary=/src/build/bin/lin/release/xst \
      --license=licenses/* \
      version="$(/src/build/bin/lin/release/xst -v | sed 's/^XS \([^, ]*\).*/\1/')"
