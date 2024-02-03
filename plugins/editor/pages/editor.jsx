/**
 * @author renderlabs::cloud
 * @copyright (c) [2024] [RENDERLABS]
 * @license MIT
 *
 * You are required to keep this header intact.
 * You are permitted to use this code.
 */
const { h } = require("preact");
const { render } = require("preact-render-to-string");
const r = render;
const path = require("path");
const fs = require("fs");
let clicks = 0;
let styles = `h1 {
  color: red;
}`;
let enabled = true;
function main(key, Server, Content, Host, runtime) {
  let host = new Host();
  Server.create("get", `/editor/pages/${key}/files`, async (req, res) => {
    if (!enabled) return { failSafe: true };
    let json = new Content("text/json");
    const dirO =
      __dirname.replace("plugins/editor/build/pages", "") + "server/";
    let data = {};
    let file;
    function scanDir(dir) {
      let files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          scanDir(filePath);
        }
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
          const filePath = path.join(dir, file);
          data[filePath] = filePath.replace(dirO, "");
          const stat = fs.statSync(filePath);
        });
      });
    }
    scanDir(dirO);
    json.contents(data);
    json.send(req, res);
    return { failSafe: true };
  });
  /*Server.create("get", `/editor/pages/${key}/`, async (req, res) => {
    let html = new Content("text/html");
    let data = await fs.promises.readFile(__dirname+'/editor/index.html','utf8')
    html.contents(data)
    html.send(req, res)
    return {failSafe:true}
  });*/
  host.hostDir("get", __dirname + "/editor", `editor/pages/${key}`);
  
  //console.log(__dirname.replace( 'plugins/editor/build/pages','')+'server/')
  Server.create("get", `/editor/pages/${key}/edit`, async (req, res) => {
    if (!enabled) {
      
      let html = new Content("text/html");
      let data = (
        <html>
          <body>
            <h1>Connection closed.</h1>
          </body>
          <style>
            {`h1 {
            color: red;
            font: 'Times New Roman', Times, serif;
          }
          body{
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f1f1f1;
          }`}
          </style>
        </html>
      );
      html.contents(r(data));
      html.send(req, res);
      return { failSafe: true };
    } else {
      let html = new Content("text/html");
      let data;

      try {
        data = await fs.promises.readFile(
          __dirname.replace("plugins/editor/build/pages", "") +
            `server/${req.query.file}`,
          "utf8",
        );
      } catch (error) {
        runtime.log("\x1b[31m", "file not found");
      }
      let file = req.query.file;
      data = (
        <html>
          <body>
            <a href={req.path + `../`}>{"<-"} back</a>
            <h1>Editing {file}</h1>
            <br />
            <form action={`api/modify`}>
              <label for="fileData">File data:</label>
              <textarea
                style="width = 90%; height = 90%;"
                id="fileData"
                name="data"
                value={data}
              ></textarea>
              <textarea readonly id="fileName" name="file">
                {file}
              </textarea>
              <button type="submit">Update</button>
            </form>
            <script src="main.js"></script>
          </body>
          <style>
            {`button{
              background-color: #4CAF50;
              border: none;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              cursor: pointer;
            }
            textarea{
                width: 100%;
                height: 300px;
                padding: 12px 20px;
                box-sizing: border-box;
                border: 2px solid #ccc;
                border-radius: 4px;
                background-color: #f8f8f8;
                font-size: 16px;
                resize: none;
            }
            body{
                font-family: Arial, Helvetica, sans-serif;
                background-color: #f1f1f1;
            }
            a{
                text-decoration: none;
                color: #4CAF50;
            }
            li{
                
            }
            h1 {
            
                font-size: 2.5em;
                margin: 0.67em 0;
                font: 'Times New Roman', Times, serif;
            }
            #fileName {
                height: 20px;
                width: 200px;
            }
`}
          </style>
        </html>
      );
      html.contents(r(data));
      html.send(req, res);

      return { failSafe: true };
    }
  });
  Server.create(
    "get",
    `/editor/pages/${key}/edit/api/modify`,
    async (req, res) => {
      if (!enabled) return { failSafe: true };
      try {
        await fs.promises.writeFile(
          __dirname.replace("plugins/editor/build/pages", "") +
            `server/${req.query.file}`,
          req.query.data,
        );
      } catch (error) {
        console.log(error);
      }

      return { failSafe: true };
    },
  );
  Server.create(
    "get",
    `/editor/pages/${key}/edit/api/new`,
    async (req, res) => {
      if (!enabled) return { failSafe: true };
      try {
        await fs.promises.writeFile(
          __dirname.replace("plugins/editor/build/pages", "") +
            `server/${req.query.file}`,
          "",
        );
      } catch (error) {}

      res.send("done");
      return { failSafe: true };
    },
  );
  Server.create(
    "get",
    `/editor/pages/${key}/edit/api/end`,
    async (req, res) => {
      enabled = false;

      return { failSafe: false };
    },
  );
}
module.exports.main = main;
