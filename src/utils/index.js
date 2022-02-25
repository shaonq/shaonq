

const date = {
  toString: function (l, t) {
    let s = undefined;
    l = typeof l !== "object" ? new Date(l) : l;
    let q = l.getFullYear();
    let p = l.getMonth() + 1;
    let r = l.getDate();
    let m = l.getHours();
    let n = l.getMinutes();
    let o = l.getSeconds();
    p = (parseInt(p) < 10) ? ("0" + p) : (p);
    r = (parseInt(r) < 10) ? ("0" + r) : (r);
    m = (parseInt(m) < 10) ? ("0" + m) : (m);
    n = (parseInt(n) < 10) ? ("0" + n) : (n);
    o = (parseInt(o) < 10) ? ("0" + o) : (o);
    if ("yyyy-MM-dd HH:mm:ss" === t) {
      s = q + "-" + p + "-" + r + " " + m + ":" + n + ":" + o
    } else if ("yyyy-MM" === t) {
      s = q + "-" + p
    } else if ("HH:mm" === t) {
      s = m + ":" + n
    } else if ("yyyy" === t) {
      s = q
    } else { // "yyyy-MM-dd"
      s = q + "-" + p + "-" + r
    }
    return s
  },
  toDate: function (q) {
    if (q.length === 19) {
      let p = q.substring(0, 4);
      let r = q.substring(5, 7);
      let m = q.substring(8, 10);
      let l = q.substring(11, 13);
      let n = q.substring(14, 16);
      let o = q.substring(17, 19);
      return new Date(p, r - 1, m, l, n, o)
    } else {
      if (q.length === 10) {
        let p = q.substring(0, 4);
        let r = q.substring(5, 7);
        let m = q.substring(8, 10);
        return new Date(p, r - 1, m)
      } else {
        if (q.length === 7) {
          let p = q.substring(0, 4);
          let r = q.substring(5, 7);
          return new Date(p, r - 1)
        } else {
          if (q.length === 4) {
            let p = q.substring(0, 4);
            return new Date(p)
          } else {
            return undefined
          }
        }
      }
    }
  },
  getMonthDays: function (l, o) {
    let m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let n = l.getFullYear();
    if (typeof o === "undefined") {
      o = l.getMonth()
    }
    if (((0 === (n % 4)) && ((0 !== (n % 100)) || (0 === (n % 400)))) && o === 1) {
      return 29
    } else {
      return m[o]
    }
  },
  addDays: function (l, n, f) {
    let m = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(n);
    m = new Date(m.getTime() + parseInt(l) * 24 * 3600 * 1000);
    return this.toString(new Date(m), f)
  },
  addMonths: function (p, o, f) {
    let l = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(o);
    let m = l.getMonth();
    let n = l.getDate();
    let q = this.getMonthDays(l, l.getMonth() + parseInt(p));
    if (n > q) {
      l.setDate(q)
    }
    l.setMonth(l.getMonth() + parseInt(p));
    return this.toString(l, f)
  },
  addMonthsForStart: function (n, m) {
    let l = (arguments.length === 1) ? this.today() : m;
    l = this.addMonths(n, l);
    return this.firstDayOfMonth(l)
  },
  addMonthsForEnd: function (n, m) {
    let l = (arguments.length === 1) ? this.today() : m;
    l = this.addMonths(n, l);
    return this.addDays(-1, this.firstDayOfMonth(l))
  },
  addYears: function (m, n, f) {
    let l = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(n);
    l.setYear(l.getFullYear() + parseInt(m));
    return this.toString(l, f)
  },
  addYearsForStart: function (l, n) {
    let m = (arguments.length === 1) ? this.today() : n;
    m = this.addYears(l, m);
    return this.firstDayOfYear(m)
  },
  addYearsForEnd: function (l, n) {
    let m = (arguments.length === 1) ? this.today() : n;
    m = this.addYears(l, m);
    return this.firstDayOfYear(m)
  },
  sunOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay()) * (24 * 3600 * 1000));
    return this.toString(l, f)
  },
  monOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 1) * (24 * 3600 * 1000));
    return this.toString(l, f)
  },
  tueOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 2) * (24 * 3600 * 1000));
    return this.toString(l, f)
  },
  wedOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 3) * (24 * 3600 * 1000));
    return this.toString(l, f)
  },
  turOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 4) * (24 * 3600 * 1000));
    return this.toString(l, f)
  },
  friOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 5) * (24 * 3600 * 1000));
    return this.toString(l, f)
  },
  satOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 6) * (24 * 3600 * 1000));
    return this.toString(l, f)
  },
  firstDayOfMonth: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l.setDate(1);
    return this.toString(l, f)
  },
  lastDayOfMonth: function (l) {
    l = (arguments.length === 0) ? this.today() : (l);
    l = this.addMonths(1, l);
    l = this.firstDayOfMonth(l);
    l = this.addDays(-1, l);
    return l
  },
  firstDayOfYear: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l.setMonth(0);
    l.setDate(1);
    return this.toString(l, f)
  },
  lastDayOfYear: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l.setMonth(11);
    l.setDate(31);
    return this.toString(l, f)
  },
  today: function (l) {
    if (arguments.length === 0) {
      return this.toString(new Date(), "yyyy-MM-dd")
    } else {
      return this.toString(new Date(), l)
    }
  }
}


const util = {
  loadJs: function (src) {
    return new Promise((resolve, reject) => {
      let n = document.getElementsByTagName("head")[0], o = document.createElement("script");
      o.onload = o.onreadystatechange = o.onerror = function () {
        o && o.readyState && /^(?!(?:loaded|complete)$)/.test(o.readyState) || (o.onload = o.onreadystatechange = o.onerror = null, o.src = "", o.parentNode.removeChild(o), o = null, resolve && resolve())
      }, o.src = src;
      try {
        n.appendChild(o)
      } catch (i) {
        reject && reject()
      }
    });
  },

  loadCss: function (href, id) {
    let n = document.getElementsByTagName("head")[0], o = document.createElement("link"),
      el = document.getElementById(id);
    o.onload = o.onreadystatechange = o.onerror = null, o.rel = "stylesheet", o.href = href;
    try {
      el ? (o = null) : (id && (o.id = id), n.appendChild(o))
    } catch (i) {
    }
  },
  is: function () {
    let d = {},
      ua = navigator.userAgent;
    return d.ios = !!ua.match(/(iphone|ipod|ipad)/i), d.android = !!ua.match(/android/i), d.wechat = !!ua.match(/micromessenger/i), ua = ua.match(/msie \d+?/i), d.ie = function () {
      let t = navigator.userAgent.toLowerCase();
      return window.ActiveXObject || "ActiveXObject" in window ? (t.match(/msie\s(\d+)/) || [])[1] || "11" : !1
    }(), d
  }(),
  regexp: {
    mobile: /^1\d{10}$/g,
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    required: /[\S]+/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    image: /\.(png|jpg|gif|jpeg|webp)$/i,
  },
  /**
  * cookie
  * @param {string}  name 名称
  * @param {Object}  value AES 加密
  * @return cookie.set("cookie",e,document.domain,"/",7)
  */
  cookie: {
    set(name, value, domain, path, expires, is) {
      if (expires) { var d = new Date; d.setTime(d.getTime() + expires * 1000 * 60 * 60 * 24); expires = d; d = null; }
      document.cookie = name + "=" + (is ? value : escape(value)) + (expires ? "; expires=" + expires.toGMTString() : "") + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "")
    },
    get(name, value) {
      var o = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      return (null != o ? unescape(o[2]) : value)
    },
    clear(name, path, domain) {
      this.get(name) && (document.cookie = name + "=" + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT")
    }
  },
  session: {
    set: function (name, value) {
      return window.sessionStorage.setItem(name, util.stringify(value))
    },
    get: function (name) {
      let value = window.sessionStorage.getItem(name) || "";
      return util.parse(value)
    },
    clear: function (name) {
      return window.sessionStorage.removeItem(name)
    }
  },
  store: {
    set: function (name, value) {
      return window.localStorage.setItem(name, util.stringify(value))
    },
    get: function (name) {
      let value = window.localStorage.getItem(name) || "";
      return util.parse(value)
    },
    clear: function (name) {
      return window.localStorage.removeItem(name)
    }
  },
  /**
   * 辅助方法
   */
  stringify: function (val) {
    if (typeof val === 'object') try { val = JSON.stringify(val) } catch (e) { }
    return val
  },
  parse: function (val) {
    if (typeof val === 'string') try { val = JSON.parse(val) } catch (e) { }
    return val
  },
  clone: function (val) {
    return typeof val === "object" ? this.parse(this.stringify(val)) : val
  },
  toPercent: function (a) {
    return (Math.round(a * 10000) / 100).toFixed(2) + '%';
  },
  toThousands: function (val) {
    val = String(val);
    if (String(+val) === 'NaN') return val;
    let int = val, decimal = '';
    if (~int.indexOf(".")) {
      let [a, b] = int.split('.');
      int = a;
      decimal = +b;
      decimal = decimal ? `.${decimal}` : '';
    }
    return String(int).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&,') + decimal
  },
  toMB: function (bytes) {
    let i = 0;
    const unit = 1024, loop = "BKMGT";
    while (bytes > unit) {
      bytes = bytes / unit;
      i++;
    }
    return bytes.toFixed(2) + (i ? loop.charAt(i) : '') + 'B';
  }
};


import dialog from "./dialog.js"
import "./scss/dialog.scss"
export default Object.assign(util, dialog, { date });

