#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "quickjs.h"

static char *read_file(const char *filename, size_t *size) {
  FILE *f = fopen(filename, "rb");
  if (!f) {
    perror("Cannot open file");
    return NULL;
  }

  fseek(f, 0, SEEK_END);
  long fsize = ftell(f);
  fseek(f, 0, SEEK_SET);

  char *buf = malloc(fsize + 1);
  if (!buf) {
    fclose(f);
    return NULL;
  }

  fread(buf, 1, fsize, f);
  buf[fsize] = 0;
  fclose(f);

  if (size) {
    *size = fsize;
  }

  return buf;
}

static JSValue js_print(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
  int i;
  const char *str;

  for (i = 0; i < argc; i++) {
    str = JS_ToCString(ctx, argv[i]);
    if (str) {
      printf("%s%s", i == 0 ? "" : " ", str);
      JS_FreeCString(ctx, str);
    }
  }

  putchar('\n');

  return JS_UNDEFINED;
}

static void add_js_print(JSContext *ctx) {
  JSValue global = JS_GetGlobalObject(ctx);
  JSValue console = JS_NewObject(ctx);
  JS_SetPropertyStr(ctx, console, "log", JS_NewCFunction(ctx, js_print, "log", 1));
  JS_SetPropertyStr(ctx, global, "console", console);
  JS_SetPropertyStr(ctx, global, "print", JS_NewCFunction(ctx, js_print, "print", 1));
  JS_FreeValue(ctx, global);
}

int main(int argc, char **argv) {
  JSRuntime *rt;
  JSContext *ctx;
  int ret = 0;

  rt = JS_NewRuntime();
  if (!rt) {
    fprintf(stderr, "JS_NewRuntime() failed\n");
    return 1;
  }

  ctx = JS_NewContext(rt);
  if (!ctx) {
    fprintf(stderr, "JS_NewContext() failed\n");
    JS_FreeRuntime(rt);
    return 1;
  }

  add_js_print(ctx);

  if (argc >= 2) {
    for (int i = 1; i < argc; i++) {
      size_t len;
      char *script = read_file(argv[i], &len);
      if (!script) {
        fprintf(stderr, "Cannot read script file: %s\n", argv[i]);
        ret = 1;
        break;
      }

      JSValue val = JS_Eval(ctx, script, len, argv[i], JS_EVAL_TYPE_GLOBAL);

      if (JS_IsException(val)) {
        JSValue exception = JS_GetException(ctx);
        const char *str = JS_ToCString(ctx, exception);
        fprintf(stderr, "Exception in %s: %s\n", argv[i], str);
        JS_FreeCString(ctx, str);
        JS_FreeValue(ctx, exception);
        ret = 1;
        JS_FreeValue(ctx, val);
        free(script);
        break;
      }

      JS_FreeValue(ctx, val);
      free(script);
    }
  } else {
    /* REPL */
    char *line = NULL;
    size_t len = 0;
    ssize_t nread;

    while (1) {
      printf("> ");
      fflush(stdout);

      nread = getline(&line, &len, stdin);
      if (nread == -1) {
        printf("\n");
        break;
      }

      JSValue val = JS_Eval(ctx, line, nread, "<stdin>", JS_EVAL_TYPE_GLOBAL);

      if (JS_IsException(val)) {
        JSValue exception = JS_GetException(ctx);
        const char *str = JS_ToCString(ctx, exception);
        fprintf(stderr, "Exception: %s\n", str);
        JS_FreeCString(ctx, str);
        JS_FreeValue(ctx, exception);
      } else if (!JS_IsUndefined(val)) {
        const char *str = JS_ToCString(ctx, val);
        if (str) {
          printf("%s\n", str);
          JS_FreeCString(ctx, str);
        }
      }

      JS_FreeValue(ctx, val);
    }

    free(line);
  }

  JS_FreeContext(ctx);
  JS_FreeRuntime(rt);

  return ret;
}
