// test262 regExpUtils -- GocciaScript-compatible reimplementation
// Collection of functions used to assert the correctness of RegExp objects.
//
// Uses only GocciaScript-compatible syntax:
//   - const/let (no var)
//   - arrow functions (no function keyword)
//   - === / !== (no == / !=)
//   - for...of / array methods (no traditional loops)
//   - semicolons required

const REGEXP_UTILS_CHUNK_SIZE = 10000;

const buildString = (args) => {
  const loneCodePoints = args.loneCodePoints;
  const ranges = args.ranges;
  let result = String.fromCodePoint(...loneCodePoints);
  for (const range of ranges) {
    const start = range[0];
    const end = range[1];
    const totalLength = end - start + 1;
    const chunkCount = Math.ceil(totalLength / REGEXP_UTILS_CHUNK_SIZE);
    Array.from({ length: chunkCount }).forEach((_, chunkIndex) => {
      const chunkStart = start + chunkIndex * REGEXP_UTILS_CHUNK_SIZE;
      const chunkEnd = Math.min(chunkStart + REGEXP_UTILS_CHUNK_SIZE - 1, end);
      const chunkLength = chunkEnd - chunkStart + 1;
      const codePoints = Array.from({ length: chunkLength }, (_, i) => chunkStart + i);
      result += String.fromCodePoint(...codePoints);
    });
  }
  return result;
};

const printCodePoint = (codePoint) => {
  const hex = codePoint
    .toString(16)
    .toUpperCase()
    .padStart(6, "0");
  return `U+${hex}`;
};

const printStringCodePoints = (string) => {
  const buf = [];
  for (const symbol of string) {
    const formatted = printCodePoint(symbol.codePointAt(0));
    buf.push(formatted);
  }
  return buf.join(" ");
};

const testPropertyEscapes = (regExp, string, expression) => {
  if (!regExp.test(string)) {
    for (const symbol of string) {
      const formatted = printCodePoint(symbol.codePointAt(0));
      assert(
        regExp.test(symbol),
        `\`${expression}\` should match ${formatted} (\`${symbol}\`)`
      );
    }
  }
};

const testPropertyOfStrings = (args) => {
  const regExp = args.regExp;
  const expression = args.expression;
  const matchStrings = args.matchStrings;
  const nonMatchStrings = args.nonMatchStrings;
  const allStrings = matchStrings.join("");
  if (!regExp.test(allStrings)) {
    for (const string of matchStrings) {
      assert(
        regExp.test(string),
        `\`${expression}\` should match ${string} (${printStringCodePoints(string)})`
      );
    }
  }

  if (!nonMatchStrings) return;

  const allNonMatchStrings = nonMatchStrings.join("");
  if (regExp.test(allNonMatchStrings)) {
    for (const string of nonMatchStrings) {
      assert(
        !regExp.test(string),
        `\`${expression}\` should not match ${string} (${printStringCodePoints(string)})`
      );
    }
  }
};

// The exact same logic can be used to test extended character classes
// as enabled through the RegExp `v` flag.
const testExtendedCharacterClass = testPropertyOfStrings;

// Returns a function that validates a RegExp match result.
const matchValidator = (expectedEntries, expectedIndex, expectedInput) => {
  return (match) => {
    assert.compareArray(match, expectedEntries, "Match entries");
    assert.sameValue(match.index, expectedIndex, "Match index");
    assert.sameValue(match.input, expectedInput, "Match input");
  };
};
