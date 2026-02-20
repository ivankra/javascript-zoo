# mingw-w64 based coss-compilation build environment targetting x86/x64 Windows.
# Wine is installed as well for testing, but not strictly required for build.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN dpkg --add-architecture i386 && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends \
      cabextract \
      g++-mingw-w64-i686 \
      g++-mingw-w64-x86-64 \
      g++-multilib \
      p7zip-full \
      wine \
      wine32 \
      wine64

RUN if [ `uname -m` = x86_64 ]; then \
      wineboot --init && \
      # Enable Null graphics driver (better alternative to xvfb-run) \
      wine reg add 'HKEY_CURRENT_USER\Software\Wine\Drivers' /v Graphics /t REG_SZ /d null /f && \
      wineserver --wait; \
    fi
