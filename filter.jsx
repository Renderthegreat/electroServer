/**
 * @author renderlabs::cloud
 * @copyright (c) [2024] [RENDERLABS]
 * @license MIT
 *
 * You are required to keep this header intact until modified by you.
 * You are permitted to use this code.
 */

const { h } = require( "preact" );
const { render } = require("preact-render-to-string");
const r = render
const fs = require("fs")
let banlist
async function setup(){
  banlist = await bannef()
}


async function bannef(){
  let banlistf = await fs.promises.readFile("banlist.txt", "utf8")
  return (banlistf)
}
async function rss(req, res, next){
  if (req.path == '/test' ){
    let result = <h1>Hello World</h1>
    return {html:r(result)}
  }
  else{
    
    if(banlist.includes(req.ip))
    {
      let result = <h1>You are banned from this site</h1>
    
      return {html:r(result)}
    }
    else{
      next()
    }
  }
} 
setup()
export { rss }