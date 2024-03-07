// https://nuxt.com/docs/api/configuration/nuxt-config
export default function defineNuxtConfig() {
  return {
    devtools: { enabled: true },
    build: {
    extend(config, ctx) {
  
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'vue-style-loader', 
          'css-loader',
        ],
      });
    },
  },
  };
}