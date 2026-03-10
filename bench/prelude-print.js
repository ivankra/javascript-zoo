if (typeof print == "undefined" && typeof console != "undefined") {
  if (typeof globalThis == "object") globalThis.print = console.log;
  else if (typeof this == "object") this.print = console.log;
  if (typeof print == "undefined") print = console.log;
}
if (typeof console == "undefined") {
  if (typeof globalThis == "object") globalThis.console = new Object();
  else if (typeof this == "object") this.console = new Object();
  if (typeof console == "undefined") console = new Object();
}
if (typeof console.log == "undefined" && typeof print != "undefined") {
  console.log = print;
}
