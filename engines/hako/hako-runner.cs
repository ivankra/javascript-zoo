// REPL and script runner for Hako using their C# library and wasmtime runtime.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

using HakoJS;
using HakoJS.Backend.Wasmtime;
using HakoJS.Extensions;
using HakoJS.VM;
using System.Text.RegularExpressions;

internal static class Program {
  private static readonly Regex JsErrorPrefix = new(@"^(?:[A-Za-z][A-Za-z0-9]*Error:|Error$)", RegexOptions.Compiled);

  private static int Main(string[] args) {
    using var runtime = Hako.Initialize<WasmtimeEngine>();
    using var realm = runtime.CreateRealm().WithGlobals(g => g.WithConsole());

    var moduleMode = false;
    var files = new System.Collections.Generic.List<string>();
    foreach (var arg in args) {
      if (arg == "--module") {
        moduleMode = true;
      } else {
        files.Add(arg);
      }
    }

    if (moduleMode && files.Count == 0) {
      Console.Error.WriteLine("--module requires at least one script path");
      return 1;
    }

    try {
      if (files.Count > 0) {
        foreach (var path in files) {
          if (!RunFile(realm, path, moduleMode)) {
            return 1;
          }
        }
      } else {
        RunRepl(realm);
      }
    } finally {
      Hako.ShutdownAsync().GetAwaiter().GetResult();
    }

    return 0;
  }

  private static bool RunFile(Realm realm, string path, bool moduleMode) {
    try {
      var source = File.ReadAllText(path);
      using var result = realm.EvalCode(source, new RealmEvalOptions {
        FileName = path,
        Type = moduleMode ? EvalType.Module : EvalType.Global,
      });
      if (result.TryGetFailure(out var error)) {
        using var failed = error;
        Console.Error.WriteLine(FormatExceptionMessage(FormatJsValue(failed)));
        return false;
      }
      return true;
    } catch (Exception ex) {
      Console.Error.WriteLine(FormatExceptionMessage(ex.Message));
      return false;
    }
  }

  private static void RunRepl(Realm realm) {
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
        using var result = realm.EvalCode(line);
        if (result.TryGetFailure(out var error)) {
          using var failed = error;
          Console.Error.WriteLine(FormatExceptionMessage(FormatJsValue(failed)));
          continue;
        }

        using var value = result.Unwrap();
        if (!value.IsUndefined()) {
          Console.WriteLine(value.AsString());
        }
      } catch (Exception ex) {
        Console.Error.WriteLine(FormatExceptionMessage(ex.Message));
      }
    }
  }

  private static string FormatJsValue(JSValue value) {
    try {
      var s = value.AsString();
      if (!string.IsNullOrEmpty(s)) {
        return s;
      }
    } catch {}
    return value.ToString() ?? "(error)";
  }

  private static string FormatExceptionMessage(string message) {
    if (string.IsNullOrWhiteSpace(message)) {
      return "Uncaught exception: Error";
    }

    return LooksLikeJsException(message)
      ? $"Uncaught exception: {message}"
      : message;
  }

  private static bool LooksLikeJsException(string message) {
    return JsErrorPrefix.IsMatch(message);
  }
}
