
/** format string : yyyy-MM-dd HH:mm:ss */
function format(date, format = 'yyyy-MM-dd') {
  if (!date) return '';
  if (typeof date !== "object") date = new Date(date);
  const pad = n => n < 10 ? '0' + n : n
  const parts = {};
  parts.yyyy = date.getFullYear()
  parts.MM = date.getMonth() + 1
  parts.dd = date.getDate()
  parts.HH = date.getHours()
  parts.mm = date.getMinutes()
  parts.ss = date.getSeconds()
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, k => pad(parts[k]))
}

export default {
  format,
  toString: format,
  toDate: function (date) {
    if (typeof date === "object") return date
    else return new Date(date);
  },
  getMonthDays: function (date, month) {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let year = date.getFullYear();
    if (typeof month === "undefined") {
      month = date.getMonth()
    }
    if (((0 === (year % 4)) && ((0 !== (year % 100)) || (0 === (year % 400)))) && month === 1) {
      return 29
    } else {
      return days[month]
    }
  },
  addDays: function (days, date, format) {
    let d = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(date);
    d = new Date(d.getTime() + parseInt(days) * 24 * 3600 * 1000);
    return this.format(new Date(d), format)
  },
  addMonths: function (months, date, format) {
    let d = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(date);
    let m = d.getMonth();
    let n = d.getDate();
    let monthDays = this.getMonthDays(d, d.getMonth() + parseInt(months));
    if (n > monthDays) {
      d.setDate(monthDays)
    }
    d.setMonth(d.getMonth() + parseInt(months));
    return this.format(d, format)
  },
  addMonthsForStart: function (months, date) {
    let d = (arguments.length === 1) ? this.today() : date;
    d = this.addMonths(months, d);
    return this.firstDayOfMonth(d)
  },
  addMonthsForEnd: function (months, date) {
    let d = (arguments.length === 1) ? this.today() : date;
    d = this.addMonths(months, d);
    return this.addDays(-1, this.firstDayOfMonth(d))
  },
  addYears: function (years, date, format) {
    let d = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(date);
    d.setYear(d.getFullYear() + parseInt(years));
    return this.format(d, format)
  },
  addYearsForStart: function (years, date) {
    let d = (arguments.length === 1) ? this.today() : date;
    d = this.addYears(years, d);
    return this.firstDayOfYear(d)
  },
  addYearsForEnd: function (years, date) {
    let d = (arguments.length === 1) ? this.today() : date;
    d = this.addYears(years, d);
    return this.lastDayOfYear(d)
  },
  sunOfWeek: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d = new Date(d - (d.getDay()) * (24 * 3600 * 1000));
    return this.format(d, format)
  },
  monOfWeek: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d = new Date(d - (d.getDay() - 1) * (24 * 3600 * 1000));
    return this.format(d, format)
  },
  tueOfWeek: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d = new Date(d - (d.getDay() - 2) * (24 * 3600 * 1000));
    return this.format(d, format)
  },
  wedOfWeek: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d = new Date(d - (d.getDay() - 3) * (24 * 3600 * 1000));
    return this.format(d, format)
  },
  turOfWeek: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d = new Date(d - (d.getDay() - 4) * (24 * 3600 * 1000));
    return this.format(d, format)
  },
  friOfWeek: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d = new Date(d - (d.getDay() - 5) * (24 * 3600 * 1000));
    return this.format(d, format)
  },
  satOfWeek: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d = new Date(d - (d.getDay() - 6) * (24 * 3600 * 1000));
    return this.format(d, format)
  },
  firstDayOfMonth: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d.setDate(1);
    return this.format(d, format)
  },
  lastDayOfMonth: function (date) {
    let d = (arguments.length === 0) ? this.today() : date;
    d = this.addMonths(1, d);
    d = this.firstDayOfMonth(d);
    d = this.addDays(-1, d);
    return d
  },
  firstDayOfYear: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d.setMonth(0);
    d.setDate(1);
    return this.format(d, format)
  },
  lastDayOfYear: function (date, format) {
    let d = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(date);
    d.setMonth(11);
    d.setDate(31);
    return this.format(d, format)
  },
  today: function (format) {
    if (arguments.length === 0) {
      return this.format(new Date(), "yyyy-MM-dd")
    } else {
      return this.format(new Date(), format)
    }
  }
}

