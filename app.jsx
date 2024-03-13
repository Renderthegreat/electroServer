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
  color: orange;
  animation: color-change 5s infinite;
}

@keyframes color-change {
  0% {
    color: orange;
  }
  10% {
    color: red;
  }
  90% {
    color: blue;
  }
  100% {
    color: orange;
  }
}`;

function main(Server, Content, Host, runtime, SSR) {
  let example = Server.create("get", "/example", async (req, res) => {
    let html = new Content("text/html");
    clicks++;
    let pluralMarker;
    if (clicks == 1) {
      pluralMarker = "";
    } else {
      pluralMarker = "s";
    }
    let data = 
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
    

    html.contents(r(data));
    html.send(req, res);
    return { failsafe:true };
  });
  async function runner() {
    const host = await require("./host.composable.js")
    host(Host, Server, Content, runtime, SSR);
  }
  runner();
}
export { main };
