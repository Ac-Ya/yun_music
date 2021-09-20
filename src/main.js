import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'


import "./assets/css/base.css"
import "./assets/iconfontCss/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
// event-bus.js

Vue.prototype.$EventBus = new Vue()


Vue.use(less)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
