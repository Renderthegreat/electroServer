/**
 * @author renderlabs::cloud
 * @copyright (c) [2024] [RENDERLABS]
 * @license MIT
 *
 * You are required to keep this header intact.
 * You are permitted to use this code.
 */

let twoAuth = true // WARNING KEEP THIS ENABLED FOR SECURITY


const { h } = require("preact");
const { render } = require("preact-render-to-string");
const r = render;
const fs = require("fs");
let clicks = 0;
const jwt = require("jsonwebtoken");
let styles = `h1 {
  color: red;
}`;

function main(Server, Content, Host, runtime) {
  let example = Server.create("get", "/editor/login", async (req, res) => {
    let html = new Content("text/html");
    let data = (
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Login Page</title>
        </head>
        <body>
          <form id="loginForm" action="/editor/login/api/">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
              <br />
            </input>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
              <br />
            </input>
            <button type="submit">Login</button>
          </form>

          <script></script>
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
    return { failSafe: true }; //tells the server to return a message if none is returned.
  });
  let loginAPI = Server.create(
    "get",
    "/editor/login/api/",
    async (req, res) => {
      let creds = await fs.promises.readFile(
        __dirname + "/../userCreds.json",
        "utf-8",
      );
      creds = JSON.parse(creds);
      let users = creds.users;
      let jwtSecret = await fs.promises.readFile(
        __dirname + "/../jwt.secret",
        "utf-8",
      );
      if (jwtSecret == "") {
        jwtSecret =
          "KEEP-THIS-CODE-A-SECRET-DO-NOT-SHARE-THIS-CODE-WITH-ANYONE-YOU-COULD-GET-A-HACKER-TO-STEAL-YOUR-CREDENTIALS-AND-POSSIBLY-INSTALL-MALWARE-ON-YOUR-COMPUTER";
        for (let i = 0; i < 256; i++) {
          jwtSecret += Math.random().toString(36).substr(2, 1);
        }
        await fs.promises.writeFile(__dirname + "/../jwt.secret", jwtSecret);
      }
      for (let user in users) {
        let username = users[user].username;
        let password = users[user].password;
        let power = users[user].power;
        if (username == req.query.username && password == req.query.password) {
          let key = jwt.sign({ username: username, power: power }, jwtSecret, {
            expiresIn: "1h",
          });
          let html = new Content("text/html");
          let data = (
            <html>
              <h1>We need to make sure its really you</h1>
              <a href={`/editor/validate/key?key=${key}`}>Validate.</a>
              <script>
                {`
          localStorage.setItem("token",${key})
          `}
              </script>
            </html>
          );
          html.contents(r(data));
          html.send(req, res);
          return { failSafe: true };
        }
      }
      return { failSafe: true };
    },
  );
  let validate = Server.create(
    "get",
    "/editor/validate/key",
    async (req, res) => {
      let key = req.query.key;
      let data;
      let allTheGreatThings = false;
      let host = new Host();
      
      try {
        jwt.decode(key);

        if (await fs.promises.readFile(__dirname + "/../rsat.txt", "utf-8")) {
          if (
            (await fs.promises.readFile(__dirname + "/../rsat.txt", "utf-8")) ==
            key.replace("/?key=", "")||!twoAuth
          ) {
            data = (
              <html>
                <h1>Validation complete</h1>
                <h2>
                  editor open at{" "}
                  <a href={`../../../../editor/pages/${key}/`}>LINK</a>
                </h2>
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
            allTheGreatThings = true;
          } else {
            data = (
              <html>
                {" "}
                <h1>Add the key {key} to /plugins/editor/rsat.txt </h1>
                <a href={`${req.url}`}>refresh</a>
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
            runtime.log("\x1b[31m", "key is not rsat key");
          }
        } else {
          data = (
            <html>
              {" "}
              <h1>Add the key {key} to /plugins/editor/rsat.txt </h1>
              <a href={`${req.url}`}>refresh</a>
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
        }
      } catch (e) {
        data = (
          <html>
            {" "}
            <h1>Add the key {key} to /plugins/editor/rsat.txt </h1>
            <a href={`${req.url}`}>retry</a>
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
      }
      let html = new Content("text/html");
      html.contents(r(data));
      html.send(req, res);
      const editor = require("./pages/editor.jsx");
      editor.main(key, Server, Content, Host, runtime);
      return { failSafe: true };
    },
  );
}
export { main }
