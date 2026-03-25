// Minimal script runner + REPL for lightshell-dev/r8e.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>

#include "r8e_api.h"

void *r8e_arr_new(R8EContext *ctx, uint32_t capacity) {
    R8EValue arr = r8e_make_array(ctx, capacity);
    return r8e_is_object(arr) ? r8e_get_pointer(arr) : NULL;
}

uint32_t r8e_arr_length(R8EContext *ctx, void *arr) {
    int32_t len = r8e_get_length(ctx, r8e_from_pointer(arr));
    return len > 0 ? (uint32_t)len : 0;
}

R8EValue r8e_arr_get(R8EContext *ctx, void *arr, uint32_t index) {
    return r8e_get_element(ctx, r8e_from_pointer(arr), index);
}

void r8e_arr_set(R8EContext *ctx, void *arr, uint32_t index, R8EValue value) {
    r8e_set_element(ctx, r8e_from_pointer(arr), index, value);
}

void r8e_arr_push(R8EContext *ctx, void *arr, R8EValue value) {
    uint32_t len = r8e_arr_length(ctx, arr);
    r8e_arr_set(ctx, arr, len, value);
}

R8EValue r8e_construct_function(R8EContext *ctx, R8EValue func, int argc,
                                const R8EValue *argv, R8EValue new_target) {
    (void)new_target;
    return r8e_call(ctx, func, R8E_UNDEFINED, argc, argv);
}

static void *xmalloc(size_t size) {
    void *ptr = malloc(size);
    if (!ptr) {
        fprintf(stderr, "r8e: out of memory\n");
        exit(1);
    }
    return ptr;
}

static char *xstrdup(const char *s) {
    size_t len = strlen(s) + 1;
    char *copy = xmalloc(len);
    memcpy(copy, s, len);
    return copy;
}

static int ends_with(const char *s, const char *suffix) {
    size_t slen = strlen(s);
    size_t tlen = strlen(suffix);
    return slen >= tlen && strcmp(s + slen - tlen, suffix) == 0;
}

static char *path_dirname(const char *path) {
    const char *slash = strrchr(path, '/');
    if (!slash) {
        return xstrdup(".");
    }
    if (slash == path) {
        return xstrdup("/");
    }
    size_t len = (size_t)(slash - path);
    char *dir = xmalloc(len + 1);
    memcpy(dir, path, len);
    dir[len] = '\0';
    return dir;
}

static char *join_paths(const char *base, const char *tail) {
    size_t base_len = strlen(base);
    size_t tail_len = strlen(tail);
    int needs_sep = base_len > 0 && base[base_len - 1] != '/';
    char *out = xmalloc(base_len + (size_t)needs_sep + tail_len + 1);
    memcpy(out, base, base_len);
    if (needs_sep) {
        out[base_len++] = '/';
    }
    memcpy(out + base_len, tail, tail_len + 1);
    return out;
}

static char *resolve_module_path(const char *specifier, const char *referrer) {
    if (!specifier || !specifier[0]) {
        return NULL;
    }
    if (specifier[0] == '/') {
        return xstrdup(specifier);
    }
    if (!referrer || specifier[0] != '.') {
        return xstrdup(specifier);
    }

    char *dir = path_dirname(referrer);
    char *resolved = join_paths(dir, specifier);
    free(dir);
    return resolved;
}

static char *read_file(const char *path, size_t *out_len) {
    FILE *f = fopen(path, "rb");
    char *buf;
    long size;
    size_t nread;

    if (!f) {
        return NULL;
    }
    if (fseek(f, 0, SEEK_END) != 0) {
        fclose(f);
        return NULL;
    }
    size = ftell(f);
    if (size < 0) {
        fclose(f);
        return NULL;
    }
    if (fseek(f, 0, SEEK_SET) != 0) {
        fclose(f);
        return NULL;
    }

    buf = xmalloc((size_t)size + 1);
    nread = fread(buf, 1, (size_t)size, f);
    fclose(f);
    if (nread != (size_t)size) {
        free(buf);
        return NULL;
    }

    buf[nread] = '\0';
    if (out_len) {
        *out_len = nread;
    }
    return buf;
}

static const char *value_cstring(R8EContext *ctx, R8EValue value, char *buf,
                                 size_t *len, R8EValue *holder) {
    R8EValue str = r8e_to_string(ctx, value);
    *holder = str;
    return r8e_get_cstring(str, buf, len);
}

static void print_js_value(FILE *stream, R8EContext *ctx, R8EValue value) {
    char inline_buf[8];
    size_t len = 0;
    R8EValue holder = R8E_UNDEFINED;
    const char *text = value_cstring(ctx, value, inline_buf, &len, &holder);
    if (text && len > 0) {
        fwrite(text, 1, len, stream);
    }
    r8e_value_release(ctx, holder);
}

static R8EValue native_print(R8EContext *ctx, R8EValue this_val, int argc,
                             const R8EValue *argv) {
    int i;
    (void)this_val;

    for (i = 0; i < argc; i++) {
        if (i > 0) {
            fputc(' ', stdout);
        }
        print_js_value(stdout, ctx, argv[i]);
    }
    fputc('\n', stdout);
    fflush(stdout);
    return R8E_UNDEFINED;
}

static void ensure_print_globals(R8EContext *ctx) {
    R8EValue console;
    R8EValue log_fn;

    r8e_set_global_func(ctx, "print", native_print, -1);

    console = r8e_get_global(ctx, "console");
    if (!r8e_is_object(console)) {
        console = r8e_make_object(ctx);
        r8e_set_global(ctx, "console", console);
    }

    log_fn = r8e_get_prop(ctx, console, "log");
    if (!r8e_is_function(log_fn)) {
        R8EValue fn = r8e_make_native_func(ctx, native_print, "log", -1);
        r8e_set_prop(ctx, console, "log", fn);
        r8e_value_release(ctx, fn);
    }
}

static void format_uncaught_exception(R8EContext *ctx, R8EValue exc,
                                      FILE *stream) {
    R8EValue name = R8E_UNDEFINED;
    R8EValue message = R8E_UNDEFINED;
    char name_buf[8];
    char msg_buf[8];
    size_t name_len = 0;
    size_t msg_len = 0;
    const char *name_text = NULL;
    const char *msg_text = NULL;

    if (r8e_is_object(exc)) {
        name = r8e_get_prop(ctx, exc, "name");
        message = r8e_get_prop(ctx, exc, "message");
    }

    if (!r8e_is_string(name)) {
        r8e_value_release(ctx, name);
        name = r8e_to_string(ctx, exc);
    }
    if (r8e_is_string(message)) {
        msg_text = r8e_get_cstring(message, msg_buf, &msg_len);
    }

    name_text = r8e_get_cstring(name, name_buf, &name_len);
    fprintf(stream, "Uncaught exception: ");
    if (name_text && name_len > 0) {
        fwrite(name_text, 1, name_len, stream);
    } else {
        fputs("Error", stream);
    }
    if (msg_text && msg_len > 0) {
        if (!(name_len == msg_len && name_text &&
              memcmp(name_text, msg_text, name_len) == 0)) {
            fprintf(stream, ": ");
            fwrite(msg_text, 1, msg_len, stream);
        }
    }
    fputc('\n', stream);

    r8e_value_release(ctx, name);
    r8e_value_release(ctx, message);
}

static R8EStatus module_loader(R8EContext *ctx, const char *specifier,
                               const char *referrer, char **out_source,
                               size_t *out_len) {
    char *path = resolve_module_path(specifier, referrer);
    char *source;

    if (!path) {
        return R8E_ERROR;
    }
    source = read_file(path, out_len);
    free(path);
    if (!source) {
        return R8E_ERROR;
    }

    *out_source = source;
    (void)ctx;
    return R8E_OK;
}

static int run_source(R8EContext *ctx, const char *name, const char *source,
                      size_t len, int is_module, int print_result) {
    R8EValue result;

    if (is_module) {
        result = r8e_eval_module(ctx, source, len, name);
    } else {
        result = r8e_eval_file(ctx, source, len, name);
    }

    if (r8e_has_exception(ctx)) {
        format_uncaught_exception(ctx, r8e_get_exception(ctx), stderr);
        r8e_clear_exception(ctx);
        return 1;
    }

    if (print_result && !r8e_is_undefined(result)) {
        print_js_value(stdout, ctx, result);
        fputc('\n', stdout);
    }
    return 0;
}

static int run_file(R8EContext *ctx, const char *path) {
    size_t len = 0;
    char *source = read_file(path, &len);
    int rc;

    if (!source) {
        fprintf(stderr, "r8e: failed to read '%s': %s\n", path, strerror(errno));
        return 1;
    }

    rc = run_source(ctx, path, source, len, ends_with(path, ".mjs"), 0);
    free(source);
    return rc;
}

static int repl(R8EContext *ctx) {
    char *line = NULL;
    size_t cap = 0;
    ssize_t nread;

    for (;;) {
        fputs("> ", stdout);
        fflush(stdout);

        nread = getline(&line, &cap, stdin);
        if (nread < 0) {
            break;
        }
        while (nread > 0 &&
               (line[nread - 1] == '\n' || line[nread - 1] == '\r')) {
            line[--nread] = '\0';
        }
        if (nread == 0) {
            continue;
        }
        run_source(ctx, "<stdin>", line, (size_t)nread, 0, 1);
    }

    free(line);
    return 0;
}

int main(int argc, char **argv) {
    R8EContext *ctx = r8e_context_new();
    int i;

    if (!ctx) {
        fprintf(stderr, "r8e: failed to create context\n");
        return 1;
    }

    ensure_print_globals(ctx);
    r8e_set_module_loader(ctx, module_loader);

    if (argc <= 1) {
        i = repl(ctx);
        r8e_context_free(ctx);
        return i;
    }

    for (i = 1; i < argc; i++) {
        if (run_file(ctx, argv[i]) != 0) {
            r8e_context_free(ctx);
            return 1;
        }
    }

    r8e_context_free(ctx);
    return 0;
}
