# JScript .NET

Old Microsoft's JavaScript engine for .NET Framework 1.0-4.x from early 2000s / ES4 era.

* Homepage:         http://msdn.microsoft.com/en-us/library/x85xxsf4.aspx
* Language:         C#
* License:          Proprietary
* Org:              Microsoft
* Standard:         ES4 (ES3 + some ES4 draft features)
* Years:            2000-2010
* Runtime platform: .NET
* JIT:              via CLR
* DLL:              Microsoft.JScript.dll

## Versions

Completely different product from [JScript](jscript.md) and [JScript9](jscript9.md)/Chakra,
but using the same name. .NET suffix was dropped at some point.

Version numbers follow Microsoft's finest traditions:

  * JScript 5.x -> IE3-8's [JScript](jscript.md) engine
  * JScript 7.0 – JScript .NET 2002 – .NET Framework 1.0
  * JScript 7.0 – JScript .NET 2003 – .NET Framework 1.1
  * JScript 8.0 – Visual Studio 2005 – .NET Framework 2.0
  * JScript 8.0 – Visual Studio 2008 – .NET Framework 3.5
  * JScript 9 -> IE9-11's [JScript9](jscript9.md)/Chakra engine
  * JScript 10.0 – Visual Studio 2010/2012 – .NET Framework 4.0 (2010)

Dropped from .NET Core / .NET 5+.

## Features

Compiles JavaScript to CIL bytecode.

Implements a very distinct JavaScript dialect for .NET platform, featuring types
and various non-standard features from .NET and Microsoft's shot at ES4.

```javascript
var gameboard : char[,];
gameboard = new char[3,3];

class CCustomer extends CPerson{
   function CCustomer(name : String, creditLimit : double){
      super(name);
      this.creditLimit = creditLimit;
   };
   private var creditLimit : double;
   function get CreditLimit() : double{
      return creditLimit;
   }
}
```

## Links

  * [Introducing JScript .NET (2000)](http://msdn.microsoft.com/ms974588.aspx)
  * [JScript Reference](http://msdn.microsoft.com/en-us/library/x85xxsf4.aspx)
  * Related old projects:
    * https://www.mono-project.com/archived/jscript/
    * https://cgit.git.savannah.gnu.org/cgit/dotgnu-pnet/pnetlib.git/tree/JScript
