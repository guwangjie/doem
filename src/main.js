import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import ElementUI from 'element-ui' // 导入饿了么UI
import 'element-ui/lib/theme-chalk/index.css' // 导入饿了么UICSS
import locale from 'element-ui/lib/locale/lang/zh-CN' // 饿了么UI语言文件中文包
Vue.use(ElementUI) //使用饿了么ui
import 'normalize.css/normalize.css' // css样式重置
import '@/assets/less/index.less' //导入全局less
import '@/assets/icons' // incon图标库 iconfont svg文件自己下载
import '@/permission' // 导入权限控制
import Echart from '@/utils/echart.js' //导入自定义echat 插件
Vue.use(Echart) //使用echart
import xlsx from '@/utils/xlsx.js'
Vue.use(xlsx)
import config from '@/utils/config.js'
Vue.use(config)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
