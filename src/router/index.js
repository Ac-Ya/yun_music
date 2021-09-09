import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import("views/Login.vue")
const Index = () => import("views/index.vue")

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: "/login",
    component:Login
  },
  {
    path: '/index',
    component:Index
  }
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router
