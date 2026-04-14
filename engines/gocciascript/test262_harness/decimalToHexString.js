// test262 decimalToHexString.js -- GocciaScript-compatible reimplementation

const decimalToHexString = (n) => {
  const hex = "0123456789ABCDEF";
  n = n >>> 0;
  let s = "";
  let val = n;
  if (val === 0) { return "0000"; }
  const digits = [];
  let remaining = val;
  for (const _ of [0, 0, 0, 0, 0, 0, 0, 0]) {
    if (remaining === 0) { break; }
    digits.unshift(hex[remaining & 0xf]);
    remaining = remaining >>> 4;
  }
  s = digits.join("");
  const pad = "0000";
  return (pad + s).slice(-Math.max(4, s.length));
};

const decimalToPercentHexString = (n) => {
  const hex = "0123456789ABCDEF";
  return "%" + hex[(n >> 4) & 0xf] + hex[n & 0xf];
};
