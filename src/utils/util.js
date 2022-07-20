/** @lodash.merge example
 * var object = { 'a': [{ 'b': 2 }, { 'd': 4 }] };
 *
 * var other = { 'a': [{ 'c': 3 }, { 'e': 5 }]  };
 *
 * merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
function merge(object, source) {
  return Object.keys(source).reduce((obj, key) => {
    const srcValue = source[key];
    if (typeof srcValue === "object") {
      obj[key] = merge(obj[key] || {}, srcValue);
    } else if (Array.isArray(srcValue)) {
      //typeof Array loop
      obj[key] = srcValue.map((item, idx) => {
        if (typeof item === "object")
          return merge((item[key] || [])[idx] || {}, item);
        return item;
      });
    } else obj[key] = srcValue;
    return obj;
  }, object);
}
export default {
  /**
   * 辅助方法
   */
  stringify: function (val) {
    if (typeof val === "object")
      try {
        val = JSON.stringify(val);
      } catch (e) {}
    return val;
  },
  parse: function (val) {
    if (typeof val === "string")
      try {
        val = JSON.parse(val);
      } catch (e) {}
    return val;
  },
  clone: function (val) {
    return typeof val === "object" ? this.parse(this.stringify(val)) : val;
  },
  toPercent: function (a) {
    return (Math.round(a * 10000) / 100).toFixed(2) + "%";
  },
  toThousands: function (val) {
    val = String(val);
    if (String(+val) === "NaN") return val;
    let int = val,
      decimal = "";
    if (~int.indexOf(".")) {
      let [a, b] = int.split(".");
      int = a;
      decimal = +b;
      decimal = decimal ? `.${decimal}` : "";
    }
    return String(int).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$&,") + decimal;
  },
  toMB: function (bytes) {
    let i = 0;
    const unit = 1024,
      loop = "BKMGT";
    while (bytes > unit) {
      bytes = bytes / unit;
      i++;
    }
    return bytes.toFixed(2) + (i ? loop.charAt(i) : "") + "B";
  },
  /** @lodash.set example
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * setData(object, 'a[0].b.c', 4);
   * object.a[0].b.c; //  => 4
   *
   * setData(object, ['x', '0', 'y', 'z'], 5);
   * object.x[0].y.z; // => 5
   */
  setData: function (object, path, defaultValue) {
    if (typeof object !== "object") return object;

    function _baseSet(path) {
      if (Array.isArray(path)) return path;
      /** path format  : 'a[0].b.c' => ['a','0','b','c'] */
      return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
    }
    _baseSet(path).reduce((total, value, index, _) => {
      /** each end */
      if (index === _.length - 1) return (total[value] = defaultValue), null;
      /** each update */ else if (value in total) return total[value];
      /** each add */ else
        return (
          (total[value] = /^[0-9]{1,}$/.test(_[index + 1]) ? [] : {}),
          total[value]
        );
    }, object);
    // 返回object
    return object;
  },
  merge,
};
