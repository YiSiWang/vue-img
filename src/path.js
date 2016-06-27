// hash to path
const toPath = hash => (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');

export default toPath;
