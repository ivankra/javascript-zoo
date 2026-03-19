#!/bin/sh
# Generate Test262AbstractModuleSource.cs with CreateAbstractModuleSource
# method extracted from upstream Test262Test.cs.
set -e

{
  cat <<EOF
#nullable disable
using Asynkron.JsEngine;
using Asynkron.JsEngine.Ast;
using Asynkron.JsEngine.JsTypes;
using Asynkron.JsEngine.Runtime;

namespace Asynkron.JsEngine.Tests.Test262;

internal static class Test262AbstractModuleSource {
EOF

  sed -n \
    '/^ *private static HostFunction CreateAbstractModuleSource/,/^ *return constructor;/{
      s/private static/internal static/; p
    }; /^ *return constructor;/{n;p}' \
    tests/Asynkron.JsEngine.Tests.Test262/Test262Test.cs

  echo '}'
} > Test262AbstractModuleSource.cs
