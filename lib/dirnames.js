"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.get = get;

var dirnames = [];

function add(dirname) {
  dirnames.push(dirname);
}

function get() {
  return dirnames;
}