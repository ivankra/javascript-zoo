ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/gfwilliams/tiny-js.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

# Script.cpp only implements a line-by-line REPL with 2k buffer.
# Add a proper file script runner with unlimited buffer.
RUN cat >snippet.cc <<EOF
if (argc >= 2) {
  FILE *fp = fopen(argv[1], "rb");
  size_t size = 0, cap = 4096, num;
  char *buf = (char *)malloc(cap);
  while ((num = fread(buf + size, 1, cap - 1 - size, fp)) > 0) {
    if ((size += num) >= cap - 1) {
      buf = (char *)realloc(buf, cap *= 2);
    }
  }
  fclose(fp);
  buf[size] = 0;
  js->execute(buf);
  exit(0);
}
EOF

# Add file script runner, stop REPL on EOF, raise loop iter limit, optimized build
RUN sed -i -e '/^  try {/r snippet.cc' Script.cpp && \
    sed -i -e 's/fgets (\(.*\));/if (!fgets(\1)) break;/' Script.cpp && \
    sed -i -e 's/\(TINYJS_LOOP_MAX_ITERATIONS\) = 8192;/\1 = 1000000000;/' TinyJS.h && \
    sed -i -e 's/CFLAGS=-c .*/CFLAGS=-c -O3/' Makefile && \
    make

ENV JS_BINARY=/src/Script
CMD ${JS_BINARY}
