module.exports = async function(Host, Server, Content, runtime, SSR){
   const config = require("./ELECTRO.config.json");
   let host = new Host();
   host.hostDir("get", "server", "/");
   host.hostFile("get", "./readme.md", "/read");
   host.hostAPI("get", "./server/app.jsg", "/api")
   await host.nuxt("./nuxt-edge/api/edge.js", "/nuxt", "/")
   await Server.start(config.port);
   await runtime.sleep(250);
   runtime.log("Press (CTRL + Q) to pause. Or press (CTRL + E) to end.", "");
    
}