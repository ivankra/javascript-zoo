# JDK-based build environment with common Java build tools.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG VER=25

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        openjdk-$VER-jdk-headless \
        ant \
        ant-optional \
        maven && \
    ln -s /usr/lib/jvm/java-$VER-openjdk-$(dpkg --print-architecture) /usr/lib/jvm/java-$VER-openjdk && \
    # Record installed JDK version in metadata \
    java -version 2>&1 | head -1 >/jsz_jdk

ENV JAVA_HOME=/usr/lib/jvm/java-${VER}-openjdk
