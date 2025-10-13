// Basic main() for the project to run test scripts.
use jsi::JSI;
use std::env;
use std::fs;
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        eprintln!("Usage: {} <script>", args[0]);
        process::exit(1);
    }

    let script_path = &args[1];

    let code = fs::read_to_string(script_path).unwrap_or_else(|err| {
        eprintln!("Error reading file '{}': {}", script_path, err);
        process::exit(1);
    });

    let mut jsi = JSI::new();

    match jsi.run_with_bytecode(code) {
        Ok(result) => {
            println!("{:?}", result);
        }
        Err(err) => {
            eprintln!("Runtime error: {:?}", err);
            process::exit(1);
        }
    }
}
