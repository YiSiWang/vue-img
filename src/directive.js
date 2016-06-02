import cdn from './cdn.js';
import { canWebp } from './webp.js';
import getSrc from './src.js';

const directive = (Vue, opt, type) => {
  // CDN's prefix
  const prefix = typeof opt.prefix === 'string' ? opt.prefix : cdn;

  // image quality
  const quality = opt.quality <= 100 ? opt.quality : 75;

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
        prefix,
        hash,
        quality,
        canWebp,
        size: this.arg
      });

      const img = new Image();

      img.src = src;

      img.onload = () => {
        setAttr(this.el, src);
      };

      if (!opt.error) return;
      img.onerror = () => {
        setAttr(this.el, opt.error);
      };
    }
  });
};

export default directive;
