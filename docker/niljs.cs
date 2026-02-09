// Basic REPL and script runner for NiL.JS.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

using System;
using System.IO;
using NiL.JS.Core;

internal static class Program {
  private static int Main(string[] args) {
    var context = new Context();

    // NiL.JS's console.log() is receiver-sensitive.
    context.Eval("function print() { return console.log.apply(console, arguments); }", true);

    if (args.Length > 0) {
      foreach (var path in args) {
        if (!RunFile(context, path)) {
          return 1;
        }
      }
    } else {
      RunRepl(context);
    }

    return 0;
  }

  private static bool RunFile(Context context, string path) {
    try {
      var source = File.ReadAllText(path);
      context.Eval(source, true);
      return true;
    } catch (Exception ex) {
      Console.Error.WriteLine(ex);
      return false;
    }
  }

  private static void RunRepl(Context context) {
    while (true) {
      Console.Write("> ");
      var line = Console.ReadLine();
      if (line == null) {
        Console.WriteLine();
        return;
      }

      if (line.Length == 0) {
        continue;
      }

      try {
        var result = context.Eval(line, true);
        if (result != null && result.ValueType > JSValueType.Undefined) {
          Console.WriteLine(result);
        }
      } catch (Exception ex) {
        Console.Error.WriteLine(ex);
      }
    }
  }
}
