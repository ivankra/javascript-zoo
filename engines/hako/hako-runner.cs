// REPL and script runner for Hako using their C# library and wasmtime runtime.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

using HakoJS;
using HakoJS.Backend.Wasmtime;
using HakoJS.Extensions;
using HakoJS.VM;

internal static class Program {
  private static int Main(string[] args) {
    using var runtime = Hako.Initialize<WasmtimeEngine>();
    using var realm = runtime.CreateRealm().WithGlobals(g => g.WithConsole());

    try {
      if (args.Length > 0) {
        foreach (var path in args) {
          if (!RunFile(realm, path)) {
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

  private static bool RunFile(Realm realm, string path) {
    try {
      var source = File.ReadAllText(path);
      using var result = realm.EvalCode(source, new RealmEvalOptions {
        FileName = path,
      });
      if (result.TryGetFailure(out var error)) {
        using var failed = error;
        Console.Error.WriteLine(FormatJsValue(failed));
        return false;
      }
      return true;
    } catch (Exception ex) {
      Console.Error.WriteLine(ex.Message);
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
          Console.Error.WriteLine(FormatJsValue(failed));
          continue;
        }

        using var value = result.Unwrap();
        if (!value.IsUndefined()) {
          Console.WriteLine(value.AsString());
        }
      } catch (Exception ex) {
        Console.Error.WriteLine(ex.Message);
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
}
