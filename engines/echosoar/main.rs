// Basic script runner + REPL for echosoar/jsi.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

use jsi::JSI;
use jsi::error::{JSIError, JSIErrorType};
use jsi::value::Value;
use std::env;
use std::fs;
use std::io::{self, Write};
use std::process;
use std::rc::Weak;

fn format_error_value(value: &Value) -> Option<(String, String)> {
    match value {
        Value::Object(obj) | Value::Function(obj) | Value::Array(obj) | Value::Promise(obj) => {
            let obj = obj.borrow();
            let message = match obj.get_property_value("message".to_string()) {
                Value::String(message) => message,
                _ => String::new(),
            };
            let error_type = obj
                .constructor
                .as_ref()
                .and_then(Weak::upgrade)
                .map(|ctor| ctor.borrow().get_property_value("name".to_string()))
                .and_then(|name| match name {
                    Value::String(name) if !name.is_empty() => Some(name),
                    _ => None,
                })
                .unwrap_or_else(|| "Error".to_string());
            Some((error_type, message))
        }
        _ => None,
    }
}

fn format_uncaught_exception(err: &JSIError) -> String {
    let thrown = err.value.as_ref().and_then(format_error_value);
    let error_type = match err.error_type {
        JSIErrorType::Unknown => thrown
            .as_ref()
            .map(|(error_type, _)| error_type.clone())
            .unwrap_or_else(|| "Error".to_string()),
        _ => err.error_type.to_string(),
    };
    let message = if !err.message.is_empty() {
        err.message.clone()
    } else {
        thrown.map(|(_, message)| message).unwrap_or_default()
    };

    format!("{}: {}", error_type, message)
}

fn run(jsi: &mut JSI, _name: &str, code: String, exit_on_error: bool) {
    match jsi.run(code) {
        Ok(result) if !matches!(result, Value::Undefined) => println!("{:?}", result),
        Ok(_) => {}
        Err(err) => {
            eprintln!("Uncaught exception: {}", format_uncaught_exception(&err));
            if exit_on_error {
                process::exit(1);
            }
        }
    }
}

fn repl(jsi: &mut JSI) {
    let stdin = io::stdin();
    let mut line = String::new();

    loop {
        print!("> ");
        if io::stdout().flush().is_err() {
            break;
        }

        line.clear();
        match stdin.read_line(&mut line) {
            Ok(0) => break,
            Ok(_) => {}
            Err(err) => {
                eprintln!("Error reading input: {}", err);
                break;
            }
        }

        let input = line.trim_end_matches(['\n', '\r']);
        if input.trim().is_empty() {
            continue;
        }

        run(jsi, "<stdin>", input.to_string(), false);
    }
}

fn main() {
    let mut jsi = JSI::new();
    let mut args = env::args();
    let _prog = args.next();

    let files: Vec<String> = args.collect();
    if files.is_empty() {
        repl(&mut jsi);
        return;
    }

    for path in files {
        let code = fs::read_to_string(&path).unwrap_or_else(|err| {
            eprintln!("Error reading file '{}': {}", path, err);
            process::exit(1);
        });
        run(&mut jsi, &path, code, true);
    }
}
