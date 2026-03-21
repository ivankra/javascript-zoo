if (typeof Array.prototype.indexOf === "undefined") {
  Array.prototype.indexOf = function(x, i) {
    for (i = i || 0; i < this.length; i++) if (this[i] === x) return i;
    return -1;
  };
}
if (typeof Array.prototype.map === "undefined") {
  Array.prototype.map = function(f, t) {
    for (var i = 0, res = []; i < this.length; i++)
      if (i in this) res[i] = f.call(t, this[i], i, this);
    return res;
  };
}
if (typeof Object.create === "undefined") {
  Object.create = function(p) { function F() {}; F.prototype = p; return new F(); };
}
if (typeof Object.defineProperty === "undefined") {
  Object.defineProperty = function(obj, prop, desc) {
    if (desc.hasOwnProperty('value')) {
      obj[prop] = desc.value;
    } else if (desc.hasOwnProperty('get')) {
      obj[prop] = desc.get.call(obj);
    }
    return obj;
  };
}
