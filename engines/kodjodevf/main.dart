// Simple script runner + REPL for kodjodevf/js_interpreter.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

import 'dart:convert';
import 'dart:io';

import 'package:js_interpreter/js_interpreter.dart';

int main(List<String> args) {
  final interpreter = JSInterpreter();
  if (args.isEmpty) {
    while (true) {
      stdout.write('> ');
      final line = stdin.readLineSync(encoding: utf8);
      if (line == null) {
        break;
      }
      if (line.trim().isEmpty) {
        continue;
      }
      try {
        final result = interpreter.eval(line);
        if (!result.isUndefined) {
          stdout.writeln(result.toString());
        }
      } catch (e) {
        stderr.writeln('Uncaught $e');
      }
    }
    return 0;
  }

  for (final path in args) {
    try {
      final code = File(path).readAsStringSync();
      final result = interpreter.eval(code);
      if (!result.isUndefined) {
        stdout.writeln(result.toString());
      }
    } catch (e) {
      stderr.writeln('$path: $e');
      return 1;
    }
  }
  return 0;
}
