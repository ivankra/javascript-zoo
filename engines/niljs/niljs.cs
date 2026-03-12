// Basic REPL and script runner for NiL.JS.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

using System;
using System.IO;
using NiL.JS;
using NiL.JS.Core;

internal static class Program {
  private static int Main(string[] args) {
    if (!TryParseArguments(args, out var moduleMode, out var paths, out var error)) {
      Console.Error.WriteLine(error);
      return 1;
    }

    if (paths.Length > 0) {
      if (moduleMode) {
        var globalContext = new GlobalContext();
        foreach (var path in paths) {
          if (!RunModuleFile(globalContext, path)) {
            return 1;
          }
        }
      } else {
        var context = new Context();
        InitializePrint(context);
        foreach (var path in paths) {
          if (!RunScriptFile(context, path)) {
            return 1;
          }
        }
      }
    } else {
      if (moduleMode) {
        Console.Error.WriteLine("The --module flag requires at least one file path.");
        return 1;
      }

      var context = new Context();
      InitializePrint(context);
      RunRepl(context);
    }

    return 0;
  }

  private static bool TryParseArguments(string[] args, out bool moduleMode, out string[] paths, out string error) {
    moduleMode = false;
    error = null;
    var parsedPaths = new System.Collections.Generic.List<string>();
    var parseFlags = true;

    foreach (var arg in args) {
      if (parseFlags && arg == "--") {
        parseFlags = false;
        continue;
      }

      if (parseFlags && arg == "--module") {
        moduleMode = true;
        continue;
      }

      if (parseFlags && arg.StartsWith("--", StringComparison.Ordinal)) {
        paths = Array.Empty<string>();
        error = $"Unknown option: {arg}";
        return false;
      }

      parsedPaths.Add(arg);
    }

    paths = parsedPaths.ToArray();
    return true;
  }

  private static bool RunScriptFile(Context context, string path) {
    try {
      var source = File.ReadAllText(path);
      context.Eval(source, true);
      return true;
    } catch (Exception ex) {
      PrintException(ex);
      return false;
    }
  }

  private static bool RunModuleFile(GlobalContext globalContext, string path) {
    try {
      var fullPath = Path.GetFullPath(path);
      var module = new Module(fullPath, File.ReadAllText(fullPath), globalContext);
      module.ModuleResolversChain.Add(new FileModuleResolver(globalContext));
      InitializePrint(module.Context);
      module.Run();
      return true;
    } catch (Exception ex) {
      PrintException(ex);
      return false;
    }
  }

  private static void InitializePrint(Context context) {
    // NiL.JS's console.log() is receiver-sensitive.
    context.Eval("function print() { return console.log.apply(console, arguments); }", true);
  }

  private static void PrintException(Exception ex) {
    var message = ex.Message;
    if (string.IsNullOrEmpty(message)) {
      message = ex.GetType().Name;
    } else if (ex is not JSException) {
      message = ex.GetType().Name + ": " + message;
    }

    Console.Error.WriteLine("Uncaught exception: " + message);
  }

  private sealed class FileModuleResolver : CachedModuleResolverBase {
    private readonly GlobalContext _globalContext;

    public FileModuleResolver(GlobalContext globalContext) {
      _globalContext = globalContext;
    }

    public override bool TryGetModule(ModuleRequest moduleRequest, out Module result) {
      if (!File.Exists(moduleRequest.AbsolutePath)) {
        result = null;
        return false;
      }

      result = new Module(moduleRequest.AbsolutePath, File.ReadAllText(moduleRequest.AbsolutePath), _globalContext);
      InitializePrint(result.Context);
      return true;
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
        PrintException(ex);
      }
    }
  }
}
