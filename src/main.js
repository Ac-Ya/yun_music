import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'


import "./assets/css/base.css"
import "./assets/iconfontCss/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
// import VueLazyLoad from "vue-lazyload"

// event-bus.js

Vue.prototype.$EventBus = new Vue()

// Vue.use(VueLazyload,{
//   preload:1.3,//预加载的宽高
//   loading:require("./assets/img/loadError.gif"),
//   error:"./assets/img/loadError.gif",
//   attempt:3,//尝试加载的次数
//   listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove'], //你想让vue监听的事件
// })
Vue.use(less)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
