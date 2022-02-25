var util = {}, ds = document.selection;
var isIE = window.ActiveXObject || "ActiveXObject" in window ? (navigator.userAgent.toLowerCase().match(/msie\s(\d+)/) || [])[1] || "11" : !1;
// 选区开始位置
util.selectionStart = function (el) {
    if (!ds) try {
        return el.selectionStart
    } catch (b) {
        return 0
    }
    var d = ds.createRange(),
        e, f, g = 0,
        h = document.body.createTextRange();
    try {
        h.moveToElementText(el)
    } catch (b) { }
    for (g; h.compareEndPoints("StartToStart", d) < 0; g++) h.moveStart("character", 1);
    return g
};
// 选择选区之前
util.selectionBefore = function (el) {
    return el.value.slice(0, util.selectionStart(el))
};
// 选中选区部分
util.selectText = function (el, at_start, at_end) {
    el.focus();
    if (!ds) el.setSelectionRange(at_start, at_end);
    else {
        var e = el.createTextRange();
        e.collapse(1);
        e.moveStart("character", at_start);
        e.moveEnd("character", at_end - at_start);
        e.select()
    }
};
// 插入选区文字
util.insertText = function (el, text, at_start, at_len) {
    el.focus();
    at_len = at_len || 0;
    if (!ds) {
        var g = el.value,
            h = at_start - at_len,
            i = h + text.length;
        el.value = g.slice(0, h) + text + g.slice(at_start, g.length);
        util.selectText(el, i, i)
    } else {
        var j = ds.createRange();
        j.moveStart("character", -at_len);
        j.text = text
    }
};
// 替换选区文字
util.replaceText = function (el, text) {
    el.focus();
    var e = el.value,
        f = util.getSelectedText(el),
        g = f.length;
    if (f.length == 0) util.insertText(el, text, util.getCursorPos(el));
    else {
        var h = util.getCursorPos(el);
        if (!ds) {
            var j = h + f.length;
            el.value = e.slice(0, h) + text + e.slice(h + g, e.length);
            util.setCursor(el, h + text.length);
            return
        }
        var i = ds.createRange();
        i.text = text;
        util.setCursor(el, h + text.length)
    }
};
// 获取光标位置
util.getCursorPos = function (el) {
    var b = 0;
    if (isIE) {
        el.focus();
        var d = null;
        d = ds.createRange();
        var e = d.duplicate();
        e.moveToElementText(el);
        e.setEndPoint("EndToEnd", d);
        el.selectionStartIE = e.text.length - d.text.length;
        el.selectionEndIE = el.selectionStartIE + d.text.length;
        b = el.selectionStartIE
    } else if (el.selectionStart || el.selectionStart == "0") b = el.selectionStart;
    return b
};
// 获取选区文字
util.getSelectedText = function (el) {
    var b = "",
        d = function (a) {
            return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
        };
    window.getSelection ? b = d(el) : b = ds.createRange().text;
    return b
};
// 设置光标位置
util.setCursor = function (el, pos, coverlen) {
    pos = pos == null ? el.value.length : pos;
    coverlen = coverlen == null ? 0 : coverlen;
    el.focus();
    if (el.createTextRange) {
        var d = el.createTextRange();
        d.move("character", pos);
        d.moveEnd("character", coverlen);
        d.select()
    } else el.setSelectionRange && el.setSelectionRange(pos, pos + coverlen)
};
// util.unCoverInsertText = function (el, str, pars) {
//     pars = pars == null ? {} : pars;
//     pars.rcs = pars.rcs == null ? el.value.length : pars.rcs * 1;
//     pars.rccl = pars.rccl == null ? 0 : pars.rccl * 1;
//     var d = el.value,
//         e = d.slice(0, pars.rcs),
//         f = d.slice(pars.rcs + pars.rccl, d == "" ? 0 : d.length);
//     el.value = e + str + f;
//     this.setCursor(el, pars.rcs + (str == null ? 0 : str.length))
// };
// 文本选择区域位置
util.textSelectArea = function (el) {
    var b = {
        start: 0, // 开始位置
        len: 0, // 长度
    };
    if (typeof el.selectionStart == "number") {
        b.start = el.selectionStart;
        b.len = el.selectionEnd - el.selectionStart
    } else if (typeof document.selection != "undefined") {
        var c = document.selection.createRange();
        if (el.tagName === "INPUT") var d = el.createTextRange();
        else if (el.tagName === "TEXTAREA") {
            var d = c.duplicate();
            d.moveToElementText(el)
        }
        d.setEndPoint("EndToStart", c);
        b.start = d.text.length;
        b.len = c.text.length;
        var e = 0;
        d.moveEnd("character", el.value.length - b.start);
        d.moveStart("character", b.start);
        for (var f = b.start; f < el.value.length; f += 1) {
            if (!(d.compareEndPoints("StartToStart", c) < 0)) break;
            d.moveStart("character", 1);
            e += 2
        }
        b.start += e;
        c = null;
        d = null
    }
    return b
}
// 记录鼠标选中的位置
util.cacheCurPos = function (el) {
    var b = util.getSelectedText(el),
        c = b ? b.length : 0,
        d = util.textSelectArea(el).start,
        e = d + "&" + c;
    el.setAttribute("range", e)
}
// 获取鼠标选中的位置
util.getCurPos = function (el) {
    var a = el.getAttribute("range") || "0&0";
    return a.split("&")
}
// 计算 textarea 输入的区域像素
util.getAreaPosition = function (el) {
    // 获取输入之前的所有文字;
    var text = util.selectionBefore(el);
    // 通过 pre-wrap 模拟输入框 然后通过 span 分割行
    var convert = text => '<span>' + text.replace(/\n*$/g, '').replace(/\n/g, '</span><br><span>') + '</span>';
    var span = document.createElement("span");
    span.style.whiteSpace = "pre-wrap";
    span.innerHTML = convert(text);
    document.body.appendChild(span);
    var offset = {
        top: span.offsetHeight,
        left: [].slice.call(span.querySelectorAll('span')).pop().offsetWidth,
    };
    span.parentNode.removeChild(span);
    return offset
}
// 作用同 jQ offset
util.offset = function (el) {
    // 返回元素的大小及其相对于视口的位置
    const box = el.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
}
//XSS
util.escape = function (html) {
    return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}
// 监听@符
util.at = function ({ el, change, flag }) {
    var text = el.value.replace(/\r/g, ""), at_start = util.selectionStart(el);
    if (at_start < 0 || typeof change !== "function") return;
    util.cacheCurPos(el);
    var str = text.slice(0, at_start);
    var isHidden = str.match(new RegExp(["(", (flag || "@"), ")([a-z/[A-Z0-9/\\]一-龥_-]{0,20})$"].join("")));
    // 最小间时间之后才会触发隐藏
    if (!isHidden) { return change(false) }
    var content = function (key) {
        // 计算 textarea 的偏移量       
        var _offset = util.offset(el);
        var offset = util.getAreaPosition(el);
        change({
            top: _offset.top + offset.top - el.scrollTop,
            left: _offset.left + offset.left - el.scrollLeft,
            key: key
        })
    }
    content(isHidden[2])
}
// 解析@符
util.at2html = function ({ text, flag, replacer }) {
    var re = new RegExp((flag || "@") + "(\\S+)(\\s+?|$)", 'g');
    // return text.replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2')
    replacer = replacer || (flag || "@") + '<a href="javascript:;">$1</a>$2'
    return util.escape(text).replace(re, replacer)
}

export default util