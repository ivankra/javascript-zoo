// CLI runner for Asynkron.JsEngine with test262 $262 harness support.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Asynkron.JsEngine;
using Asynkron.JsEngine.JsTypes;
using Asynkron.JsEngine.Parser;
using Asynkron.JsEngine.Runtime;
using Asynkron.JsEngine.Tests.Test262;

internal static class Program {
  private static async Task<int> Main(string[] args) {
    if (!ParseArguments(args, out var moduleMode, out var paths)) {
      Console.Error.WriteLine("Usage: asynkron [--module|-m] [file ...]");
      return 1;
    }

    var engine = new JsEngine();
    engine.EvaluateSync("var print = console.log.bind(console);");
    Install262(engine);

    if (paths.Count == 0)
      return await RunRepl(engine);

    foreach (var path in paths) {
      try {
        var source = File.ReadAllText(path);
        if (moduleMode || path.EndsWith(".mjs", StringComparison.OrdinalIgnoreCase)) {
          await engine.EvaluateModule(source, Path.GetFullPath(path));
        } else {
          await engine.Evaluate(source);
        }
      } catch (ThrowSignal ts) {
        Console.Error.Write("Uncaught exception: ");
        PrintJsError(ts);
        return 1;
      } catch (ParseException pe) {
        Console.Error.Write("Uncaught exception: SyntaxError");
        if (!string.IsNullOrEmpty(pe.Message))
          Console.Error.Write(": " + pe.Message);
        Console.Error.WriteLine();
        return 1;
      } catch (Exception ex) {
        Console.Error.WriteLine(ex.Message);
        return 1;
      }
    }

    return 0;
  }

  private static bool ParseArguments(string[] args, out bool moduleMode, out List<string> paths) {
    moduleMode = false;
    paths = new List<string>();

    foreach (var arg in args) {
      if (arg == "--module" || arg == "-m") {
        moduleMode = true;
      } else if (arg == "--help" || arg == "-h") {
        return false;
      } else {
        paths.Add(arg);
      }
    }

    return true;
  }

  private static async Task<int> RunRepl(JsEngine engine) {
    string line;
    while (true) {
      Console.Write("> ");
      line = Console.ReadLine();
      if (line == null) break;
      if (line == "") continue;
      try {
        var result = await engine.Evaluate(line);
        if (result != null) {
          var s = result.ToString();
          if (s != "undefined") Console.WriteLine(s);
        }
      } catch (ThrowSignal ts) {
        PrintJsError(ts);
      } catch (ParseException pe) {
        Console.Error.Write("SyntaxError");
        if (!string.IsNullOrEmpty(pe.Message))
          Console.Error.Write(": " + pe.Message);
        Console.Error.WriteLine();
      } catch (Exception ex) {
        Console.Error.WriteLine(ex.Message);
      }
    }
    return 0;
  }

  private static void PrintJsError(ThrowSignal ts) {
    var thrown = ts.ThrownValue;
    if (thrown.TryGetObject<JsObject>(out var obj)) {
      string name = null;
      string message = null;
      if (obj.TryGetProperty("name", out var nameVal) && !nameVal.IsUndefined && !nameVal.IsNull)
        name = nameVal.ToObject()?.ToString();
      if (name == null &&
          obj.TryGetProperty("constructor", out var ctorVal) && !ctorVal.IsUndefined && !ctorVal.IsNull &&
          ctorVal.TryGetObject<IJsPropertyAccessor>(out var ctorObj) &&
          ctorObj.TryGetProperty("name", out var ctorName) && !ctorName.IsUndefined && !ctorName.IsNull)
        name = ctorName.ToObject()?.ToString();
      name ??= "Error";
      if (obj.TryGetProperty("message", out var msgVal) && !msgVal.IsUndefined && !msgVal.IsNull)
        message = msgVal.ToObject()?.ToString();
      Console.Error.Write(name);
      if (!string.IsNullOrEmpty(message))
        Console.Error.Write(": " + message);
      Console.Error.WriteLine();
    } else {
      Console.Error.WriteLine(thrown.ToObject()?.ToString() ?? "undefined");
    }
  }

  internal static void Install262(JsEngine engine) {
    var agentRuntime = new Test262AgentRuntime(
      () => new JsEngine(),
      new Dictionary<string, string>());

    var obj262 = new JsObject {
      ["evalScript"] = new HostFunction(args => {
        if (args.Count == 0) return JsValue.Undefined;
        if (args.Count > 1) throw new InvalidOperationException("only script parsing supported");
        if (args[0].ToObject() is not string script) return JsValue.Undefined;
        return JsValue.FromObjectUnsafe(engine.EvaluateSync(script));
      }),

      ["createRealm"] = new HostFunction(_ => {
        var realmEngine = new JsEngine();
        var realmGlobal = realmEngine.GlobalObject;
        realmGlobal["global"] = realmGlobal;
        return (JsValue)realmGlobal;
      }),

      ["detachArrayBuffer"] = new HostFunction(args => {
        if (args.Count > 0) {
          if (args[0].TryGetObject<TypedArrayBase>(out var view))
            view.Buffer.Detach();
          else if (args[0].TryGetObject<JsArrayBuffer>(out var buffer))
            buffer.Detach();
          else if (args[0].TryGetObject<IJsPropertyAccessor>(out var accessor) &&
                   accessor.TryGetProperty("buffer", out var inner) &&
                   inner.TryGetObject<JsArrayBuffer>(out var innerBuffer))
            innerBuffer.Detach();
        }
        return JsValue.Undefined;
      }),

      ["createResizableArrayBuffer"] = new HostFunction(args => {
        var length = args.Count > 0 && args[0].TryGetDouble(out var d) ? (int)d : 0;
        var max = args.Count > 1 && args[1].TryGetDouble(out var d2) ? (int)d2 : length;
        return JsValue.FromObjectUnsafe(new JsArrayBuffer(length, max));
      }),

      ["gc"] = new HostFunction(_ => {
        GC.Collect();
        GC.WaitForPendingFinalizers();
        return JsValue.Null;
      }),

      ["global"] = engine.GlobalObject,
      ["IsHTMLDDA"] = new HtmlDdaValue(),
      ["AbstractModuleSource"] = Test262AbstractModuleSource.CreateAbstractModuleSource(engine),
      ["agent"] = agentRuntime.CreateMainAgentObject(),
    };

    engine.SetGlobalValue("$262", obj262);
  }
}
