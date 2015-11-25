import Module from "module";

const relativeModules = {};

function oldResolve(loc, relative) {
  // we're in the browser, probably
  if (typeof Module === "object") return null;

  let relativeMod = relativeModules[relative];

  if (!relativeMod) {
    relativeMod = new Module;
    relativeMod.paths = Module._nodeModulePaths(relative);
    relativeModules[relative] = relativeMod;
  }

  try {
    return Module._resolveFilename(loc, relativeMod);
  } catch (err) {
    return null;
  }
}

export function setDirname(dirname) {
  global.babel_core_resolve_enhance_dirnames = global.babel_core_resolve_enhance_dirnames || [];
  global.babel_core_resolve_enhance_dirnames.push(dirname);
}

export default function (loc, relative) {
  let result;
  [relative].concat(global.babel_core_resolve_enhance_dirnames || []).forEach(dirname => {
    if (!result) {
      result = oldResolve(loc, dirname);
    }
  });
  return result;
}
