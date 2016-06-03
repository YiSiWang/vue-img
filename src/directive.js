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

  Vue.directive(type, {
    bind() {
      if (this.modifiers.now) return;
      setAttr(this.el, opt.loading);
    },

    update(hash) {
      if (!hash) return;

      const src = getSrc({
        hash,
        prefix: opt.prefix,
        quality: opt.quality,
        size: this.arg
      });

      const img = new Image();

      img.onload = () => {
        setAttr(this.el, src);
      };

      img.onerror = () => {
        if (!opt.error) return;
        setAttr(this.el, opt.error);
      };

      img.src = src;
    }
  });
};

export default directive;
