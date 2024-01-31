const { h } = require( "preact" );
const { render } = require("preact-render-to-string");
const r = render
function rss(req, res, next){
  if (req.path == '/test' ){
    let result = <h1>Hello World</h1>
    return {html:r(result)}
  }
  else{
    next()
  }
} 
module.exports.rss = rss