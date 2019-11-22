const { relative, dirname, isAbsolute } = require('path');

const isValidPath = require('is-valid-path');

function normalizePath(path, nodeInfo) {
  const { fileAbsolutePath } = nodeInfo;

  const isString = typeof path === 'string';

  // Stop if field is not a valid path
  if (!path || !isString || !isValidPath(path)) {
    // Remove field if empty to prevent Gatsby crashing
    if (isString && path.length === 0) {
      return undefined;
    }
  }
  // Normalize path field from absolute to relative
  if (path && isString && isAbsolute(path)) {
    return getRelativePath(fileAbsolutePath, path);
  } else {
  }

  return path;
}

function normalizeArray(arr, nodeInfo) {
  const newArr = [];
  let type = null;
  for (let val of arr) {
    if (Array.isArray(val)) {
      // console.log('arr');
      newArr.push(normalizeArray(val, nodeInfo));
    } else if (typeof val === 'object') {
      // console.log('obj');
      newArr.push(normalizeObject(val, nodeInfo));
    } else {
      // console.log(`normalizing path for ${val}`);
      newArr.push(normalizePath(val, nodeInfo));
    }
  }
  return { array: newArr };
}

function getRelativePath(fileAbsolutePath, path) {
  const currentAbsoluteDir = process.cwd();
  const nodeFileAbsoluteDir = dirname(fileAbsolutePath);
  const nodeFileRelativeDir = nodeFileAbsoluteDir.replace(`${currentAbsoluteDir}`, '');
  // console.log(`getting relative for ${path}`);
  return relative(nodeFileRelativeDir, path);
}
function normalizeObject(obj, nodeInfo) {
  const newObj = {};
  const type = null;
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      const na = normalizeArray(obj[key], nodeInfo);
      newObj[key] = na.array;
    } else if (typeof obj[key] === 'object') {
      newObj[key] = normalizeObject(obj[key], nodeInfo);
    } else {
      // console.dir(`Path: ${key}`);
      newObj[key] = normalizePath(obj[key], nodeInfo);
    }
  }
  return { type, fm: newObj };
}
module.exports = { normalizeObject };
