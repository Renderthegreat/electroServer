const { h } = require( "preact" );
const { render } = require("preact-render-to-string");
const r = render
const fs = require("fs")
let banlist
async function setup(){
  banlist = await bannef()//this is a function that returns a list of banned users
}


async function bannef(){
  let banlistf = await fs.promises.readFile("banlist.txt", "utf8")//this is a function that returns a list of banned users.
  return (banlistf)
}
async function rss(req, res, next){
  if (req.path == '/test' ){
    let result = <h1>Hello World</h1>
    return {html:r(result)}//returnes the html of the example filter page.
  }
  else{
    
    if(banlist.includes(req.ip))//this detects if the user is banned.
    {
      let result = <h1>You are banned from this site</h1>
    
      return {html:r(result)}//returns the html of the banned page.
    }
    else{
      next()//continues with the request.
    }
  }
} 
setup()
module.exports.rss = rss