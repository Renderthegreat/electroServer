const { h } = require( "preact" );
const { render } = require("preact-render-to-string");
const r = render
let clicks = 0;
let styles = `h1 {
  color: red;
}`
function main(Server,Content,Host,runtime){
    let example = Server.create("get", "/example", async (req, res) => {
    

    let html = new Content("text/html");
    clicks++;
    let pluralMarker
    if(clicks == 1){
      pluralMarker = ""
    }
    else{
      pluralMarker = "s"
    }
    let data = 
      <html>
        <body>
          <div>
            <h1>This example page has {clicks} view{pluralMarker}. </h1>
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
  async function runner(){
    let host = new Host();
    host.hostDir("get", "server", "/");
    await Server.start(80);
    await runtime.sleep(250);
    runtime.log("Press (CTRL + Q) to pause. Or press (CTRL + E) to end.", "");

  }
  runner()
}
module.exports.main = main