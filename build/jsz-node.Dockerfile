# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ENV PATH=/opt/node/bin:$PATH

# Install latest node and npm via official installer (https://nodejs.org/en/download)
# Fallback to debian packages on unsupported archs
RUN dpkg --print-architecture; uname -m; case "$(dpkg --print-architecture)" in \
      amd64|x86_64|aarch64|arm64|ppc64le|s390x) \
        export NVM_DIR=/opt/nvm && mkdir -p "$NVM_DIR" && \
        curl -o /opt/nvm-install.sh https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh && \
        echo "2d8359a64a3cb07c02389ad88ceecd43f2fa469c06104f92f98df5b6f315275f  /opt/nvm-install.sh" | sha256sum -c && \
        bash /opt/nvm-install.sh && rm -f /opt/nvm-install.sh && \
        bash -c 'source /opt/nvm/nvm.sh && nvm install node' && \
        ln -s /opt/nvm/versions/node/*/ /opt/node;; \
      *) \
        apt-get install -y nodejs npm;; \
    esac
