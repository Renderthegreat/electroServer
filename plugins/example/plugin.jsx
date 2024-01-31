const { h } = require( "preact" );
const { render } = require("preact-render-to-string");
const r = render
let clicks = 0;
let styles = `h1 {
  color: red;
}`
function main(Server,Content,Host,runtime){
    let example = Server.create("get", "/plugin", async (req, res) => {
    

    let html = new Content("text/html");
    clicks++;
    let data = 
      <html>
        <body>
          <div>
            <h1>This example plugin page has {clicks} views. </h1>
          </div>
          <style>
            {styles}
          </style>
        </body>
        
      </html>
    
    html.contents(r(data));
    html.send(req, res);
    return { failSafe: true }; //tells the server to return a message if none is returned.
  });
  
}
module.exports.main = main