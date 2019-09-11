// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import app from './App'

//使用vue-router组件
Vue.use(VueRouter)
//使用vue-resource组件
Vue.use(VueResource)

// Vue.config.productionTip = false

/* eslint-disable no-new */

// 1.3导入自己的 router.js 路由模块
import router from './router.js'

var vm = new Vue({
  el:'#app',
  render:c => c(app),
  router  //1.4挂载路由对象到 vm 实例上
})

