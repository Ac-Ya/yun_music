<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

import { request } from "network/request.js";
export default {

  name: 'app',
  components: {
  },
  created(){
    let store = this.$store
    let musicListId =  window.localStorage.getItem("musicListId")
    store.commit("modifyMusicId",window.localStorage.getItem('currentMusic'))
  },
  methods:{
    async getMusicListdata(musicListId){
      let res = await request({
        url:''
      })
    }
  },
  beforeDestroy(){
    let state = this.$store.state
    // console.log(2);
    // 获取vuex中currentMusic 和 musicListId
    window.localStorage.setItem("currentMusic",state.currentMusic)
    window.localStorage.setItem("musicListId",state.musicListId)
    state = null
  }
}
</script>

<style scoped>
  #app{
    width: 100%;
    height: 100%;
  }
  
</style>
