import toPath from './path.js';

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

const getSrc = ({prefix, hash, quality, size, canWebp}) => {
  const format = canWebp ? 'format/webp/' : '';
  return prefix + toPath(hash) + `?imageMogr/quality/${quality}/${format}` + getSize(size);
};

export default getSrc;
