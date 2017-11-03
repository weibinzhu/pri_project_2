import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/module/store'
import Fontsize from '@/module/fontsize'
import vueResource from 'vue-resource' // 引入vue-resource插件，用于Ajax

Vue.use(vueResource);// 使用vue-resource

Fontsize.fontSize(550)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
