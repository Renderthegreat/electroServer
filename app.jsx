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
    const hoster = await require("./host.composable.js")
    hoster(Host, Server, Content, runtime, SSR);
  }
  runner();
}
export { main };
