// vue.config.js
const path = require('path')
const themePath = path.resolve(__dirname, 'src/assets/less/color.less')
module.exports = {
  // 选项...
  publicPath: '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${themePath}";`
        }
      }
    }
  },
  devServer: {
    // 设置主机地址
    host: 'localhost',
    // 设置默认端口
    port: 8080
  },
  chainWebpack: config => {
    // svg 配置 开始
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(path.resolve('src/assets/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    // svg配置结束
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.org.workbench',
        publish: [
          {
            provider: 'generic',
            url: 'http://192.168.0.105/download/' //存放软件版本的地址
          }
        ],
        win: {
          icon: './public/app.ico',
          target: [
            'nsis', //打包为nsis安装文件
            'zip' //打包为安装文件zip
          ]
        },
        mac: {
          icon: './public/app.png'
        },
        productName: '联易全保工作台',
        nsis: {
          //nsis配置参数
          oneClick: false, //可单击打开
          allowToChangeInstallationDirectory: true, //允许用户选择安装位置
          perMachine: false
        }
      }
    }
  }
}
