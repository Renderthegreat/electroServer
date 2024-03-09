module.exports = async function(Host, Server, Content, runtime, SSR){
   let host = new Host();//creates a new host.
   host.hostDir("get", "server", "/");  //this part host the server dir on path /.
   host.hostFile("get", "./readme.md", "/read");
   host.hostAPI("get", "./server/app.jsg", "/api")
   await host.nuxt("./nuxt-edge/api/edge.js", "/nuxt", "/")
   await Server.start(80);//starts the server.
   await runtime.sleep(250);//sleeps for 0.25 seconds.
   runtime.log("Press (CTRL + Q) to pause. Or press (CTRL + E) to end.", "");
    
}