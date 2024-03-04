/**
 * @author renderlabs::cloud
 * @copyright (c) [2024] [RENDERLABS]
 * @license MIT
 *
 * You are required to keep this header intact until modified by you.
 * You are permitted to use this code.
 */


const { h } = require("preact");
const { render } = require("preact-render-to-string");
const r = render;
let clicks = 0;
let styles = `h1 {
  color: red;
}`;
function main(Server, Content, Host, runtime) {
  let example = Server.create("get", "/plugin", async (req, res) => {
    let html = new Content("text/html");
    clicks++;
    let pluralMarker;
    if (clicks == 1) {
      pluralMarker = ". Congratulations! You have created your first plugin";
    } else {
      pluralMarker = "s";
    }
    let data = (
      <html>
        <body>
          <div>
            <h1>
              This example plugin page has {clicks} view{pluralMarker}.
            </h1>
          </div>
          <style>{styles}</style>
        </body>
      </html>
    );

    html.contents(r(data));
    html.send(req, res);
    
    return { failSafe: true }; //tells the server to return a message if none is returned.
  });
}
export { main }
