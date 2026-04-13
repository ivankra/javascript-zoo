# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc14
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/espruino/Espruino.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

RUN if [ "$(dpkg --print-architecture)" = i386 ]; then \
      sed -i "/USE_CALLFUNCTION_HACK/s/^# *//" boards/LINUX.py; \
    fi

RUN make -j RELEASE=1

COPY build/dist.py ./
RUN ./dist.py /dist/espruino \
      --binary=/src/bin/espruino \
      version="$(/src/bin/espruino -e 'print(process.version)' | tail -2 | head -1 | tr -d '\r')"
