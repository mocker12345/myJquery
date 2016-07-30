/**
 * Created by rancongjie on 16/7/24.
 */
(function (window, document) {
  var w = window;
  var d = document;
  var R = function (selector) {
    return new R.prototype.init(selector)
  };
  R.prototype = {
    constructor: R,
    length: 0,
    splice: [].splice,
    selector: '',
    init: function (selector) {
      if (!selector) {
        return selector;
      }
      var selector = selector.trim();
      if (typeof selector === 'object') {
        selector = [selector];
        for (var i = 0; i < selector.length; i++) {
          this[i] = selector[i];
        }
        this.length = selector.length;
        return this;
      } else if (typeof selector === 'function') {
        R.ready(selector);
        return;
      }
      var elm;
      if (selector.charAt(0) === '#' && !selector.match(/\s/)) {
        selector = selector.substring(1);
        this.selector = selector;
        elm = d.getElementById(selector);
        this.length = 1;
        this[0] = elm;
        return this;
      } else {
        elm = d.querySelectorAll(selector);
        this.length = elm.length;
        for (var i = 0; i < elm.length; i++) {
          this[i] = elm[i];
        }
        this.selector = selector;
        return this;
      }
    },
    css: function (attr, val) {
      for (var i = 0; i < this.length; i++) {
        if (arguments.length === 1) {
          return getComputedStyle(this[i], null)[attr];
        }
        this[i].style[attr] = val;
      }
      return this;
    },
    hasClass: function (cla) {//(^|\s+)(\s+|$)/
      for (var i = 0; i < this.length; i++) {
        if (this[i].className.match(new RegExp('(^|\\s+)' + cla + '(\\s+|$)'))) {
          return true;
        }
        return false
      }
      return this;
    },
    addClass: function (cla) {
      for (var i = 0; i < this.length; i++) {
        if (!this[i].className.match(new RegExp('(^|\\s+)' + cla + '(\\s+|$)'))) {
          this[i].className += ' ' + cla;
        }
      }
      return this;
    },
    removeClass: function (cla) {
      for (var i = 0; i < this.length; i++) {
        if (this[i].className.match(new RegExp('(^|\\s+)' + cla + '(\\s+|$)'))) {
          this[i].className = this[i].className.replace(' ' + cla, '');
        }
      }
      return this;
    },
    next: function () {
      return sibling(this[0], 'nextSibling');
    },
    prev: function () {
      return sibling(this[0], 'previousSibling');
    },
    parent: function () {
      var parent = this[0].parentNode;
      parent = parent && parent.nodeType !== 11 ? parent : null;
      var r = R();
      r[0] = parent;
      r.selector = parent.tagName.toLocaleLowerCase();
      r.length = 1;
      return r;
    },
    parents: function () {
      var r = R();
      var i = 0;
      while ((this[0] = this[0].parentNode) && this[0].nodeType !== 9) {
        if (this[0].nodeType === 1) {
          r[i] = this[0];
          i++;
        }
      }
      r.length = i;
      return r;
    }

  };
  R.ready = function (fn) {
    d.addEventListener('DomContentLoaded', function () {
      fn & fn();
    }, false);
    d.removeEventListener('DomContentLoaded', fn, true);
  };
  R.each = function (obj, callback) {

  };
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {
    }
    return cur;
  }

  function isArray(obj) {
    return Array.isArray(obj);
  }

  R.prototype.init.prototype = R.prototype;
  window.R = R;
})(window, document);