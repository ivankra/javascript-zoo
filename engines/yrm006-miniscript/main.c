// Basic REPL and script runner for yrm006/miniscript.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include "miniscript.config.h"
#include "miniscript.h"

#define SIZE_STACK  256
#define SIZE_SCOPE  256
#define SIZE_POOL   256
#define SIZE_POOLA  256

typedef struct {
    Stack base;
    Var vars[SIZE_STACK];
} MyStack;

typedef struct {
    Scope base;
    VarMap nvars[SIZE_SCOPE];
} MyScope;

typedef struct {
    Pool base;
    ObjectForPool objs[SIZE_POOL];
} MyPool;

typedef struct {
    ArrayPool base;
    ArrayForPool arrs[SIZE_POOLA];
} MyArrayPool;

Var Stack_OVERFLOW;

static void gf_print(Thread* p) {
    Var v = *Stack_pop(p->s);
    Var__(Stack_pop(p->s));
    Var__(Stack_pop(p->s));

    Var* pv = (v.vt == VT_Refer) ? v.ref : &v;

    if (pv->vt == VT_Number) {
        printf("%d\n", pv->num);
    } else if (pv->vt == VT_CodeString) {
        const char* b = pv->code;
        const char* p = b + 1;
        while (*p != *b) {
            printf("%c", *(p++));
        }
        printf("\n");
    } else {
        printf("VT: %d\n", pv->vt);
    }

    Var__(&v);
    Stack_push(p->s);
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

int main(int argc, char** argv) {
    MyPool pool;
    Pool_global(Pool_(&pool.base, SIZE_POOL));

    MyArrayPool poola;
    ArrayPool_global(ArrayPool_(&poola.base, SIZE_POOLA));

    MyStack stack;
    Stack_(&stack.base, SIZE_STACK);

    MyScope scope;
    Scope_(&scope.base, SIZE_SCOPE);

    Thread thread;
    Thread_(&thread, "", &stack.base, &scope.base);

    Var* pv;
    pv = Scope_add(thread.o, "print", 5, Stack_push(thread.s));
    pv->vt = VT_Function;
    pv->func = gf_print;

    pv = Scope_add(thread.o, "Array", 5, Stack_push(thread.s));
    pv->vt = VT_Function;
    pv->func = mslib_Array;

    Stack_ground(thread.s);

    int ret = 0;

    if (argc > 1) {
        for (int i = 1; i < argc; i++) {
            char* code = read_file(argv[i]);

            if (!code) {
                fprintf(stderr, "Error: Cannot read file '%s'\n", argv[i]);
                ret = 1;
                goto cleanup;
            }

            thread.c = code;
            Error* e = Thread_run(&thread);
            free(code);

            if (e) {
                char a[0x100];
                size_t len = e->len < sizeof(a) - 1 ? e->len : sizeof(a) - 1;
                strncpy(a, e->code, len);
                a[len] = '\0';
                fprintf(stderr, "Error: %s('%s')\n", e->reason, a);
                ret = 1;
                goto cleanup;
            }
        }
    } else {
        static char line[4096];

        while (1) {
            printf("> ");
            fflush(stdout);

            if (!fgets(line, sizeof(line), stdin)) {
                printf("\n");
                break;
            }

            size_t len = strlen(line);
            if (len > 0 && line[len - 1] == '\n') {
                line[len - 1] = '\0';
            }

            if (strlen(line) == 0) {
                continue;
            }

            thread.c = line;
            Error* e = Thread_run(&thread);

            if (e) {
                char a[0x100];
                size_t len = e->len < sizeof(a) - 1 ? e->len : sizeof(a) - 1;
                strncpy(a, e->code, len);
                a[len] = '\0';
                printf("Error: %s('%s')\n", e->reason, a);
            }
        }
    }

cleanup:
    Thread__(&thread);
    Scope__(&scope.base);
    Stack__(&stack.base);
    ArrayPool__(&poola.base);
    Pool__(&pool.base);

    return ret;
}
