const { name } = require('./package.json')

module.exports = {
  transpileDependencies: ['common'],
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: config => {
    config.output = Object.assign(config.output, {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }),
    config.resolve.alias = Object.assign(config.resolve.alias, {
      '@views': '@/views',
      '@assets': '@/assets',
      '@common': '@/common'
    })
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
