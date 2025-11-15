# Building Hermes:
# https://github.com/facebook/hermes/blob/main/doc/BuildingAndRunning.md
#
# Hermes (main branch):
#   * Not actively developed anymore, barely maintained
#   * Release branches: rn/0.xx-stable
#   * Tags: v0.x.x, hermes-v0.14.0
#
# Static Hermes (static_h branch)
#   * Next generation of Hermes in active development, ~3k commits ahead of main
#   * Release branch: 250829098.0.0-stable
#   * Tags: hermes-v250829098.0.2, hermes-v250829098.0.3
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# Build failures with gcc15
ARG BASE=jsz-gcc14
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends libicu-dev libreadline-dev
    #build-essential ca-certificates cmake git ninja-build python3 zip

ARG REPO=https://github.com/facebook/hermes.git
ARG REV=main

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# For broken -DHERMES_ENABLE_INTL=ON on main branch
RUN sed -i 's/std::uint8_t/unsigned char/g' /src/lib/Platform/Intl/impl_icu/IntlUtils.cpp

# Static build (-DHERMES_STATIC_LINK=ON) embeds ICU data, ~40MB

ARG INTL=
ARG STATIC=

RUN cmake -Bbuild -GNinja -DCMAKE_BUILD_TYPE=Release \
      $(if [ "$INTL" = true ]; then echo -DHERMES_ENABLE_INTL=ON; fi) \
      $(if [ "$STATIC" = true ]; then echo -DHERMES_STATIC_LINK=ON; fi) && \
    cmake --build build

ENV JS_BINARY=/src/build/bin/hermes
RUN git describe --tags | sed 's/hermes-//; s/^v//;' >jsz_version  # --version lies
CMD ${JS_BINARY}
