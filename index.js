// WARNING: This code is strictly prohibited for distribution under any circumstances. 
// Distribution of this code is expressly forbidden.
// Author: Renderlabs::Cloud
// Date: 1/26/2024
// ----------------------------------------------------------------------------
// This file is part of the Renderlabs::Cloud library.
// Any attempt to modify or distribute this code is a violation and may result in legal action.
// ----------------------------------------------------------------------------

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

const apps = {}
let catcher = []
let result;
let frozen = false;
let permafreeze = false;
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

async function detectAsyncExe(){
  return [true]
}
async function catcherComplete(pro) {
  return new Promise((resolve, reject) => {
   const interval = setInterval(() => {
     if (catcher.includes(pro)) {
        clearInterval(interval);

        resolve('Promise resolved: catcher contains main and there is no timeout');
      }
    }, 1000);
  });
}

class Process{
  constructor(processServer){
    this.processServer = processServer;
  }
  async run(section){
    await this.processServer[section]()
  }
  async start(){
    await this.processServer.main()
  }
}

class Content {
  constructor(type){
    this.type = type;
    this.content = '';
  }
  contents(cont) {
    this.content = cont;
  } 
  send(req,res){
    res.set('Content-Type', this.type);
    res.send(this.content);
  }
}

class ServerRuntime {
  constructor(app,server){
    this.app = app;
    this.server = server;
    this.Function = async () =>{
    
    }
  }
  async run(){
    this.Function();
  }
  async sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  log(msg,color){
    console.log(`\x1b[37m  ║║╠═${color}${msg}`)
  }
  
}

class Server {
  constructor(func,name) {
    this.paths = [];
    this.func = func;
    this.name = name;
    apps[this.name] = require('express')();
    console.log('  ╔╦═\x1b[36m[Server Edge Function] \x1b[0m');
    console.time('║uptime');
  }
  create(type,path,func){
    apps[this.name].use(this.status);
    this.paths.push(path);
      apps[this.name][type](path, async (req, res) => {
      console.log('\x1b[37m  ║║╠═\x1b[38;5;214mNew request.');
      result = await func(req, res)
      if(result.failSafe){
        try{
          res.send("Request did not return anything. Please check your function.");
          console.log('\x1b[37m  ║║╠═\x1b[31mRequest incomplete.');
        }
        catch(e){}
      }
      console.log('\x1b[37m  ║║╠═\x1b[38;5;10mRequest complete.')
    });
  }
  
  remove(path) {
    let index = this.paths.indexOf(path);
    if (index > -1) {
      this.paths.splice(index, 1);
      console.log(apps[this.name]._router.stack)
      apps[this.name]._router.stack.splice(index + 4, 1);
    } else {
      console.log(`\x1b[37m  ║╠═\x1b[31mThe path ${path} does not exist in the server.`);
    }
  }
  async start(port) {
    if(await detectAsyncExe()){
      apps[this.name].listen(port, () => {
      console.log(`\x1b[37m  ║╠╦═\x1b[38;5;13m[Running on port: ${port}]\n  \x1b[37m║║╠═\x1b[38;5;6mServer running...`);
    });
    apps[this.name].use(this.status);
    }
    else{
      console.log('\x1b[37m  ║║╠═\x1b[38;5;10mUse await to start the server.')
    }
    process.stdin.on('keypress', (str, key) => { if (key.ctrl && key.name === 'f') { if(frozen){this.unpause()}else{this.pause()}} else {}})
    process.stdin.on('keypress', (str, key) => { if (key.ctrl && key.name === 'c') { if(!permafreeze){ this.end();permafreeze = true;process.exit()}  } else {}})
  }
  async status(req, res, next) {
     
    if (frozen||permafreeze) {
      res.send('The app is frozen. Please try again later.');
    } else {
      next();
    }
  }
  pause(){
    frozen = true;
    console.log('\x1b[37m  ║║╠═\x1b[38;5;44mApp connections paused');
  }
  unpause(){
    frozen = false;
    console.log('\x1b[37m  ║║╠═\x1b[38;5;208mApp connections unpaused');
  }
  end(){
    apps[this.name].listen(this.port).close()
    console.log('\x1b[37m  ╠╩╩═\x1b[32;5;214mServer closed.');
    console.log('\x1b[37m  ╠════════════════════════════════╗')
    console.log('  ║\x1b[31m        Process complete.       \x1b[37m║')
    console.log('\x1b[37m  ╠════════════════════════════════╣')
    console.log('  ║\x1b[31m Summary                        \x1b[37m║')
    console.log('\x1b[37m  ╠════════════════════════════════╝')
    console.log('╔═╝')
    console.timeEnd('║uptime');
    console.log('║Cloud::Labs by Renderlabs::Cloud')
    console.log('╙───────────────────────────────────');
  }
}

// SERVER TESTING
let myServer = new Server(async (req,res)=>{ },'myServer');
const runtime = new ServerRuntime(apps['myServer'],myServer);
runtime.Function = async () =>{
  
  const test = async (req,res) => {
    let n = 19
    let o = [!(!-(n%2)-false)][0];
    res.send(o);
    return {failSafe:true}
  }
  const test2 = async (req,res) => {
    let html = new Content('text/html');
    html.contents(`
      <iframe src="https://labz.online" width="100%" height="100%"></iframe>
    

  

    
    
    `)
    html.send(req,res);
    return {failSafe:true}
  }

  myServer.create('get','/', test);
  myServer.create('get','/new', test2);
  await myServer.start(80);
  await runtime.sleep(250)
  runtime.log('Freeze to quit (CTRL + F)','')
  
  while(!frozen){
    await runtime.sleep(1000);
  }
  myServer.end();
  catcher.push('end')
  
}
class myServerProcess{
  constructor(name){
    this.name = name
  }
  async main(){
    
    
    await runtime.run()
    
    await catcherComplete('end').then(()=>this.end())
    
  
  }
  end(){
    console.log('[All processes complete.]')
  }
}
const myProcess = new Process(new myServerProcess('myServer'));

myProcess.start()