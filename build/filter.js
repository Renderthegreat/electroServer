"use strict";

var _require = require("preact"),
  h = _require.h;
var _require2 = require("preact-render-to-string"),
  render = _require2.render;
var r = render;
function rss(req, res, next) {
  if (req.path == '/test') {
    var result = h("h1", null, "Hello World");
    return {
      html: r(result)
    };
  } else {
    next();
  }
}
module.exports.rss = rss;