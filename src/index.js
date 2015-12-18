import * as resolve from './resolve';
import { join } from 'path';

function winPath(path) {
  return path.replace(/\\/g, '/');
}

export default function hackResolve(opts) {
  if (!opts || !opts.dirname) {
    throw new Error('[Error] opts.dirname must be supplied');
  }

  resolve.setDirname(opts.dirname);

  var realRequire = require.extensions[".js"];
  require.extensions[".js"] = function(m, filename) {
    if (winPath(filename).indexOf('babel-core/lib/helpers/resolve.js') > -1) {
      if (m.parent && winPath(m.parent.id).indexOf('babel-core/lib/transformation/file/options/option-manager.js') > -1) {
        var content = require('fs').readFileSync(join(__dirname, 'resolve.js'), 'utf-8');
        return m._compile(content, filename);
      }
    }
    return realRequire(m, filename);
  };
}
