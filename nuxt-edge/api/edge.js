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
    analyze: false, // Add analyze option
    analyzeDir: "", // Add analyzeDir option
    extractCSS: false, // Add extractCSS option
    analyzeBrowser: false, // Add analyzeBrowser option
    analyzeModule: [], // Add analyzeModule option
    loaders: {}, // Add loaders option
    optimization: {}, // Add optimization option
    terser: {}, // Add terser option
    postcss: {}, // Add postcss option
    babel: {}, // Add babel option
    hardSource: false, // Add hardSource option
    devMiddleware: {}, // Add devMiddleware option
    webpackBar: {}, // Add webpackBar option
    optimizeCss: false, // Add optimizeCss option
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
    splitChunks: {}, // Add splitChunks option
    minimize: false, // Add minimize option
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
    timing: false, // Add timing option
    strictPort: false, // Add strictPort option
  },
  // Add other required options here
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
