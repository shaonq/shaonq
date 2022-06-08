export default {
    ie: Number(document.documentMode) | 0,
    on: (function () {
      if (document.addEventListener) {
        return function (element, event, handler) {
          if (element && event && handler) {
            element.addEventListener(event, handler, false);
          }
        }
      } else {
        return function (element, event, handler) {
          if (element && event && handler) {
            element.attachEvent('on' + event, handler);
          }
        }
      }
    })(),
    off: (function () {
      if (document.removeEventListener) {
        return function (element, event, handler) {
          if (element && event) {
            element.removeEventListener(event, handler, false);
          }
        }
      } else {
        return function (element, event, handler) {
          if (element && event) {
            element.detachEvent('on' + event, handler);
          }
        }
      }
    })(),
    once: function (el, event, fn) {
      var off = this.off;
      var listener = function () {
        if (fn) fn.apply(this, arguments)
        off(el, event, listener);
      };
      this.on(el, event, listener)
    },
    // 位置信息
    position: function (el) {
      const box = el.getBoundingClientRect();
      // html元素对象的上/左边框的宽度
      const { clientTop, clientLeft } = document.documentElement;
      const { pageYOffset, pageXOffset } = window;
      return {
        top: box.top - clientTop,
        left: box.left - clientLeft,
        height: box.height,
        width: box.width,
        pageYOffset,
        pageXOffset,
      }
    },
    el: function (attr, doc) {
      if (!doc) doc = document;
      return doc.querySelector(attr)
    },
    els: function (attr, doc) {
      if (!doc) doc = document;
      return [].slice.call(doc.querySelectorAll(attr))
    },
    hasClass: function (el, cls) {
      if (!el || !cls) return false;
      if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
      if (el.classList) {
        return el.classList.contains(cls);
      } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
      }
    },
    addClass: function (el, cls) {
      if (!el) return;
      var curClass = el.className;
      var classes = (cls || '').split(' ');
  
      for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;
  
        if (el.classList) {
          el.classList.add(clsName);
        } else if (!this.hasClass(el, clsName)) {
          curClass += ' ' + clsName;
        }
      }
      if (!el.classList) {
        el.className = curClass;
      }
    },
    removeClass: function (el, cls) {
      if (!el || !cls) return;
      var classes = cls.split(' ');
      var curClass = ' ' + el.className + ' ';
  
      for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;
  
        if (el.classList) {
          el.classList.remove(clsName);
        } else if (this.hasClass(el, clsName)) {
          curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
      }
      if (!el.classList) {
        el.className = curClass;
      }
    },
    append(el, doc) {
      if (!doc) doc = document.body;
      doc.appendChild(el);
    },
    remove(el) {
      if (el && el.parentNode) el.parentNode.removeChild(el)
    },
    isHTMLElement(node) {
      return node instanceof window.HTMLElement || node instanceof HTMLElement;
    },
    getScrollParent(node) {
      try {
        function isScrollParent(node, type = "y") {
          // Firefox wants us to check `-x` and `-y` variations as well
          let _getComputedStyle = window.getComputedStyle(node),
            overflow = _getComputedStyle.overflow,
            overflowX = _getComputedStyle.overflowX,
            overflowY = _getComputedStyle.overflowY;
          let str = (type === "y" ? overflowY : overflowX) || overflow;
          // auto|scroll|overlay|hidden
          return /scroll|overlay|auto/.test(str);
        }
        let parentNode = node.parentNode;
        if (!this.isHTMLElement(parentNode)) return node;
        if (isScrollParent(parentNode)) {
          return parentNode;
        }
        return this.getScrollParent(parentNode)
      } catch (e) { }
      return window
    },
    setTransform(node, vale) {
      let arr = ['webkit', 'Moz', 'O', 'ms'].map(i => `${i}Transform`);
      arr.unshift('transform');
      if (!this.isHTMLElement(node)) return;
      for (let index in arr) {
        if (node.style[arr[index]] !== undefined) {
          return node.style[arr[index]] = vale;
        }
      }
    },
  }