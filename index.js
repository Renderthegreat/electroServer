/**
 * @author renderlabs::cloud
 * @copyright (c) [2024] [RENDERLABS]
 * @license MIT
 *
 * You are required to keep this header intact.
 * You are permitted to use this code.
 */

console.log(" ║\x1b[31m[buildingBlocks]\x1b[38;5;39m Starting up...\x1b[37m");
console.time("║uptime");
const config = require("./ELECTRO.config.json");
var globe = {
  timers: {}
}
function debug(message) {
  console.log("  ║║╠═$ debug point reached "+ message)
}
//CONFIGURATION
const throwErrorOnNoFailSafe = true;
const fileLogging = config.logging.enabled;
const JSXConfig = require("./JSX.config.json");
const imports = { ...JSXConfig.imports };
const outputs = { ...JSXConfig.exports };
let plugins = config.plugins
plugins.autoInstall = config.pluginAutoInstall



const fs = require("fs");
const apps = {};
let catcher = [];
let result;
let complete = false;
let frozen = false;
let permafreeze = false;
var run = "<pending>";
var SSR = "<pending>";
const readline = { emitKeypressEvents: require("readline").emitKeypressEvents };
const path = { join: require("path").join };
const mime = require("mime-types");
const express = require("express");
const builder = require(config.builderman);
const includer = require(config.includer);
const SSRJSON = require("./SSRReplacements.config.json")

const build = {};
const pegio = [config.pegio];
let pegioData = {};
let updateTimeout = 0;
fs.promises.writeFile(config.consoleFile, "")
const log = console.log
function print(text){
  log(text)
  fs.appendFileSync(config.consoleFile, text + '\n')
}
console.log = print
async function fileLog(file, data) {
  if (fileLogging) {
    logs = await fs.promises.readFile(file, "utf8");
    logs = logs + "\n" + data;
    await fs.promises.writeFile(file, logs);
  }
}
console.log(" ║\x1b[31m[buildingBlocks] \x1b[38;5;39mBuilding...\x1b[37m");
console.log("╔╝");
console.log("╠═\x1b[38;5;197m[starting]...\x1b[37m");
buildingBlocks();
async function buildingBlocks() {
  
  console.log("║═\x1b[38;5;118m$\x1b[36;5;118m builderman.js loaded\x1b[37m")
  await builder.compile("filter.jsx", "build/filter.jsx");
  console.log("║═\x1b[38;5;118m$\x1b[36;5;118m filter.jsx compiled\x1b[37m")
  build.filter = require(config.filter);
  let i = 0;
  for (impo in imports) {
    i++;
    await builder.compile(imports[impo], `build/${impo}.jsx`);
    outputs[impo] = `./build/${impo}.jsx`
    console.log(
      `║ \x1b[38;5;209m${i} \x1b[38;5;6mof \x1b[38;5;209m${
        Object.keys(imports).length
      } \x1b[38;5;10mImported and compiled:	\x1b[38;5;38m'${impo}'\x1b[37m`,
    );
  }
  i = 0;
  fs.readdirSync("./plugins").forEach(async (plugin) => {
    let jsonData = fs.readFileSync(`plugins/${plugin}/plugin.json`, "utf8");
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
      fs.readdirSync("plugins").forEach(async (plugin) => {
        let jsonData = fs.readFileSync(`plugins/${plugin}/plugin.json`, "utf8");
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
            allFiles[file].includes(".jsx") && !config.pluginLazyLoader
          ) {
            builder.compile(
              plugin + allFiles[file],
              `plugins/${pluginName}/build/${allFiles[file]}`,
            );
            i2++;
          }
        }
        outputs[item] = `./plugins/${pluginName}/build/${allFiles[file]}`
        if(!config.pluginLazyLoader) console.log(
          `║ \x1b[38;5;209m${i} \x1b[38;5;6mof \x1b[38;5;209m${
            Object.keys(plugins).length
          } \x1b[38;5;10mPlugins imported and compiled:	\x1b[38;5;38m'${pluginLooseName}'\x1b[37m `,
        );
      }
    }
  });
  for (peg in pegio) {
    let data = await fs.promises.readFile(pegio[peg], "utf8");
    pegioData[peg] = data;
  }
  //build[impo] = await require(`./build/${impo}.jsx`);
  class WebServerProcess {
    constructor(name) {
      this.name = name;
    }
    async main() {
      console.log("║\x1b[31m[buildingBlocks] \x1b[33mc\x1b[32mo\x1b[36mm\x1b[34mp\x1b[35ml\x1b[31me\x1b[33mt\x1b[34me\x1b[35]!\x1b[37m");
      console.log(
        "╚═╗[Cloud::Labs Server Function] {(Press CTRL + C) to quit}",
      );
      await Runtime.run();
      await catcherComplete("end1").then(() => this.end());
    }
    end() {
      console.log("[All processes complete.]");
      process.exit(0);
    }
  }
  const mainProcess = new Process(new WebServerProcess("myServer"));
  mainProcess.start();
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
globe.time = async (name) => {
  globe.timers[name] = Math.floor(performance.now()*10)/10
}
globe.timeEnd = async (name) => {
  const startTime = globe.timers[name];
  if (startTime) {
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    delete globe.timers[name];
    return Math.floor(elapsedTime*10)/10
  } else {
    console.log(`Request timer '${name}' not found.`);
  }
  
}
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

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
  async hostFile(type, dir, asDir){
    console.log(
      `  ╠═\x1b[38;5;209m[hosting]: \x1b[38;5;6m${dir} \x1b[38;5;10m=> \x1b[38;5;38m${
        asDir
      } \x1b[37m`,
    );
    
    const data = await fs.promises.readFile(dir, "utf8")
    run.create(type, asDir, async (req, res)=>{
    let content = new Content(mime.lookup(dir))
    content.contents(data)
    content.send(req, res)
    return { failsafe:true }
    }
  )}
  async hostAPI(type, dir, asDir){
    console.log(
      `  ╠═\x1b[38;5;209m[hosting]: \x1b[38;5;6m${dir} \x1b[38;5;10m=> \x1b[38;5;38m${
        asDir
      } \x1b[37m`,
    );
    
    const data = await require(dir)
    
    run.create(type, asDir, async (req, res)=>{
      let g = await data(req)
      let content = new Content(g.contentType)
      content.contents(g._G())
      content.send(req, res)
      return { failsafe:true }
    })
  }
  hostDir(type, dir, asDir) {
    let asDirPath;
    let dirPath = path.join("/", dir);
    if (asDir != "/") {
      asDirPath = path.join("/", asDir);
    } else {
      asDirPath = "";
    }
    let plusDir = [
      dirPath.split("/")[2] || undefined,
      dirPath.split("/")[3] || undefined,
      dirPath.split("/")[4] || undefined,
      dirPath.split("/")[5] || undefined,
      dirPath.split("/")[6] ? "..." : undefined,
    ];
    for (let sub in plusDir) {
      if (typeof plusDir[sub] !== "undefined") {
        plusDir[sub] = plusDir[sub] + "/";
      } else {
        plusDir[sub] = "";
      }
    }
    plusDir = plusDir || "";
    plusDir = plusDir.join("");
    console.log(
      `  ╠═\x1b[38;5;209m[hosting]: \x1b[38;5;6m.${dirPath} \x1b[38;5;10m=> \x1b[38;5;38m${
        asDir + plusDir
      } \x1b[37m`,
    );
    asDirPath = asDirPath
    //dirPath = dirPath.replace(asDir, '');
    const files = fs.readdirSync(dir);
    files.forEach(async (file) => {
      const filePath = path.join(dir, file);
      const asFilePath = path.join(asDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        this.hostDir(type, filePath, asDir);
      } else if (file.endsWith(".html")) {
        let data = await fs.promises.readFile(filePath, "utf8");
        const hfile = async (req, res) => {
          let html = new Content("text/html");
          
          const regex = /#{{\s*(.*?)\s*}}/g;
          const replacedString = data.replace(regex, (match, p1) => {
            const replacement = p1.trim();
            if (SSR[replacement]) {
              return SSR[replacement];
            } else {
              return match;
            }
          });
          data = replacedString;
          html.contents(replacedString);
          html.send(req, res);
          return { failSafe: true };
        };

        run.create(type, `${asDir + plusDir + file}`, hfile);
        if (file === "index.html") {
          run.create(type, `${asDir + plusDir}/`, hfile);
        }
      } else if (file.endsWith(".js")) {
        let data = await fs.promises.readFile(filePath, "utf8");
        const hfile = async (req, res) => {
          let js = new Content("text/javascript");
          
          const regex = /#{{\s*(.*?)\s*}}/g;
          const replacedString = data.replace(regex, (match, p1) => {
            const replacement = p1.trim();
            if (SSR[replacement]) {
              return SSR[replacement];
            } else {
              return match;
            }
          });
          data = replacedString;
          js.contents(data);
          js.send(req, res);
          return { failSafe: true };
        };
        run.create(type, `${asDir + plusDir + file}`, hfile);
      } else if (file.endsWith(".css")) {
        let data = await fs.promises.readFile(filePath, "utf8");
        const hfile = async (req, res) => {
          let css = new Content("text/css");
          
          const regex = /#{{\s*(.*?)\s*}}/g;
          const replacedString = data.replace(regex, (match, p1) => {
            const replacement = p1.trim();
            if (SSR[replacement]) {
              return SSR[replacement];
            } else {
              return match;
            }
          });
          data = replacedString;
          css.contents(data);
          css.send(req, res);
          return { failSafe: true };
        };
        run.create(type, `${asDirPath}/${file}`, hfile);
      } else if (file.endsWith(".jsg")){
        let data = require("./"+filePath);
        const hfile = async (req, res) => {
          
          let g = await data(req)
          let content = new Content(g.contentType);
          
          content.contents(g._G());
          content.send(req, res);
          return { failSafe: true };
        }
        run.create(type, `${asDir + plusDir + file}`, hfile);
      } else {
        let data;
        const hfile = async (req, res) => {
          let content = new Content(mime.lookup(file) || "text/plain");
          const fileSize = fs.statSync(filePath).size;
          let data = Buffer.alloc(fileSize);
          fs.readSync(fs.openSync(filePath, 'r'), data, 0, fileSize, 0);
          let nonBinData = await fs.promises.readFile(filePath, "utf8");

          try {
            const regex = /#{{\s*(.*?)\s*}}/g;
            const replacedString = data.replace(regex, (match, p1) => {
              const replacement = p1.trim();
              if (SSR[replacement]) {
                return SSR[replacement];
              } else {
                return match;
              }
            });
            data = replacedString;
          } catch (err) {
            console.log(
              "  ║║╠═\x1b[38;5;209m[hosting] \x1b[33;5;196mWarn: \x1b[38;5;6mFile data is invalid or it is binary. (Not failure)\x1b[37m",
            );
          }

          
          res.setHeader('Content-Type', content.type);
          content.contents(data);
          content.send(req, res);
          return { failSafe: true };
        };
        run.create(type, `${asDir + plusDir + file}`, hfile);
      }
    });
  }
  async nuxt(dir, asDir, paths){
    const nEdge = await import(dir);
    for (let path in paths){
      
      const ndata = async (req, res) => {
        let content = new Content(mime.lookup(path) || "text/plain")
        content.contents(await nEdge.default(req, res, asDir))
        
        content.send(req, res)
        return { failSafe: true };
      }
      run.create("get", `${asDir}/${paths[path]}`, ndata);
    }
    console.log(
      `  \x1b[37m╠═\x1b[38;5;209m[nuxt]: \x1b[38;5;6m${dir} \x1b[38;5;10m=> \x1b[38;5;38m${asDir}\x1b[37m`
    );
     await nEdge.start()
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
    if(this.handler){
      try{
        await this.Function();
      }
      catch(err){
        this.handler(err);
      }
    }
    else{
      await this.Function();
    }
    
  }
  handle(handler){
    this.handler = handler;
  }
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  log(msg, color) {
    console.log(`\x1b[37m  ║║╠═${color}${msg}`);
  }
}
class ssr {
  constructor() {}
  add(name, data) {
    SSR[name] = data;
  }
  set(name, data) {
    SSR[name] = data;
  }
  get(name) {
    return SSR[name];
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
    let fails = false;
    apps[this.name].use(this.status);
    this.paths.push(path);
    apps[this.name][type](path, async (req, res) => {
      if (!permafreeze) {
        console.log("\x1b[37m  ║║╠═\x1b[38;5;214mNew request.\x1b[37m");
        
      }
      
      req.random = Math.random().toString().replace(".", "").toString()
      globe.time(req.random)
      //debug("request start")
      result = await func(req, res);
      //debug("request end ")
      try {
        if (result !== undefined) {
        } else {
          throw "║║═\x1b[31mx \x1b[32mNo response data.";
        }
      } catch (err) {
        fails = true;
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
        } ${req.url.split(32)} in ${ await globe.timeEnd(req.random)}s`,
      );
      fileLog(config.logging.file, `New request: ${req.method} ${req.url} ${req.ip}`);
      if (fails) {
        //throw ( "║║═\x1b[31mx \x1b[32mFailSafe was not created.");
      }
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
const WebServer = new Server(async (req, res) => {}, "WebServer");
const Runtime = new ServerRuntime(apps["WebServer"], WebServer);
SSR = new ssr();
for(let text of Object.keys(SSRJSON)){
  SSR.add(text, SSRJSON[text])
}
run = WebServer;
Runtime.Function = async () => {
  const loadPegio = eval(pegioData[0]);
  const includes = Object.values(outputs)
  includer(include, includes, Host, WebServer, Content, Runtime, SSR)
  await waitForCompletion();
  WebServer.end();
  catcher.push("end1");
};
