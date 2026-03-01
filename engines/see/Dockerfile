# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends autoconf automake libtool libltdl-dev perl subversion

ARG REPO=https://github.com/ivankra/SEE.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/see/see.patch /tmp/see.patch
RUN git apply /tmp/see.patch

ENV CC="gcc -std=gnu89"
RUN ./bootstrap.sh
RUN perl -0pi -e 's/^([ \t]*if[ \t].*[^;]) then :$/$1; then :/mg; s/\\\\\n([ \t]*)then :/\\\\\n$1; then :/g; s/\n([ \t]*)if\n([ \t]*)then :\n/\n$1if true\n$2then :\n/g' configure
RUN ac_cv_prog_cc_c11=no ac_cv_prog_cc_c99=no ac_cv_cc__longjmp_works=yes ac_cv_cc_longjmp_works=yes ./configure --disable-shared --enable-static
RUN make && make -C shell see-shell.static

COPY build/dist.py ./
RUN ./dist.py /dist/see --binary=/src/shell/see-shell.static version=3.1.1424
