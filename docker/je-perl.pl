#!/usr/bin/env perl
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

use lib '/dist/je-perl-dist/lib/perl5';
use JE;

my $j = JE->new;

$j->new_function('print' => sub { print @_, "\n"; });
($j->{console} ||= {})->{log} = sub { print @_, "\n"; };
$j->new_function('readline' => sub {
  print("> ");
  my $line = <STDIN>;
  return $j->null unless defined $line;
  chomp $line;
  return $line;
});

my $repl = <<'EOF';
for (;;) {
  var __line = readline();
  if (__line == null) break;
  try {
    var __res = eval(__line);
    if (typeof __res != "undefined") {
      print("" + __res);
    }
  } catch (__err) {
    print("" + __err);
  }
}
EOF

$j->eval($repl)  unless (@ARGV);

for my $file (@ARGV) {
  open my $fh, '<', $file or die "Cannot open '$file': $!";
  my $code = do { local $/; <$fh> };
  close $fh;
  eval { $j->eval($code) };
  warn $@ if $@;
}
