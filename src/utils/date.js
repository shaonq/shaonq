
/** format string : yyyy-MM-dd HH:mm:ss */
function format(date, format = 'yyyy-MM-dd') {
  if (!date) return '';
  if (typeof date !== "object") date = new Date(date);
  const formatNumber = n => n < 10 ? ('0' + n) : n
  const o = {};
  o.yyyy = date.getFullYear()
  o.MM = date.getMonth() + 1
  o.dd = date.getDate()
  o.HH = date.getHours()
  o.mm = date.getMinutes()
  o.ss = date.getSeconds()
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, k => formatNumber(o[k]))
}

export default {
  format,
  toString: format,
  toDate: function (q) {
    if (typeof q === "object") return q
    else return new Date(q);
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
    return this.format(new Date(m), f)
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
    return this.format(l, f)
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
    return this.format(l, f)
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
    return this.format(l, f)
  },
  monOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 1) * (24 * 3600 * 1000));
    return this.format(l, f)
  },
  tueOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 2) * (24 * 3600 * 1000));
    return this.format(l, f)
  },
  wedOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 3) * (24 * 3600 * 1000));
    return this.format(l, f)
  },
  turOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 4) * (24 * 3600 * 1000));
    return this.format(l, f)
  },
  friOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 5) * (24 * 3600 * 1000));
    return this.format(l, f)
  },
  satOfWeek: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l = new Date(l - (l.getDay() - 6) * (24 * 3600 * 1000));
    return this.format(l, f)
  },
  firstDayOfMonth: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l.setDate(1);
    return this.format(l, f)
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
    return this.format(l, f)
  },
  lastDayOfYear: function (m, f) {
    let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
    l.setMonth(11);
    l.setDate(31);
    return this.format(l, f)
  },
  today: function (l) {
    if (arguments.length === 0) {
      return this.format(new Date(), "yyyy-MM-dd")
    } else {
      return this.format(new Date(), l)
    }
  }
}

