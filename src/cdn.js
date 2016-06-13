// CDN's prefix in the production environment
let cdn = '//fuss10.elemecdn.com';

// in the test environment
const bases = ['alpha', 'beta'];

bases.some(base => {
  if (window.document.domain.match(base + '.ele')) {
    return cdn = `//fuss.${base}.elenet.me`;
  }
});

export default cdn;
