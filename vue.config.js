const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: { //匹配规则
      '/pushHub': {
          //要访问的跨域的域名
          target: 'http://localhost:8081',
          ws: true,
          secure:false, // 使用的是http协议则设置为false，https协议则设置为true
          changOrigin: true, //开启代理
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
        config.output.filename('js/[name].js').end();
        config.output.chunkFilename('js/[name].js').end();
        // 修改生产配置
        config.plugin('extract-css').tap(args => [{
                filename: `css/[name].css`,
                chunkFilename: `css/[name].css`
            }])
    }
  }
})
