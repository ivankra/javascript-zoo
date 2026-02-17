// Basic REPL and script runner for cesanta/elk.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "elk.h"

static jsval_t js_print(struct js *js, jsval_t *args, int nargs) {
  for (int i = 0; i < nargs; i++) {
    const char *space = i == 0 ? "" : " ";
    printf("%s%s", space, js_str(js, args[i]));
  }
  putchar('\n');
  return js_mkundef();
}

static char *read_file(const char *path) {
  FILE *fp = fopen(path, "rb");
  if (!fp) return NULL;

  size_t size = 0, cap = 4096, num;
  char *buf = (char *)malloc(cap);
  if (!buf) {
    fclose(fp);
    return NULL;
  }

  while ((num = fread(buf + size, 1, cap - 1 - size, fp)) > 0) {
    if ((size += num) >= cap - 1) {
      char *newbuf = (char *)realloc(buf, cap *= 2);
      if (!newbuf) {
        free(buf);
        fclose(fp);
        return NULL;
      }
      buf = newbuf;
    }
  }
  fclose(fp);
  buf[size] = 0;

  return buf;
}

static void repl(struct js *js) {
  static char line[4096];

  while (1) {
    printf("> ");
    fflush(stdout);

    if (!fgets(line, sizeof(line), stdin)) break;

    size_t len = strlen(line);
    if (len > 0 && line[len - 1] == '\n') {
      line[len - 1] = '\0';
    }

    if (strlen(line) == 0) continue;

    jsval_t res = js_eval(js, line, ~0U);
    const char *result = js_str(js, res);
    if (js_type(res) == JS_ERR) {
      fprintf(stderr, "Error: %s\n", result);
    } else if (strcmp(result, "undefined") != 0) {
      printf("%s\n", result);
    }
  }

  printf("\n");
}

int main(int argc, char *argv[]) {
  static char mem[65536];
  struct js *js = js_create(mem, sizeof(mem));

  js_set(js, js_glob(js), "print", js_mkfun(js_print));

  jsval_t console = js_mkobj(js);
  js_set(js, console, "log", js_mkfun(js_print));
  js_set(js, js_glob(js), "console", console);

  if (argc > 1) {
    for (int i = 1; i < argc; i++) {
      char *code = read_file(argv[i]);

      if (!code) {
        fprintf(stderr, "Error: Cannot read file '%s'\n", argv[i]);
        return EXIT_FAILURE;
      }

      jsval_t res = js_eval(js, code, ~0U);
      free(code);

      if (js_type(res) == JS_ERR) {
        fprintf(stderr, "Error: %s\n", js_str(js, res));
        return EXIT_FAILURE;
      }
    }
  } else {
    repl(js);
  }

  return 0;
}
