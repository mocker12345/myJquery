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
    css: function (attr,val) {
      for (var i = 0; i<this.length;i++){
        if (arguments.length === 1){
          return getComputedStyle(this[i],null)[attr];
        }
        this[i].style[attr] = val;
      }
      return this;
    },
    hasClass: function (cla) {
      for(var i = 0;i<this.length;i++){
        if(this[i].className.match(/\scla\s/)) return true;
          return false
      }
      return this;
    },
    addClass: function (cla) {
      for(var i =0;i<this.length;i++){
        if(!this[i].className.match(/\sclas\s/)){
          this[i].className += '' +cla;
        }
      }
      return this;
    },
    removeClass: function (cla) {
      for (var i = 0;i<this.length;i++){
        if(this[i].className.match(/\scla\s/)){
          this[i].className = this[i].className.replace(''+cla,'');
        }
      }
      return this;
    }
  };
  R.prototype.init.prototype = R.prototype;
  window.R = R;
})(window, document);