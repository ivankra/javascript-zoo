// Script.cpp only implements a line-by-line REPL with 2k buffer.
// This snippet adds a proper file script runner with unlimited buffer.
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
