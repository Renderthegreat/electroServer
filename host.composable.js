const fs = require("fs");
const serialize = require('serialize-javascript');
module.exports = async function (Host, Server, Content, runtime, SSR) {
   const config = require("./config/ELECTRO.config.json");
   let host = new Host();
   host.hostDir("get", "server", "/");
   host.hostFile("get", "./readme.md", "/read");
   host.hostAPI("get", "./server/app.jsg", "/api");
   await host.nuxt("./nuxt-edge/api/edge.js", "/nuxt", "/")
   await Server.start(config.port);
   //await Server.init();
   //const serialized = serialize(await Server.Exportable())
   //await fs.writeFile("ServerExport.js", "const meta = " + serialized + "\nconst express = require('express'); const app = express(); app.all('*', (req,res)=>{meta.send(req, res)}); app.listen(3000, ()=>{console.log('Server online')})", "utf8",()=>{})
   await runtime.sleep(250);
   runtime.log("Press (CTRL + Q) to pause. Or press (CTRL + E) to end.", "");
};
