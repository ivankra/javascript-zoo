# mingw-w64 based cross-compilation build environment targetting x86/x64 Windows.
#
# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
      g++-multilib \
      g++-mingw-w64-i686 \
      g++-mingw-w64-x86-64 \
      cabextract \
      p7zip-full

# Wine not required for build, but install anyway for testing convenience
RUN if grep -q /sbin/vminitd /proc/cmdline; then \
      # macOS containerization kernel disables CONFIG_IA32_EMULATION, wine32 won't work \
      apt-get install -y --no-install-recommends wine wine64 libwine; \
    else \
      dpkg --add-architecture i386 && \
      apt-get update -y && \
      apt-get install -y --no-install-recommends wine wine32 wine64 libwine libwine:i386; \
    fi

# Set up ~/.wine, enable Null graphics driver
RUN wineboot --init && \
    wine reg add 'HKEY_CURRENT_USER\Software\Wine\Drivers' /v Graphics /t REG_SZ /d null /f && \
    wineserver --wait
