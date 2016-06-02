import cdn from './cdn.js';
import { canWebp } from './webp.js';
import toPath from './path.js';
import getSrc from './src.js';
import directive from './directive.js';

const install = (Vue, opt = {}) => {
  directive(Vue, opt, 'img');
  directive(Vue, opt, 'bgi');
};

export { cdn, canWebp, toPath, getSrc, install };
