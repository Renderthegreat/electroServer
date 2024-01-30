/**
 * @author renderlabs::cloud
 * @copyright (c) [2024] [RENDERLABS]
 * @license MIT
 *
 * You are required to keep this header intact.
 * You are permitted to use this code.
 */

//██████▛█▛█▜▛▛▛▛▛▛▛▛███████████▜▜▜▜▜▜▜▜▛█▜▛█▜▛█▛████████████
//█▙█▟▙█▟▛▙█▜▜▟▛█▜▛▛▛█▜█▟████▜▛██▜▜▜▛█▜▛▛▛▛▛▛▛█▜▙██▟▙█▟▙█▙█▜▟█
//▙█▜▙█▜▟█▜▜▛█▚█▜▙▛▛▛▙▛█▛▀▙▜▞▙▜▜▟▜▛█▟▜▙█▜▛█▜▛█▜▛█▟▙█▟▛▙█▙█████
//█▜▛█▟█▜▟█▜▜▙█▚█▞▛▛▛▙▛▛▛▜▐▚▚▚▙▚▌█▟▙▜▙▙▛▛▛▛▛▛▛▛▛▙█▟▙█▜█▜▛▙█▟▛█
//█▛█▛█▟█▜▟█▜▟▟█▞▛▛▛▛▙▛▛▟▜▜▌▙▛▌▙▜▚▙▜▙▙▙▛▛▛█▜▛█▛█▜▟▙█▟█▛███▜▛██
//▙█▛█▜▜▟█▙▛▛▙▙▙▛▛▛▛▛▙▛▛▟▐▞▟▐▐▐▐▟▜▟▜▟▟▟▜▜▛▙▛█▙█▜▛▙█▟▛▙▛█▟▛████
//█▙█▛██▜▟▟▜▛▙▙▙▛▛▛▛▛▙▜▜▚▌▛▟▐▚▜▐▟▜▟▜▟▟▟▜▜▜▜▜▙▙▛▛█▜▙▛█▛▙▟▛██▟▙█
//▙▛▙██▟█▜▟▛▛▙▛▟▜▜▜▜▜▟▜▜▜▞▙▚▌▙▚▜▟▜▟▜▟▟▟▜▛▛█▜▟▟▜▛█▜▙█▛█▜▚██▟▛██
//▛█▛▙█▟▜▛▙█▜▙▛▛▛▛▛▛▙▜▜▚▛▞▞▌▌▌▌▌▞▌▛▙▙▙▜▙▛▛▙▛▙▛█▜▜█▟▙█▜▛█▜▟▛█▛█
//█▜▛█▟▜▛█▜▟▜▟▜▜▜▜▟▜▟▜▐▚▚▚▚▚▝▖▞▞▞▞▞▖▌▛▙▙▛█▜▜▜▜▙██▟▙█▟████▛█▛██
//█▜▛█▟█▜▛█▟█▟▜▜▜▙▜▐▐▐▞▞▌▙▚▘▙▚▝▞▐▝▖▚▚▝▖▌█▚█▜▛█▟▙▙▙█▟▜▟▟▙▙█▛█▛█
//▛█▜▛▙█▜▛▙█▟▟▜▜▙▌▌▌▌▌▌▌▌▌▙▀▖▌▌▌▌▚▚▘▖▘▖▞▟▜▟▜▟▙▙▙█▟▙▛█▜▙█▛▟█▛██
//█▜▛█▜▟▛█▜▟▟▟▜▙▙▚▚▚▚▚▚▚▀▞▞▞▞▟▐▗▘▌▖▚▐▝▞▞▞▛▟▛▙▛▟▙▙█▟▜▛█▙▛█▛▙███
//█▜▛█▜▛█▜▜▟▙▛▙▙▜▌▙▚▚▚▚▚▚▚▚▚▜▞▞▞▞▖▚▘▚▚▙▚▚▛▙▛▙█▙▙▙▙█▜█▙█▜▛▟██▟█
//█▜▛█▜▛▛█▛▙▙▛▙▛▙▛▞▌▌▌▞▞▞▞▞▞▙▚▜▐▗▚▙█▟█▟▟██▙█▌▌▟▝▞▜██▙█▟▙█▛▙█▙█
//▛█▜▛█▜▛▙██▟█▙▛▙▜▞▞▙▙▙███▟████████████████▄▞█▖▜ ▌▗█▟▛█▟▙██▙██
//█▜▛█▜▛█▜▟▛█▟██▛██▛████▛███▙█████▛▟█▛▛▙▞▛▛█▜▖▀▖▙▜▛▙▛█▙▛▛▙█▟▛█
//█▛█▜▛█▜█▛███▙████▟██▛████▟██▜▟▛▀▞▛███▜▙▙█▛▛▛▛█▟▛█▜▛▙▛██▛█▜██
//▙██▜▛█▜█▟██▜█▜███████████▛▙█▛▞▞▝▞▐▐▟██▛█▙▛▛▛▛▙▙█▜▛█▜█▜▟█▛█▙█
//█▙█▜█▜█▟█▙██▟██▙█▙██▜█▞█▟██▜██▙▙▟▞▖▙█▛█▙█▞▛█▜▛▟▜▜▜▜█▟██▟█▛██
//▙█▟█▜▛▛▛▟█▟▟██▟▛██▛██▟███▜██▛███▛▖▘█▟▜█▟▙▛█▙▛█▜████▟█▟▙█▙███
//█▜▜▟█▜███▛▟█▟████▟████████▙███▛▛▄▝▝▞▟▜▟▙▙▛▙▙█▜█▟▟▟▟▙▛▙█▙█▛▙█
//████▟█▙████▛█▜▙▙▛▛██▟█▜▛█████▙▛▖▖▌▚▐▛█▟▟▟▜█▟▜█▟▜▜▛█▜██▜▟████
//█▟▙▛█▟█▟▙▛▙█▜█▟▙▛███▛████▟█▟▞▛▞▝▞▄▙█▛▙█▟▜▜▟▜█▟▜█▛█▛█▙███▙█▜█
//█████▙█▙█████▟▙▙███████▟▙█▟▙▙▙▙██████▙▙█████▟██▙████▟█▟▙████

/*
 ██████╗██╗      ██████╗ ██╗   ██╗██████╗       ██╗      █████╗ ██████╗ ███████╗
██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗██╗██╗██║     ██╔══██╗██╔══██╗██╔════╝
██║     ██║     ██║   ██║██║   ██║██║  ██║╚═╝╚═╝██║     ███████║██████╔╝███████╗
██║     ██║     ██║   ██║██║   ██║██║  ██║██╗██╗██║     ██╔══██║██╔══██╗╚════██║
╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝╚═╝╚═╝███████╗██║  ██║██████╔╝███████║
 ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝       ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
*/

buildingBlocks();

console.time("║uptime");
const apps = {};
let catcher = [];
let result;
let complete = false;
let frozen = false;
let permafreeze = false;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const express = require("express");
const build = {};
const imports = {app:'./app.jsx'};
const pegio = ["app.pegio"];
let pegioData = {};
async function buildingBlocks() {
  const builder = require("./builderman.js");
  await builder.compile("filter.jsx", "build/filter.js");
  await sleep(1000);

  build.filter = await require("./build/filter.js");
  let i = 0;
  for (impo in imports) {
    i++;
    console.log(imports[impo],impo)
    //build[impo] = await require(imports[impo]);
    await builder.compile(imports[impo], `build/${impo}.js`);
    await sleep(1000);
    console.log(
      `║ ${i} of ${
        Object.keys(imports).length
      } imported and compiled: ${impo}.`,
    );
  }
  for (peg in pegio) {
    let data = await fs.promises.readFile(pegio[peg], "utf8");
    pegioData[peg] = data;
  }

  //SERVER PROCESS HERE!!!
  class myServerProcess {
    constructor(name) {
      this.name = name;
    }
    async main() {
      console.log("[Cloud::Labs Server Function] {(Press CTRL + C) to quit}");
      //await start()
      await runtime.run();
      await catcherComplete("end1").then(() => this.end());
    }
    end() {
      console.log("[All processes complete.]");
    }
  }
  const myProcess = new Process(new myServerProcess("myServer"));
  myProcess.start();
}
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

async function detectAsyncExe() {
  return [true];
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
        myServer.create(type, `${dirPath}/${file}`, hfile);
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
    this.Function();
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
      if (result.failSafe) {
        try {
          res.send(
            "Request did not return anything. Please check your function.",
          );
          console.log("\x1b[37m  ║║╠═\x1b[31mRequest incomplete.");
        } catch (e) {}
      }
      console.log("\x1b[37m  ║║╠═\x1b[38;5;10mRequest complete.");
    });
  }

  remove(path) {
    let index = this.paths.indexOf(path);
    if (index > -1) {
      this.paths.splice(index, 1);
      console.log(apps[this.name]._router.stack);
      apps[this.name]._router.stack.splice(index + 4, 1);
    } else {
      console.log(
        `\x1b[37m  ║╠═\x1b[31mThe path ${path} does not exist in the server.`,
      );
    }
  }
  async start(port) {
    if (await detectAsyncExe()) {
      console.log("  ╔╦═\x1b[36m[Server Function] \x1b[0m");
      apps[this.name].listen(port, () => {
        console.log(
          `\x1b[37m  ║╠╦═\x1b[38;5;13m[Running on port: ${port}]\n  \x1b[37m║║╠═\x1b[38;5;6mServer running...`,
        );
      });
      apps[this.name].use(this.status);
    } else {
      console.log("\x1b[37m  ║║╠═\x1b[38;5;10mUse await to start the server.");
    }
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "q" && this.active) {
        permafreeze = !permafreeze;

        this.paused = !this.paused;
        this.repause();
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
      let html = build.filter.rss(req, res, next);
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
let myServer = new Server(async (req, res) => {}, "myServer");
const runtime = new ServerRuntime(apps["myServer"], myServer);
runtime.Function = async () => {
  
  eval(pegioData[0])
  while (!complete) {
    await runtime.sleep(1000);
  }
  
  myServer.end();
  catcher.push("end1");
};

