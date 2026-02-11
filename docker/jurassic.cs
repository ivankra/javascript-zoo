// Basic REPL and script runner for Jurassic.
//
// Extends jurassic/REPL/Program.cs with the ability to run script files.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

using System;
using Jurassic;
using Jurassic.Library;

internal static class Program {
  private static int Main(string[] args) {
    var engine = new ScriptEngine();
    engine.SetGlobalValue("console", new FirebugConsole(engine));
    // console.log() built-in is sensitive to the value of this
    engine.Execute("function print() { return console.log.apply(console, arguments); }");

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

  private static bool RunFile(ScriptEngine engine, string path) {
    try {
      engine.ExecuteFile(path);
      return true;
    } catch (Exception ex) {
      PrintError(engine, ex);
      return false;
    }
  }

  private static void RunRepl(ScriptEngine engine) {
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
        var value = engine.Evaluate(line);
        if (value != Undefined.Value) {
          Console.WriteLine(FormatValue(engine, value));
        }
      } catch (Exception ex) {
        PrintError(engine, ex);
      }
    }
  }

  private static string FormatValue(ScriptEngine engine, object value) {
    if (value is ObjectInstance) {
      try {
        var json = JSONObject.Stringify(engine, value);
        if (json != Undefined.Value && json != null) {
          return json.ToString();
        }
      } catch {
      }
    }
    return value?.ToString() ?? "null";
  }

  private static void PrintError(ScriptEngine engine, Exception ex) {
    if (ex is JavaScriptException jse) {
      var obj = jse.GetErrorObject(engine);
      if (obj is ErrorInstance err && !string.IsNullOrEmpty(err.Stack)) {
        Console.Error.WriteLine(err.Stack);
        return;
      }
    }
    Console.Error.WriteLine(ex.Message);
  }
}
