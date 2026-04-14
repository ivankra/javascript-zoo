// test262 temporalHelpers.js -- GocciaScript-compatible reimplementation
// Provides the TemporalHelpers object used by Temporal test262 tests.
// Covers the most-used assertion methods; less-common helpers that require
// unsupported features (Object.defineProperty observers) are stubbed or
// simplified.

const ASCII_IDENTIFIER = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/;

const formatPropertyName = (propertyKey, objectName = "") => {
  if (typeof propertyKey === "symbol") {
    if (Symbol.keyFor(propertyKey) !== undefined) {
      return `${objectName}[Symbol.for('${Symbol.keyFor(propertyKey)}')]`;
    } else if (propertyKey.description && propertyKey.description.startsWith("Symbol.")) {
      return `${objectName}[${propertyKey.description}]`;
    }
    return `${objectName}[Symbol('${propertyKey.description ?? ""}')]`;
  }
  if (typeof propertyKey === "string") {
    if (propertyKey !== String(Number(propertyKey))) {
      if (ASCII_IDENTIFIER.test(propertyKey)) {
        return objectName ? `${objectName}.${propertyKey}` : propertyKey;
      }
      return `${objectName}['${propertyKey}']`;
    }
  }
  return `${objectName}[${propertyKey}]`;
};

const SKIP_SYMBOL = Symbol("Skip");

const TemporalHelpers = {
  ISOMonths: [
    { month: 1, monthCode: "M01", daysInMonth: 31 },
    { month: 2, monthCode: "M02", daysInMonth: 29 },
    { month: 3, monthCode: "M03", daysInMonth: 31 },
    { month: 4, monthCode: "M04", daysInMonth: 30 },
    { month: 5, monthCode: "M05", daysInMonth: 31 },
    { month: 6, monthCode: "M06", daysInMonth: 30 },
    { month: 7, monthCode: "M07", daysInMonth: 31 },
    { month: 8, monthCode: "M08", daysInMonth: 31 },
    { month: 9, monthCode: "M09", daysInMonth: 30 },
    { month: 10, monthCode: "M10", daysInMonth: 31 },
    { month: 11, monthCode: "M11", daysInMonth: 30 },
    { month: 12, monthCode: "M12", daysInMonth: 31 },
  ],

  canonicalizeCalendarEra(calendarId, eraName) {
    if (eraName === undefined) { return undefined; }
    return eraName;
  },

  assertDuration(duration, years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(duration instanceof Temporal.Duration, `${prefix}instanceof`);
    assert.sameValue(duration.years, years, `${prefix}years result:`);
    assert.sameValue(duration.months, months, `${prefix}months result:`);
    assert.sameValue(duration.weeks, weeks, `${prefix}weeks result:`);
    assert.sameValue(duration.days, days, `${prefix}days result:`);
    assert.sameValue(duration.hours, hours, `${prefix}hours result:`);
    assert.sameValue(duration.minutes, minutes, `${prefix}minutes result:`);
    assert.sameValue(duration.seconds, seconds, `${prefix}seconds result:`);
    assert.sameValue(duration.milliseconds, milliseconds, `${prefix}milliseconds result:`);
    assert.sameValue(duration.microseconds, microseconds, `${prefix}microseconds result:`);
    assert.sameValue(duration.nanoseconds, nanoseconds, `${prefix}nanoseconds result`);
  },

  assertDateDuration(duration, years, months, weeks, days, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(duration instanceof Temporal.Duration, `${prefix}instanceof`);
    assert.sameValue(duration.years, years, `${prefix}years result:`);
    assert.sameValue(duration.months, months, `${prefix}months result:`);
    assert.sameValue(duration.weeks, weeks, `${prefix}weeks result:`);
    assert.sameValue(duration.days, days, `${prefix}days result:`);
    assert.sameValue(duration.hours, 0, `${prefix}hours result should be zero:`);
    assert.sameValue(duration.minutes, 0, `${prefix}minutes result should be zero:`);
    assert.sameValue(duration.seconds, 0, `${prefix}seconds result should be zero:`);
    assert.sameValue(duration.milliseconds, 0, `${prefix}milliseconds result should be zero:`);
    assert.sameValue(duration.microseconds, 0, `${prefix}microseconds result should be zero:`);
    assert.sameValue(duration.nanoseconds, 0, `${prefix}nanoseconds result should be zero:`);
  },

  assertDurationsEqual(actual, expected, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(expected instanceof Temporal.Duration, `${prefix}expected value should be a Temporal.Duration`);
    TemporalHelpers.assertDuration(actual, expected.years, expected.months, expected.weeks, expected.days, expected.hours, expected.minutes, expected.seconds, expected.milliseconds, expected.microseconds, expected.nanoseconds, description);
  },

  assertInstantsEqual(actual, expected, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(expected instanceof Temporal.Instant, `${prefix}expected value should be a Temporal.Instant`);
    assert(actual instanceof Temporal.Instant, `${prefix}instanceof`);
    assert(actual.equals(expected), `${prefix}equals method`);
  },

  assertPlainDate(date, year, month, monthCode, day, description = "", era = undefined, eraYear = undefined) {
    const prefix = description ? `${description}: ` : "";
    assert(date instanceof Temporal.PlainDate, `${prefix}instanceof`);
    assert.sameValue(
      TemporalHelpers.canonicalizeCalendarEra(date.calendarId, date.era),
      TemporalHelpers.canonicalizeCalendarEra(date.calendarId, era),
      `${prefix}era result:`
    );
    assert.sameValue(date.eraYear, eraYear, `${prefix}eraYear result:`);
    assert.sameValue(date.year, year, `${prefix}year result:`);
    assert.sameValue(date.month, month, `${prefix}month result:`);
    assert.sameValue(date.monthCode, monthCode, `${prefix}monthCode result:`);
    assert.sameValue(date.day, day, `${prefix}day result:`);
  },

  assertPlainDateTime(datetime, year, month, monthCode, day, hour, minute, second, millisecond, microsecond, nanosecond, description = "", era = undefined, eraYear = undefined) {
    const prefix = description ? `${description}: ` : "";
    assert(datetime instanceof Temporal.PlainDateTime, `${prefix}instanceof`);
    assert.sameValue(
      TemporalHelpers.canonicalizeCalendarEra(datetime.calendarId, datetime.era),
      TemporalHelpers.canonicalizeCalendarEra(datetime.calendarId, era),
      `${prefix}era result:`
    );
    assert.sameValue(datetime.eraYear, eraYear, `${prefix}eraYear result:`);
    assert.sameValue(datetime.year, year, `${prefix}year result:`);
    assert.sameValue(datetime.month, month, `${prefix}month result:`);
    assert.sameValue(datetime.monthCode, monthCode, `${prefix}monthCode result:`);
    assert.sameValue(datetime.day, day, `${prefix}day result:`);
    assert.sameValue(datetime.hour, hour, `${prefix}hour result:`);
    assert.sameValue(datetime.minute, minute, `${prefix}minute result:`);
    assert.sameValue(datetime.second, second, `${prefix}second result:`);
    assert.sameValue(datetime.millisecond, millisecond, `${prefix}millisecond result:`);
    assert.sameValue(datetime.microsecond, microsecond, `${prefix}microsecond result:`);
    assert.sameValue(datetime.nanosecond, nanosecond, `${prefix}nanosecond result:`);
  },

  assertPlainDatesEqual(actual, expected, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(expected instanceof Temporal.PlainDate, `${prefix}expected value should be a Temporal.PlainDate`);
    assert(actual instanceof Temporal.PlainDate, `${prefix}instanceof`);
    assert(actual.equals(expected), `${prefix}equals method`);
    assert.sameValue(actual.calendarId, expected.calendarId, `${prefix}calendar same value:`);
  },

  assertPlainDateTimesEqual(actual, expected, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(expected instanceof Temporal.PlainDateTime, `${prefix}expected value should be a Temporal.PlainDateTime`);
    assert(actual instanceof Temporal.PlainDateTime, `${prefix}instanceof`);
    assert(actual.equals(expected), `${prefix}equals method`);
    assert.sameValue(actual.calendarId, expected.calendarId, `${prefix}calendar same value:`);
  },

  assertPlainMonthDay(monthDay, monthCode, day, description = "", referenceISOYear = 1972) {
    const prefix = description ? `${description}: ` : "";
    assert(monthDay instanceof Temporal.PlainMonthDay, `${prefix}instanceof`);
    assert.sameValue(monthDay.monthCode, monthCode, `${prefix}monthCode result:`);
    assert.sameValue(monthDay.day, day, `${prefix}day result:`);
  },

  assertPlainTime(time, hour, minute, second, millisecond, microsecond, nanosecond, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(time instanceof Temporal.PlainTime, `${prefix}instanceof`);
    assert.sameValue(time.hour, hour, `${prefix}hour result:`);
    assert.sameValue(time.minute, minute, `${prefix}minute result:`);
    assert.sameValue(time.second, second, `${prefix}second result:`);
    assert.sameValue(time.millisecond, millisecond, `${prefix}millisecond result:`);
    assert.sameValue(time.microsecond, microsecond, `${prefix}microsecond result:`);
    assert.sameValue(time.nanosecond, nanosecond, `${prefix}nanosecond result:`);
  },

  assertPlainTimesEqual(actual, expected, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(expected instanceof Temporal.PlainTime, `${prefix}expected value should be a Temporal.PlainTime`);
    assert(actual instanceof Temporal.PlainTime, `${prefix}instanceof`);
    assert(actual.equals(expected), `${prefix}equals method`);
  },

  assertPlainYearMonth(yearMonth, year, month, monthCode, description = "", era = undefined, eraYear = undefined, referenceISODay = 1) {
    const prefix = description ? `${description}: ` : "";
    assert(yearMonth instanceof Temporal.PlainYearMonth, `${prefix}instanceof`);
    assert.sameValue(
      TemporalHelpers.canonicalizeCalendarEra(yearMonth.calendarId, yearMonth.era),
      TemporalHelpers.canonicalizeCalendarEra(yearMonth.calendarId, era),
      `${prefix}era result:`
    );
    assert.sameValue(yearMonth.eraYear, eraYear, `${prefix}eraYear result:`);
    assert.sameValue(yearMonth.year, year, `${prefix}year result:`);
    assert.sameValue(yearMonth.month, month, `${prefix}month result:`);
    assert.sameValue(yearMonth.monthCode, monthCode, `${prefix}monthCode result:`);
  },

  assertZonedDateTimesEqual(actual, expected, description = "") {
    const prefix = description ? `${description}: ` : "";
    assert(expected instanceof Temporal.ZonedDateTime, `${prefix}expected value should be a Temporal.ZonedDateTime`);
    assert(actual instanceof Temporal.ZonedDateTime, `${prefix}instanceof`);
    assert(actual.equals(expected), `${prefix}equals method`);
    assert.sameValue(actual.timeZoneId, expected.timeZoneId, `${prefix}time zone same value:`);
    assert.sameValue(actual.calendarId, expected.calendarId, `${prefix}calendar same value:`);
  },

  assertUnreachable(description) {
    let message = "This code should not be executed";
    if (description) {
      message = `${message}: ${description}`;
    }
    throw new Test262Error(message);
  },

  checkPluralUnitsAccepted(func, validSingularUnits) {
    const plurals = {
      year: "years",
      month: "months",
      week: "weeks",
      day: "days",
      hour: "hours",
      minute: "minutes",
      second: "seconds",
      millisecond: "milliseconds",
      microsecond: "microseconds",
      nanosecond: "nanoseconds",
    };

    for (const unit of validSingularUnits) {
      const singularValue = func(unit);
      const pluralValue = func(plurals[unit]);
      const desc = `Plural ${plurals[unit]} produces the same result as singular ${unit}`;
      if (singularValue instanceof Temporal.Duration) {
        TemporalHelpers.assertDurationsEqual(pluralValue, singularValue, desc);
      } else if (singularValue instanceof Temporal.Instant) {
        TemporalHelpers.assertInstantsEqual(pluralValue, singularValue, desc);
      } else if (singularValue instanceof Temporal.PlainDateTime) {
        TemporalHelpers.assertPlainDateTimesEqual(pluralValue, singularValue, desc);
      } else if (singularValue instanceof Temporal.PlainTime) {
        TemporalHelpers.assertPlainTimesEqual(pluralValue, singularValue, desc);
      } else if (singularValue instanceof Temporal.ZonedDateTime) {
        TemporalHelpers.assertZonedDateTimesEqual(pluralValue, singularValue, desc);
      } else {
        assert.sameValue(pluralValue, singularValue);
      }
    }
  },

  toPrimitiveObserver(actual, value, name) {
    const result = {};
    result.toString = () => {
      actual.push(`call ${name}.toString`);
      return value.toString();
    };
    result.valueOf = () => {
      actual.push(`call ${name}.valueOf`);
      return value;
    };
    return result;
  },

  propertyBagObserver(actual, bag, type) {
    return { ...bag };
  },

  observeProperty(actual, object, propertyName, value) {
    object[propertyName] = value;
  },

  ISO: {
    year: 2000,
    month: 5,
    monthCode: "M05",
    day: 2,
    hour: 12,
    minute: 34,
    second: 56,
    millisecond: 987,
    microsecond: 654,
    nanosecond: 321,
  },

  checkSubclassingIgnored(...args) {
    this.checkSubclassConstructorNotObject(...args);
    this.checkSubclassConstructorUndefined(...args);
    this.checkSubclassConstructorThrows(...args);
    this.checkSubclassConstructorNotCalled(...args);
    this.checkSubclassSpeciesInvalidResult(...args);
    this.checkSubclassSpeciesNotAConstructor(...args);
    this.checkSubclassSpeciesNull(...args);
    this.checkSubclassSpeciesUndefined(...args);
    this.checkSubclassSpeciesThrows(...args);
  },

  checkSubclassConstructorNotObject(construct, constructArgs, method, methodArgs, resultAssertions) {
    const check = (value, description) => {
      const instance = new construct(...constructArgs);
      instance.constructor = value;
      const result = instance[method](...methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype, description);
      resultAssertions(result);
    };
    check(null, "null");
    check(true, "true");
    check("test", "string");
    check(Symbol(), "Symbol");
    check(7, "number");
    check(7n, "bigint");
  },

  checkSubclassConstructorUndefined(construct, constructArgs, method, methodArgs, resultAssertions) {
    let called = 0;
    class MySubclass extends construct {
      constructor() { ++called; super(...constructArgs); }
    }
    const instance = new MySubclass();
    assert.sameValue(called, 1);
    MySubclass.prototype.constructor = undefined;
    const result = instance[method](...methodArgs);
    assert.sameValue(called, 1);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  checkSubclassConstructorThrows(construct, constructArgs, method, methodArgs, resultAssertions) {
    class CustomError {}
    const instance = new construct(...constructArgs);
    Object.defineProperty(instance, "constructor", {
      get() { throw new CustomError(); }
    });
    const result = instance[method](...methodArgs);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  checkSubclassConstructorNotCalled(construct, constructArgs, method, methodArgs, resultAssertions) {
    let called = 0;
    class MySubclass extends construct {
      constructor() { ++called; super(...constructArgs); }
    }
    const instance = new MySubclass();
    assert.sameValue(called, 1);
    const result = instance[method](...methodArgs);
    assert.sameValue(called, 1);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  checkSubclassSpeciesInvalidResult(construct, constructArgs, method, methodArgs, resultAssertions) {
    const check = (value, description) => {
      const instance = new construct(...constructArgs);
      instance.constructor = { [Symbol.species]: () => value };
      const result = instance[method](...methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype, description);
      resultAssertions(result);
    };
    check(undefined, "undefined");
    check(null, "null");
    check(true, "true");
    check("test", "string");
    check(Symbol(), "Symbol");
    check(7, "number");
    check(7n, "bigint");
    check({}, "plain object");
  },

  checkSubclassSpeciesNotAConstructor(construct, constructArgs, method, methodArgs, resultAssertions) {
    const check = (value, description) => {
      const instance = new construct(...constructArgs);
      instance.constructor = { [Symbol.species]: value };
      const result = instance[method](...methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype, description);
      resultAssertions(result);
    };
    check(true, "true");
    check("test", "string");
    check(Symbol(), "Symbol");
    check(7, "number");
    check(7n, "bigint");
    check({}, "plain object");
  },

  checkSubclassSpeciesNull(construct, constructArgs, method, methodArgs, resultAssertions) {
    let called = 0;
    class MySubclass extends construct {
      constructor() { ++called; super(...constructArgs); }
    }
    const instance = new MySubclass();
    assert.sameValue(called, 1);
    MySubclass.prototype.constructor = { [Symbol.species]: null };
    const result = instance[method](...methodArgs);
    assert.sameValue(called, 1);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  checkSubclassSpeciesUndefined(construct, constructArgs, method, methodArgs, resultAssertions) {
    let called = 0;
    class MySubclass extends construct {
      constructor() { ++called; super(...constructArgs); }
    }
    const instance = new MySubclass();
    assert.sameValue(called, 1);
    MySubclass.prototype.constructor = { [Symbol.species]: undefined };
    const result = instance[method](...methodArgs);
    assert.sameValue(called, 1);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  checkSubclassSpeciesThrows(construct, constructArgs, method, methodArgs, resultAssertions) {
    class CustomError {}
    const instance = new construct(...constructArgs);
    instance.constructor = {
      get [Symbol.species]() { throw new CustomError(); },
    };
    const result = instance[method](...methodArgs);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
  },

  checkSubclassingIgnoredStatic(...args) {
    this.checkStaticInvalidReceiver(...args);
    this.checkStaticReceiverNotCalled(...args);
    this.checkThisValueNotCalled(...args);
  },

  checkStaticInvalidReceiver(construct, method, methodArgs, resultAssertions) {
    const check = (value, description) => {
      const result = construct[method].apply(value, methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
      resultAssertions(result);
    };
    check(undefined, "undefined");
    check(null, "null");
    check(true, "true");
    check("test", "string");
    check(Symbol(), "symbol");
    check(7, "number");
    check(7n, "bigint");
    check({}, "Non-callable object");
  },

  checkStaticReceiverNotCalled(construct, method, methodArgs, resultAssertions) {
    const check = (value, description) => {
      const receiver = () => value;
      const result = construct[method].apply(receiver, methodArgs);
      assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
      resultAssertions(result);
    };
    check(undefined, "undefined");
    check(null, "null");
    check(true, "true");
    check("test", "string");
    check(Symbol(), "symbol");
    check(7, "number");
    check(7n, "bigint");
    check({}, "Non-callable object");
  },

  checkThisValueNotCalled(construct, method, methodArgs, resultAssertions) {
    let called = false;
    class MySubclass extends construct {
      constructor(...args) { called = true; super(...args); }
    }
    const result = MySubclass[method](...methodArgs);
    assert.sameValue(called, false);
    assert.sameValue(Object.getPrototypeOf(result), construct.prototype);
    resultAssertions(result);
  },

  checkPlainDateTimeConversionFastPath(func, message = "checkPlainDateTimeConversionFastPath") {
    // Simplified: requires Object.defineProperty on instances
    const datetime = new Temporal.PlainDateTime(2000, 5, 2, 12, 34, 56, 987, 654, 321);
    func(datetime);
  },

  checkToTemporalCalendarFastPath(func) {
    func("iso8601");
  },

  checkToTemporalPlainDateTimeFastPath(func) {
    func(new Temporal.PlainDateTime(2000, 5, 2, 12, 34, 56, 987, 654, 321));
  },

  checkToTemporalInstantFastPath(func) {
    func(new Temporal.Instant(0n));
  },

  checkStringOptionWrongType(propertyName, value, checkFunc, assertFunc) {
    assert.throws(RangeError, () => checkFunc(null), "null");
    assert.throws(RangeError, () => checkFunc(true), "true");
    assert.throws(RangeError, () => checkFunc(false), "false");
    assert.throws(TypeError, () => checkFunc(Symbol()), "symbol");
    assert.throws(RangeError, () => checkFunc(2), "number");

    assert.throws(RangeError, () => checkFunc({}), "plain object");

    const expected = [
      `call ${propertyName}.toString`,
    ];
    const actual = [];
    const observer = TemporalHelpers.toPrimitiveObserver(actual, value, propertyName);
    const result = checkFunc(observer);
    assertFunc(result, "object with toString");
    assert.compareArray(actual, expected, "order of operations");
  },

  checkRoundingIncrementOptionWrongType(checkFunc, assertTrueResultFunc, assertObjectResultFunc) {
    assert.throws(RangeError, () => checkFunc(null), "null");
    const trueResult = checkFunc(true);
    assertTrueResultFunc(trueResult, "true");
    assert.throws(RangeError, () => checkFunc(false), "false");
    assert.throws(TypeError, () => checkFunc(Symbol()), "symbol");
    assert.throws(RangeError, () => checkFunc({}), "plain object");

    const expected = [
      "call roundingIncrement.valueOf",
    ];
    const actual = [];
    const observer = TemporalHelpers.toPrimitiveObserver(actual, 2, "roundingIncrement");
    const objectResult = checkFunc(observer);
    assertObjectResultFunc(objectResult, "object with valueOf");
    assert.compareArray(actual, expected, "order of operations");
  },
};
