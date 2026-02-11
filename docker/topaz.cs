// Basic REPL and script runner for Topaz.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

using System;
using System.IO;
using Tenray.Topaz;

internal static class Program {
  private static int Main(string[] args) {
    var engine = new TopazEngine();
    engine.AddType(typeof(Console), "Console");
    engine.ExecuteScript(@"
      function print(...args) {
        var out = '';
        for (var i = 0; i < args.length; i++) {
          if (i > 0) out += ' ';
          out += args[i];
        }
        Console.WriteLine(out);
      }
      var console = { log: print };
    ");

    if (args.Length > 0) {
      foreach (var path in args) {
        if (!RunFile(engine, path)) {
          return 1;
        }
      }
      return 0;
    }

    RunRepl(engine);
    return 0;
  }

  private static bool RunFile(TopazEngine engine, string path) {
    try {
      var source = File.ReadAllText(path);
      engine.ExecuteScript(source);
      return true;
    } catch (Exception ex) {
      Console.Error.WriteLine(ex.Message);
      return false;
    }
  }

  private static void RunRepl(TopazEngine engine) {
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
        var value = engine.ExecuteExpression(line);
        if (value != null && value != Undefined.Value) {
          Console.WriteLine(value);
        }
      }
      catch (Exception exprError) {
        try {
          engine.ExecuteScript(line);
        } catch (Exception) {
          Console.Error.WriteLine(exprError.Message);
        }
      }
    }
  }
}
