import cdn from './cdn.js';
import { canWebp } from './webp.js';
import toPath from './path.js';
import getParam from './param.js';

const directive = (Vue, opt, type) => {
  const prefix = typeof opt.prefix === 'string' ? opt.prefix : cdn;
  const quality = opt.quality <= 100 ? opt.quality : 75;
  const setAttr = (el, src) => {
    if (type === 'img') {
      el['src'] = src;
    } else {
      el['style']['backgroundImage'] = `url(${src})`;
    }
  };

  Vue.directive(type, {
    bind() {
      setAttr(this.el, opt.loading);
    },

    update(hash) {
      if (!hash) return;

      const format = canWebp ? 'webp' : 'jpg';
      const src = prefix + toPath(hash) + getParam(quality, format, this.arg);
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