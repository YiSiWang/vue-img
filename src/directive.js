import getSrc from './src.js';

const directive = (Vue, opt, type) => {
  // set img.src or element.style.backgroundImage
  const setAttr = (el, src) => {
    if (!el || !src) return;

    if (type === 'img') {
      el['src'] = src;
    } else {
      el['style']['backgroundImage'] = `url(${src})`;
    }
  };

  // register vue directive
  Vue.directive(type, {
    bind() {
      if (this.modifiers.now) return;
      setAttr(this.el, opt.loading);
    },

    update(hash) {
      if (!hash) return;

      const img = new Image();
      const src = getSrc({
        hash,
        prefix: opt.prefix,
        quality: opt.quality,
        size: this.arg
      });

      img.onload = setAttr.bind(null, this.el, src);

      if (opt.error) {
        img.onerror = setAttr.bind(null, this.el, opt.error);
      }

      img.src = src;
    }
  });
};

export default directive;
