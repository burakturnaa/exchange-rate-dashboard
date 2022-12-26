const fs = require('fs')
module.exports = {
  configureWebpack:{
    devServer: {
      proxy : 'https://api.domain.com:8000',
      headers: { "Access-Control-Allow-Origin": "*"},
      https: {
        key: fs.readFileSync('./ssl/api.domain.com.key'),
        cert: fs.readFileSync('./ssl/api.domain.com.crt'),
      },
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
