#cfg(target="native")
extern "C" fn c_exit(code : Int) -> Unit = "exit"

fn report_error(err : Error) -> Unit {
  match err {
    @runtime.JsException(value) => {
      match value {
        Object(data) if data.class_name.has_suffix("Error") => {
          let name : String = match data.bag.properties.get("name") {
            Some(String_(s)) => s
            _ => data.class_name
          }
          let msg : String = match data.bag.properties.get("message") {
            Some(String_(s)) => s
            _ => ""
          }
          println("\{name}: \{msg}")
        }
        Object(data) if data.bag.properties.contains("message") => {
          let ctor_name : String? = match data.prototype {
            Object(proto_data) =>
              match proto_data.bag.properties.get("constructor") {
                Some(Object(ctor_data)) =>
                  match ctor_data.callable {
                    Some(UserFunc(fd)) => fd.name
                    Some(UserFuncExt(fd)) => fd.name
                    _ => None
                  }
                _ => None
              }
            _ => None
          }
          match ctor_name {
            Some(name) if name.has_suffix("Error") => {
              let msg : String = match data.bag.properties.get("message") {
                Some(String_(s)) => s
                _ => ""
              }
              println("\{name}: \{msg}")
            }
            _ => println("\{value}")
          }
        }
        _ => println("\{value}")
      }
    }
    @errors.TypeError(message~) => println("TypeError: \{message}")
    @errors.ReferenceError(message~) => println("ReferenceError: \{message}")
    @errors.SyntaxError(message~) => println("SyntaxError: \{message}")
    @errors.RangeError(message~) => println("RangeError: \{message}")
    @errors.URIError(message~) => println("URIError: \{message}")
    @errors.EvalError(message~) => println("EvalError: \{message}")
    @errors.InternalError(message~) => println("InternalError: \{message}")
    Failure::Failure(msg) => println("Error: \{msg}")
    e => println("Error: \{e}")
  }
}

fn run_module_file(entry_path : String) -> Unit raise Error {
  let module_stack : Ref[Array[String]] = { val: [entry_path] }
  let module_cache : Ref[Map[String, Map[String, @runtime.Value]]] = { val: {} }
  let interp_ref : Ref[@interpreter.Interpreter?] = { val: None }

  let loader : @runtime.ModuleLoader? = Some(@runtime.ModuleLoader((specifier) => {
    let current_path = module_stack.val[module_stack.val.length() - 1]
    let current_dir = @path.Path(current_path).dirname().to_string()
    let resolved = @path.Path(current_dir)
      .join(@path.Path(specifier))
      .resolve()
      .to_string()
    match module_cache.val.get(resolved) {
      Some(exports) => exports
      None => {
        let source = @fs.read_file_to_string(resolved)
        let prog = @parser.parse(source)
        let interp = match interp_ref.val {
          Some(i) => i
          None => abort("interpreter not initialized")
        }
        module_stack.val.push(resolved)
        try {
          let exports = interp.run_module(prog.stmts)
          module_cache.val[resolved] = exports
          let _ = module_stack.val.pop()
          exports
        } catch {
          e => {
            let _ = module_stack.val.pop()
            raise e
          }
        }
      }
    }
  }))

  let interp = @interpreter.new_interpreter(annex_b=true, module_loader=loader)
  interp_ref.val = Some(interp)
  let source = @fs.read_file_to_string(entry_path)
  let prog = @parser.parse(source)
  module_cache.val[entry_path] = interp.run_module(prog.stmts)
  interp.run_microtasks()
  interp.run_timers()
}

fn main {
  let args = @env.args()
  let prog_name = if args.length() > 0 { args[0] } else { "dowdiness" }
  let mut is_module = false
  let mut show_help = false
  let mut path : String? = None
  for arg in args[1:] {
    if arg == "--help" || arg == "-h" {
      show_help = true
    } else if arg == "--module" {
      is_module = true
    } else if path is None {
      path = Some(arg)
    } else {
      show_help = true
    }
  }
  if show_help {
    path = None
  }
  let script_path = match path {
    None => {
      println("Usage: \{prog_name} [--module] script")
      c_exit(1)
      ""
    }
    Some(script_path) => script_path
  }
  try {
    if is_module || script_path.has_suffix(".mjs") {
      run_module_file(script_path)
    } else {
      let source = @fs.read_file_to_string(script_path)
      let _ = @lib.run(source, annex_b=true)
    }
  } catch {
    e => {
      report_error(e)
      c_exit(1)
    }
  }
}
