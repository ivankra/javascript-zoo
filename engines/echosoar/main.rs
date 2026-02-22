// Basic script runner + REPL for echosoar/jsi.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

use jsi::JSI;
use jsi::value::Value;
use std::env;
use std::fs;
use std::io::{self, Write};
use std::process;

fn run(jsi: &mut JSI, name: &str, code: String, exit_on_error: bool) {
    match jsi.run(code) {
        Ok(result) if !matches!(result, Value::Undefined) => println!("{:?}", result),
        Ok(_) => {}
        Err(err) => {
            eprintln!("{}: {:?}", name, err);
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
