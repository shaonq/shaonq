
export default {
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
};


