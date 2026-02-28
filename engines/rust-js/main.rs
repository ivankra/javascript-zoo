extern crate rjs;

use rjs::rt::JsEnv;
use std::io::{self, Write};
use std::env;
use std::process;

fn err(env: &mut JsEnv, e: &rjs::JsError) -> String {
    let _s = env.new_local_scope();
    match e.as_runtime(env).as_value(env).to_string(env) {
        Ok(s) => s.to_string(),
        Err(_) => format!("{:?}", e),
    }
}

fn main() {
    let mut env = match JsEnv::new() {
        Ok(v) => v,
        Err(e) => {
            let _ = writeln!(&mut io::stderr(), "startup: {:?}", e);
            process::exit(1);
        }
    };

    let files: Vec<String> = env::args().skip(1).collect();
    if !files.is_empty() {
        for f in files {
            if let Err(e) = env.run(&f) {
                let _ = writeln!(&mut io::stderr(), "{}: {}", f, err(&mut env, &e));
                process::exit(1);
            }
        }
        return;
    }

    let stdin = io::stdin();
    let mut line = String::new();
    loop {
        print!("rjs> ");
        if io::stdout().flush().is_err() {
            break;
        }
        line.clear();
        match stdin.read_line(&mut line) {
            Ok(0) => break,
            Ok(_) => {}
            Err(e) => {
                let _ = writeln!(&mut io::stderr(), "stdin: {}", e);
                break;
            }
        }
        let js = line.trim_right_matches('\n').trim_right_matches('\r');
        if js.trim().is_empty() {
            continue;
        }
        if let Err(e) = env.eval(js) {
            let _ = writeln!(&mut io::stderr(), "{}", err(&mut env, &e));
        }
    }
}
