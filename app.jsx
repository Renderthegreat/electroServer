const { h } = require( "preact" );
const { render } = require("preact-render-to-string");
const r = render
function main(Server,Content,Host,runtime){
    let example = Server.create("get", "/example", async (req, res) => {
    let clicks = 0;

    let html = new Content("text/html");
    clicks++;
    let data = 
      <html>
        <body>
          <div>
            <h1> `this page has ${clicks} views.` </h1>
          </div>
          <style>
          
          </style>
        </body>
        
      </html>
    
    html.contents(r(data));
    html.send(req, res);
    return { failSafe: true };
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