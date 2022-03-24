const port = 8080
module.exports = {
  transpileDependencies: ['common'],
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: config => {
    // 设置webpack别名
    config.resolve.alias = Object.assign(config.resolve.alias, {
      '@views': '@/views',
      '@assets': '@/assets',
      '@common': '@/common'
    })
  },
  devServer: {
    port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
