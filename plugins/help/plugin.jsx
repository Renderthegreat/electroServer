const { h } = require("preact");
const { render } = require("preact-render-to-string");
const r = render;
let clicks = 0;
let styles = `h1 {
  color: red;
}`;
function main(Server, Content, Host, runtime) {
  let help = Server.create("get", "/help", async (req, res) => {
    let html = new Content("text/html");
    const data = 
    <html>
      <body>
        <h1>Need help?</h1>
        <a href='help/utsp'>Using the server program</a><br/>
        <a href='help/cap'>Create a plugin</a><br/>
        <a href='help/utep'>Using the editor program</a><br/>
        <a>Create a page</a><br/>
        <a>Make an app.jsx and filter.jsx file.</a><br/>
      </body>
          
    </html>
    html.contents(r(data));
    html.send(req, res);

    return { failSafe: true }; 
  });
  let utsp = Server.create("get", "/help/utsp", async (req, res) =>{
    let html = new Content("text/html");
    let data = <html>
      <body>
        <h1>Using the server program</h1>
        <p>To use the server program, you must have node.js installed. To install node.js, go to <a href='https://nodejs.org/en/'>https://nodejs.org/en/</a> and download the latest version.</p>
        <p>Once you have node.js installed, you can install the server program by typing <code>curl https://github.com/Renderthegreat/Nexus.Server.js.git</code> in your terminal. Then, type <code>cd Nexus.Server.js</code> all the dependecies will be installed. To start the server, type <code>node index.js</code>. To stop the server, type <code>ctrl + c</code>.</p>
      </body>
    </html>
    html.contents(r(data));
    html.send(req, res);
    return { failSafe: true };
  });
  let cap = Server.create("get", "/help/cap", async (req, res) =>{
    let html = new Content("text/html");
    let data = <html>
      <body>
        <h1>Create a plugin</h1>
        <p>To create a plugin, First you should clone the example plugin by coping the folder. Next you should change the name of the folder to your plugin name. After that you should change the plugin.json file of the plugin to fit your plugin. Then you should change the plugin.jsx file to fit your plugin. Finally you should create the build/plugin.jsx and add your extension in index.js</p>
        <p>Creating a plugin is like creating app.jsx.</p>
        </body>
    </html>
    html.contents(r(data));
    html.send(req, res);
    return { failSafe: true };
  });
  let utep = Server.create("get", "/help/utep", async (req, res) =>{
    let html = new Content("text/html");
    let data = <html>
      <body>
        <h1>Using the editor program</h1>
        <p>To use the editor program, you must first enable it this can be done by going to the plugins/editor/plugin.json file and changing the enabled value to true. After that you can go https://localhost:80/editor/login and create a new page after following the verification steps.</p>
      </body>
    </html>
    html.contents(r(data));
    html.send(req, res);
    return { failSafe: true };
  });
}
export { main }
