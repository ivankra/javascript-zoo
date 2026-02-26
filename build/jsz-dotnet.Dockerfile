# .NET SDK-based build environment.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

# libicu is required for dotnet
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends libicu-dev

ENV DOTNET_ROOT=/opt/dotnet \
    DOTNET_CLI_TELEMETRY_OPTOUT=1 \
    DOTNET_NOLOGO=1 \
    NUGET_XMLDOC_MODE=skip \
    PATH=/opt/dotnet:$PATH

# Install Microsoft .NET SDK with the official install script.
RUN curl -fsSL https://dot.net/v1/dotnet-install.sh -o /tmp/dotnet-install.sh && \
    bash /tmp/dotnet-install.sh --channel LTS --quality ga --install-dir /opt/dotnet && \
    rm -f /tmp/dotnet-install.sh && \
    mkdir -p /dist && \
    dotnet --version >/jsz_dotnet
