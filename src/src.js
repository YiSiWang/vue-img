import cdn from './cdn.js';
import toPath from './path.js';
import { canWebp } from './webp.js';

// get image size
const getSize = (str) => {
  // no size limit
  if (!str) return '';

  const index = str.indexOf('*');
  let size = 'thumbnail/';

  if (index === -1) {
    // only width
    size += `${str}x/`;
  } else {
    // both width and height
    const cover = str.slice(0, index) + 'x' + str.slice(index + 1);
    size += `!${cover}r/gravity/Center/crop/${cover}/`;
  }

  return size;
};

// get image.src
const getSrc = (opt) => {
  // CDN's prefix
  const prefix = typeof opt.prefix === 'string' ? opt.prefix : cdn;

  // image quality
  const quality = typeof opt.quality === 'number' ? opt.quality : 75;

  // image format
  const format = canWebp ? 'format/webp/' : '';

  return prefix + toPath(opt.hash) + `?imageMogr/quality/${quality}/${format}` + getSize(opt.size);
};

export default getSrc;
