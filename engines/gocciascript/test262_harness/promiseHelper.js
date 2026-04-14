// test262 promiseHelper.js -- GocciaScript-compatible reimplementation

const checkSequence = (arr, message) => {
  for (const [i, e] of arr.entries()) {
    if (e !== (i + 1)) {
      throw new Test262Error(
        (message ? message : "Steps in unexpected sequence:") +
        " '" + arr.join(",") + "'"
      );
    }
  }
  return true;
};

const checkSettledPromises = (settleds, expected, message) => {
  const prefix = message ? `${message}: ` : "";
  assert(Array.isArray(settleds), `${prefix}Settled values is an array`);
  assert.sameValue(settleds.length, expected.length, `${prefix}Different length than expected`);

  for (const [i, settled] of settleds.entries()) {
    assert.sameValue(settled.status, expected[i].status, `${prefix}status for item ${i}`);
    if (settled.status === "fulfilled") {
      assert.sameValue(settled.value, expected[i].value, `${prefix}value for item ${i}`);
    } else {
      assert.sameValue(settled.status, "rejected", `${prefix}Valid statuses are fulfilled or rejected`);
      assert.sameValue(settled.reason, expected[i].reason, `${prefix}Reason value for item ${i}`);
    }
  }
};
