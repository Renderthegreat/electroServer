/**
 * @author renderlabs::cloud
 * @copyright (c) [2024] [RENDERLABS]
 * @license MIT
 *
 * You are required to keep this header intact until modified by you.
 * You are permitted to use this code.
 */


const { h } = require("preact"); //very important.
const { render } = require("preact-render-to-string"); //also very important.
const r = render; //optional.
let clicks = 0; //initalize the clicks variable.
let styles = `h1 {
  color: red;
}`; //initalize the styles variable.

function main(Server, Content, Host, runtime, SSR) {
  let example = Server.create("get", "/example", async (req, res) => {
    let html = new Content("text/html");//creates content as type html.
    clicks++; // add one to the clicks variable.
    let pluralMarker;
    if (clicks == 1) {
      pluralMarker = "";
    } else {
      pluralMarker = "s";
    }
    let data = (
      <html>
        <body>
          <div>
            <h1>
              This example page has {clicks} view{pluralMarker}.
            </h1>
          </div>
          <style>{styles}</style>
        </body>
      </html>
    );

    html.contents(r(data));//sets the html to the data.
    html.send(req, res);//sends the html to the client.
    return { failsafe:true }; //tells the server to return a message if none is returned.
  });
  async function runner() {
    let host = new Host();//creates a new host.
    host.hostDir("get", "server", "/");  //this part host the server dir on path /.
    await host.nuxt("./nuxt-edge/api/edge.js", "/nuxt", "/")
    await Server.start(80);//starts the server.
    await runtime.sleep(250);//sleeps for 0.25 seconds.
    runtime.log("Press (CTRL + Q) to pause. Or press (CTRL + E) to end.", "");
    let notFound = <html> <h1>404 - page not found</h1></html>
    //setInterval(function(){Server.notFound(r(notFound))},2000)
    
    //You only need a runner in app.jsx!
  }
  runner();
}
export { main };
