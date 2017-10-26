// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource' //数据交互
import MintUi from 'mint-ui' //数据交互

Vue.use(Resource)
Vue.use(MintUi)


Vue.config.productionTip = false

//数据接口
Vue.prototype.api="http://183.62.252.130:801/"
//数据接口
Vue.prototype.api2="http://183.62.252.130:801"
//用户id
Vue.prototype.userId=1

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
