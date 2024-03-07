//RENDERLABS::CLOUD Nuxt Edge Function

import { createNuxt } from "nuxt";
import { Nuxt } from "nuxt-edge";
let nuxt = null
const nuxtConfig = {
  dev: false,
  _layers: [],
  rootDir: "",
  srcDir: "../",
  buildDir: ".nuxt",
  modulesDir: [],
  filePath: "../",
  publicPath: "/_nuxt/",
  experimental: {
    
  },
  vue:{
    experimetal: {
      externalVue: false,
    }
  },
  ignore:{
    flatMap: ()=>{
      return []
    }
  },
  devServerHandlers:[
    
  ],
  future: {
    typescriptBundelerResolution: false,
  },
  features:{
    
  },
  generate:{
    routes: ["/"],
  },
  imports:{
    autoImport: false,
  },
  app:{
    baseUrl: "/nuxt"
  },
  runtimeConfig:{
    app:{
      baseURL: "https://renderlabs.cloud"
    }
  },
  build: {
    transpile: [],
    analyze: false, 
    analyzeDir: "", 
    extractCSS: false,
    analyzeBrowser: false, 
    analyzeModule: [], 
    loaders: {}, 
    optimization: {}, 
    terser: {}, 
    postcss: {}, 
    babel: {}, 
    hardSource: false,
    devMiddleware: {}, 
    webpackBar: {}, 
    optimizeCss: false,
  },
  
  optimization: {
    treeShake: {
      composables: {
        server: [
          "nuxt-edge/api/edge.js"
        ],
        client: [
          "nuxt-edge/api/edge.js"
        ]
      },
    },
    splitChunks: {},
    minimize: false,
  },
  modules: [],
  _modules: [],
  _installedModules: [],
  sourcemap: {
    server: false,
    client: false,
  },
  
  plugins: [],
  buildModules: [],
  typescript: {
    builder: false,
  },
  server: {
    host: "localhost",
    port: 3000,
    timing: false,
    strictPort: false,
  },
  
};
async function start(){
  nuxt = new Nuxt(nuxtConfig);
  await nuxt.ready();
  if (typeof (()=>{}) !== 'function') {
    throw new Error('Nuxt render function is not available');
  }
}
async function init(req, res, from) {
  
  const modifiedUrl = req.url.replace(from, '');
  const { html } = await nuxt.renderRoute(modifiedUrl);
  return html
}
export { start }
export default init;
