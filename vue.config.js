const fs = require('fs')
module.exports = {
  configureWebpack:{
    devServer: {

      // development:{ 
      // baseUrl: "./",
      
      // proxy : 'http://51.195.168.9:28228',
      // proxy : 'https://dev.hescheck.com:28028',
      proxy : 'https://doviz.dumanarge.com:8000',
      headers: { "Access-Control-Allow-Origin": "*"},
      https: {
        key: fs.readFileSync('./ssl/doviz.dumanarge.com.key'),
        cert: fs.readFileSync('./ssl/doviz.dumanarge.com.crt'),
      },
      // //production
      // //proxy: 'https://51.195.168.9:28028',
      disableHostCheck: true
    },
    resolve : {
      mainFields: ["main","browser"]
    }

  },
  
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'tr',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },

  lintOnSave: false, 
}
