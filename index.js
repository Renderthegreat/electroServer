/**
 * @author renderlabs::cloud
 * @copyright (c) [2024] [RENDERLABS]
 * @license MIT
 *
 * You are required to keep this header intact.
 * You are permitted to use this code.
 */



//CONFIGURATION

const fileLogging = false; //set to true in production
const imports = { app: "./app.jsx" };
let plugins = {};
plugins.autoInstall = true;

/*
 ██████╗██╗      ██████╗ ██╗   ██╗██████╗       ██╗      █████╗ ██████╗ ███████╗
██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╗██╗██║     ██╔══██╗██╔══██╗██╔════╝
██║     ██║     ██║   ██║██║   ██║██║  ██║╚═╝╚═╝██║     ███████║██████╔╝███████╗
██║     ██║     ██║   ██║██║   ██║██║  ██║██╗██╗██║     ██╔══██║██╔══██╗╚════██║
╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚═╝╚═╝███████╗██║  ██║██████╔╝███████║
 ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝       ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
*/
console.log(" 🤖  [buildingBlocks] Starting up...");
console.time("║uptime");
const fs = require("fs");
const apps = {};
let catcher = [];
let result;
let complete = false;
let frozen = false;
let permafreeze = false;

const readline = { emitKeypressEvents : require("readline").emitKeypressEvents }
const path = { join: require("path").join };
const mime = require("mime-types");
const express = require("express");
const build = {};
const pegio = ["app.pegio"];
let pegioData = {};
let updateTimeout = 100;
async function fileLog(file, data) {
  if (fileLogging) {
    logs = await fs.promises.readFile(file, "utf8");
    logs = logs + "\n" + data;
    await fs.promises.writeFile(file, logs);
  }
}
console.log(" 🏗️  [buildingBlocks] Building...");
console.log("╔╝");
console.log("╠═\x1b[38;5;197m[starting]...\x1b[37m");
buildingBlocks();
async function buildingBlocks() {

  const builder = require("./builderman.js");
  await builder.compile("filter.jsx", "build/filter.jsx");
  await sleep(updateTimeout);

  build.filter = await require("./build/filter.jsx");
  let i = 0;
  for (impo in imports) {
    i++;
    await builder.compile(imports[impo], `build/${impo}.jsx`);
    console.log(
      `║ \x1b[38;5;209m${i} \x1b[38;5;6mof \x1b[38;5;209m${
        Object.keys(imports).length
      } \x1b[38;5;10mImported and compiled:	\x1b[38;5;38m'${impo}'\x1b[37m =>`,
    );
  }
  i = 0;
  fs.readdirSync("./plugins").forEach(async (plugin) => {
    let jsonData = await fs.readFileSync(
      `plugins/${plugin}/plugin.json`,
      "utf8",
    );
    jsonData = await JSON.parse(jsonData);
    if (!jsonData.enabled) {
      fs.writeFileSync(
        `plugins/${plugin}/build/plugin.jsx`,
        `function main(Server, Content, Host, runtime) {} \n module.exports.main = main`,
      );
    }
  });
  async function first() {
    if (plugins.autoInstall) {   
      delete plugins.autoInstall;
      await fs.readdirSync("plugins").forEach(async (plugin) => {
        let jsonData = await fs.readFileSync(
          `plugins/${plugin}/plugin.json`,
          "utf8",
        );
        jsonData = await JSON.parse(jsonData);

        if (jsonData.enabled) {
          plugins[jsonData.strictName] = `plugins/${plugin}/`;
        }
      });
    }
  }
  first().then(async () => {
    for (item in plugins) {
      i++;
      let plugin = plugins[item];
      const files = fs.readdirSync(plugin);
      const pluginObject = fs.readFileSync(plugin + "plugin.json", "utf8");
      const pluginData = JSON.parse(pluginObject);
      const pluginName = pluginData.strictName;
      const pluginEnabled = pluginData.enabled;
      const pluginLooseName = pluginData.name;
      const pluginSubfiles = pluginData.subfiles;
      let i2 = 0;
      const allFiles = Object.assign(files, pluginSubfiles);
      if (pluginEnabled) {
        for (file in allFiles) {
          if (
            !allFiles[file].includes("plugin.json") &&
            allFiles[file].includes(".jsx")
          ) {
            builder.compile(
              plugin + allFiles[file],
              `plugins/${pluginName}/build/${allFiles[file]}`,
            );
            i2++;
          }
        }
        console.log(
          `║ \x1b[38;5;209m${i} \x1b[38;5;6mof \x1b[38;5;209m${
            Object.keys(plugins).length
          } \x1b[38;5;10mPlugins imported and compiled:	\x1b[38;5;38m'${pluginLooseName}'\x1b[37m =>`,
        );
      }
    }
  });
  for (peg in pegio) {
    let data = await fs.promises.readFile(pegio[peg], "utf8");
    pegioData[peg] = data;
  }
  //build[impo] = await require(`./build/${impo}.jsx`);

  //SERVER PROCESS HERE!!!
  //Create your own server here! (if you understand it of course)
  class myServerProcess {
    constructor(name) {
      this.name = name;
    }
    async main() {
      console.log("🌩️ [buildingBlocks] complete!");
      console.log(
        "╚═╗[Cloud::Labs Server Function] {(Press CTRL + C) to quit}",
      );
      await runtime.run();
      await catcherComplete("end1").then(() => this.end());
    }
    end() {
      console.log("[All processes complete.]");
      process.exit(0);
    }
  }
  const myProcess = new Process(new myServerProcess("myServer"));
  myProcess.start();
}
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function waitForCompletion() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (complete) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

async function detectAsyncExe() {
  let resd = new Promise((resolve, reject) => {
    resolve(false);
  });
  resd.then((value) => {
    if (resd) {
      return true;
    } else {
      throw new Error("You must use await to start the server");
      return false;
    }
  });
}
async function catcherComplete(pro) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (catcher.includes(pro)) {
        clearInterval(interval);

        resolve(
          "Promise resolved: catcher contains main and there is no timeout",
        );
      }
    }, 1000);
  });
}
class Host {
  constructor() {}
  hostDir(type, dir, asDir) {
    let asDirPath;
    let dirPath = path.join("/", dir);
    if (asDir != "/") {
      asDirPath = path.join("/", asDir);
    } else {
      asDirPath = "";
    }

    //dirPath = dirPath.replace(asDir, '');
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const asFilePath = path.join(asDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        this.hostDir(type, filePath, asDir);
      } else if (file.endsWith(".html")) {
        const hfile = async (req, res) => {
          let html = new Content("text/html");
          let data = await fs.promises.readFile(filePath, "utf8");
          html.contents(data);
          html.send(req, res);
          return { failSafe: true };
        };

        myServer.create(type, `${asDirPath}/${file}`, hfile);
        if (file === "index.html") {
          myServer.create(type, `${asDirPath}/`, hfile);
        }
      } else if (file.endsWith(".js")) {
        const hfile = async (req, res) => {
          let html = new Content("text/javascript");
          let data = await fs.promises.readFile(filePath, "utf8");
          html.contents(data);
          html.send(req, res);
          return { failSafe: true };
        };
        myServer.create(type, `${asDirPath}/${file}`, hfile);
      } else if (file.endsWith(".css")) {
        const hfile = async (req, res) => {
          let html = new Content("text/css");
          let data = await fs.promises.readFile(filePath, "utf8");
          html.contents(data);
          html.send(req, res);
          return { failSafe: true };
        };
        myServer.create(type, `${asDirPath}/${file}`, hfile);
      } else {
        let data;
        const hfile = async (req, res) => {
          let content = new Content(mime.lookup(file) || "text/plain");
          let data = await fs.promises.readFile(filePath, "utf8");

          //data may be binary fix later lol:O
          content.contents(data);
          content.send(req, res);
          return { failSafe: true };
        };

        myServer.create(type, `${asDirPath}/${file}`, hfile);
      }
    });
  }
}
class Process {
  constructor(processServer) {
    this.processServer = processServer;
  }
  async run(section) {
    await this.processServer[section]();
  }
  async start() {
    await this.processServer.main();
  }
}

class Content {
  constructor(type) {
    this.type = type;
    this.content = "";
  }
  contents(cont) {
    this.content = cont;
  }
  send(req, res) {
    res.set("Content-Type", this.type);
    res.send(this.content);
  }
}

class ServerRuntime {
  constructor(app, server) {
    this.app = app;
    this.server = server;
    this.Function = async () => {};
  }
  async run() {
    await this.Function();
  }
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  log(msg, color) {
    console.log(`\x1b[37m  ║║╠═${color}${msg}`);
  }
}

class Server {
  router = express.Router();
  constructor(func, name) {
    permafreeze = false;
    this.paused = false;
    complete = false;
    this.paths = [];
    this.func = func;
    this.name = name;
    apps[this.name] = require("express")();
  }
  create(type, path, func) {
    apps[this.name].use(this.status);
    this.paths.push(path);
    apps[this.name][type](path, async (req, res) => {
      if (!permafreeze) {
        console.log("\x1b[37m  ║║╠═\x1b[38;5;214mNew request.");
      }
      result = await func(req, res);
      try {
        result.failSafe = result.failSafe;
      } catch (err) {
        throw "║║═x FailSafe was not created";
      }
      if (result.failSafe) {
        try {
          res.send(
            "Request did not return anything. Please check your function.",
          );
          console.log("\x1b[37m  ║║╠═\x1b[31mRequest incomplete.");
        } catch (e) {}
      }
      console.log(
        `\x1b[37m  ║║╠═\x1b[38;5;10mRequest complete: ${
          req.method
        } ${req.url.split(32)} `,
      );
      fileLog("server.log", `New request: ${req.method} ${req.url} ${req.ip}`);
    });
  }

  remove(path) {
    let index = this.paths.indexOf(path);
    if (index > -1) {
      this.paths.splice(index, 1);
      //console.log(apps[this.name]._router.stack);
      apps[this.name]._router.stack.splice(index + 4, 1);
    } else {
      console.log(
        `\x1b[37m  ║╠═\x1b[31mThe path ${path} does not exist in the server.`,
      );
    }
  }
  async start(port) {
    console.log("  ╠╦═\x1b[36m[Server Function] \x1b[0m");
    apps[this.name].listen(port, () => {
      console.log(
        `\x1b[37m  ║╠╦═\x1b[38;5;13m[Running on port: ${port}]\n  \x1b[37m║║╠═\x1b[38;5;6mServer running...`,
      );
    });
    apps[this.name].use(this.status);

    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "q" && this.active) {
        permafreeze = !permafreeze;

        this.paused = !this.paused;
        this.repause();
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "d" && this.active) {
        console.log(process.memoryUsage());
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c" && this.active) {
        if (!permafreeze) {
          this.end();
          permafreeze = true;
        }
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "e" && this.active) {
        if (!complete) {
          complete = !false;
        } else {
        }
      } else {
      }
    });
  }
  async status(req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }
  pause() {
    frozen = true;
    console.log("\x1b[37m  ║║╠═\x1b[38;5;44mApp connections paused");
  }
  unpause() {
    frozen = false;
    console.log("\x1b[37m  ║║╠═\x1b[38;5;208mApp connections unpaused");
  }
  paused = false;
  repause() {
    if (this.paused) {
      this.pause();
    } else {
      this.unpause();
    }
  }
  notFound(content) {
    apps[this.name].all("*", async (req, res) => {
      res.status(404).send(content);
    });
  }
  to(type, path, content) {
    return `fetch(location.origin + "/${path}/",  ${type}, ${{
      body: content,
    }})`;
  }
  end() {
    apps[this.name].listen(this.port).close();
    console.log("\x1b[37m  ╠╩╩═\x1b[32;5;214mServer closed.");
    console.log("\x1b[37m  ╠════════════════════════════════╗");
    console.log("  ║\x1b[31m        Process complete.       \x1b[37m║");
    console.log("\x1b[37m  ╠════════════════════════════════╣");
    console.log("  ║\x1b[31m Summary                        \x1b[37m║");
    console.log("\x1b[37m  ╠════════════════════════════════╝");
    console.log("╔═╝");
    console.timeLog("║uptime");
    console.log("║Cloud::Labs by Renderlabs::Cloud");
    console.log("╙───────────────────────────────────");
    delete this.start;
    this.active = false;
  }
  active = true;
}

//APP
const myServer = new Server(async (req, res) => {}, "myServer");
const runtime = new ServerRuntime(apps["myServer"], myServer);

runtime.Function = async () => {
  const loadPegio = eval(pegioData[0]); //loads the pegio file
  include("./build/app.jsx", myServer, Content, Host, runtime); //loads the app
  include(
    "./plugins/example/build/plugin.jsx",
    myServer,
    Content,
    Host,
    runtime,
  ); //loads the plugin example
  include(
    "./plugins/editor/build/plugin.jsx",
    myServer,
    Content,
    Host,
    runtime,
  ); //loads the editor plugin
  include("./plugins/help/build/plugin.jsx", 
    myServer, 
    Content, 
    Host, 
    runtime
  );
  await waitForCompletion();
  myServer.end();
  catcher.push("end1");
};
