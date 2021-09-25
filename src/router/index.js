import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import("views/Login.vue")
const Index = () => import("views/index.vue")
const DiscoverMusic = () => import("views/discoverMusic/DiscoverMusic.vue")
const Recommendation = () => import("views/discoverMusic/discoverMusicChild/Recommendation.vue")
const Playlist = () => import("views/discoverMusic/discoverMusicChild/Playlist.vue")
const NewMusic = () => import("views/discoverMusic/discoverMusicChild/NewMusic.vue")
const Singer = () => import("views/discoverMusic/discoverMusicChild/Singer.vue")
const Top = () => import("views/discoverMusic/discoverMusicChild/Top.vue")
const MusicListDetail = () => import("views/musicListDetail/MusicListDetail.vue")
const Video = () => import("views/video/Video.vue")
const MVideo = () => import("views/video/videoChildren/MVideo.vue")
const MV = () => import("views/video/videoChildren/MV.vue")
const VideoDetail = () => import('views/videoDetail/VideoDetail.vue')
const SingerDetail = () => import("views/singerDetail/SingerDetail")


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: "/login",
    component: Login
  },
  {
    path: '/index',
    component: Index,
    redirect: "/discoverMusic",
    children: [
      {
        path: "/discoverMusic",
        component: DiscoverMusic,
        redirect:"/discoverMusic/recommendation",
        children: [
          {
            path: "/discoverMusic/recommendation",
            component: Recommendation
          },
          {
            path: "/discoverMusic/playlist",
            component: Playlist
          },
          {
            path: "/discoverMusic/newMusic",
            component: NewMusic
          },
          {
            path: "/discoverMusic/singer",
            component: Singer
          },
          {
            path: "/discoverMusic/top",
            component: Top
          },
        ]
      },
      {
        path: "/musicListDetail",
        component:MusicListDetail
      },
      {
        path: '/video',
        component: Video,
        redirect: '/video/mVideo',
        children: [
          {
            path: "/video/mVideo",
            component: MVideo,
            meta: {
              keepAlive: true
            }
          },
          {
            path: "/video/MV",
            component: MV,
            meta: {
              keepAlive: true
            }
          }
        ]
      },
      {
        path: '/videoDetail',
        component:VideoDetail
      },
      {
        path: "/singerDetail",
        component:SingerDetail
      }
    ]
  },
  
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
