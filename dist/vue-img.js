(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('VueImg', ['exports'], factory) :
  (factory((global.VueImg = global.VueImg || {})));
}(this, function (exports) { 'use strict';

  // CDN's prefix in the production environment
  var cdn = '//fuss10.elemecdn.com';

  // in the test environment
  var bases = ['alpha', 'beta'];
  bases.forEach(function (base) {
    if (window.document.domain.match(base + '.ele')) {
      cdn = '//fuss.' + base + '.elenet.me';
    }
  });

  var cdn$1 = cdn;

  exports.canWebp = false;

  var img = new Image();
  img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
  img.onload = function () {
    exports.canWebp = true;
  };

  var toPath = function toPath(hash) {
    return (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');
  };

  // get image size
  var getSize = function getSize(str) {
    // no size limit
    if (!str) return '';

    var index = str.indexOf('*');
    var size = 'thumbnail/';

    if (index === -1) {
      // only width
      size += str + 'x/';
    } else {
      // both width and height
      var cover = str.slice(0, index) + 'x' + str.slice(index + 1);
      size += '!' + cover + 'r/gravity/Center/crop/' + cover + '/';
    }

    return size;
  };

  // get image.src
  var getSrc = function getSrc(opt) {
    // CDN's prefix
    var prefix = typeof opt.prefix === 'string' ? opt.prefix : cdn$1;

    // image quality
    var quality = typeof opt.quality === 'number' ? opt.quality : 75;

    // image format
    var format = exports.canWebp ? 'format/webp/' : '';

    return prefix + toPath(opt.hash) + ('?imageMogr/quality/' + quality + '/' + format) + getSize(opt.size);
  };

  var directive = function directive(Vue, opt, type) {
    // set img.src or element.style.backgroundImage
    var setAttr = function setAttr(el, src) {
      if (!el || !src) return;

      if (type === 'img') {
        el['src'] = src;
      } else {
        el['style']['backgroundImage'] = 'url(' + src + ')';
      }
    };

    Vue.directive(type, {
      bind: function bind() {
        if (this.modifiers.now) return;
        setAttr(this.el, opt.loading);
      },
      update: function update(hash) {
        var _this = this;

        if (!hash) return;

        var src = getSrc({
          hash: hash,
          prefix: opt.prefix,
          quality: opt.quality,
          size: this.arg
        });

        var img = new Image();

        img.src = src;

        img.onload = function () {
          setAttr(_this.el, src);
        };

        if (!opt.error) return;
        img.onerror = function () {
          setAttr(_this.el, opt.error);
        };
      }
    });
  };

  var install = function install(Vue) {
    var opt = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    directive(Vue, opt, 'img');
    directive(Vue, opt, 'bgi');
  };

  exports.cdn = cdn$1;
  exports.toPath = toPath;
  exports.getSrc = getSrc;
  exports.install = install;

}));