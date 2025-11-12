# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

RUN apt-get update && apt-get install -y --no-install-recommends cpanminus

RUN cpanm -l /dist/je-perl-dist JE

RUN cd /dist/je-perl-dist/lib/perl5 && \
    chmod u+w JE.pm JE/Code.pm JE/LValue.pm JE/Object/Date.pm JE/Object/Error.pm JE/Object/Math.pm JE/Object/Number.pm JE/Object/RegExp.pm JE/Object/String.pm && \
    sed -i "s/JE'Code'Statement'/JE::Code::Statement::/g; s/JE'Code'/JE::Code::/g; s/JE'LValue/JE::LValue/g; s/JE'Number/JE::Number/g; s/JE'Object'Error'/JE::Object::Error::/g; s/JE'Object'RegExp'/JE::Object::RegExp::/g; s/JE'Object'/JE::Object::/g; s/JE'Object/JE::Object/g; s/JE'String/JE::String/g; s/JE'_/JE::_/g; s/JE'Destroyer/JE::Destroyer/g; s/JE::Destroyer'/JE::Destroyer::/g; s/splice @'_/splice @::_/g" JE.pm JE/Code.pm JE/LValue.pm JE/Object.pm JE/Object/Date.pm JE/Object/Error.pm JE/Object/Math.pm JE/Object/Number.pm JE/Object/RegExp.pm JE/Object/String.pm

COPY je-perl.pl /dist/je-perl

WORKDIR /src

ENV JS_BINARY=/dist/je-perl
RUN du -bc /dist/je-perl-dist | tail -1 | cut -f 1 >jsz_dist_size && \
    echo 0.066 >jsz_version
CMD ${JS_BINARY}
