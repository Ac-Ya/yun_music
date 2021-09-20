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
    // let store = this.$store
    // let musicListId =  window.localStorage.getItem("musicListId")
    // this.getMusicListdata(musicListId)
  },
  methods:{
    //获取音乐列表数据
    // async getMusicListdata(id){
    //   let res = await request({
    //     url: "/playlist/detail",
    //     method: "get",
    //     params: {
    //       id,
    //     },
    //   });
    //   console.log(res);

    //   let data = res.data.playlist;
    //   //判断是否有更多数据
    //   data.trackIds.length === data.tracks.length ? this.musicData = data.tracks : getIds(data.trackIds)
    // },
    // async getIds(trackIds) {
    //   let ids = "";
    //   trackIds.forEach((item) => {
    //     ids += item.id + ",";
    //   });
    //   ids = ids.substr(0, ids.length - 1);
    //   let res = await request({
    //     url: "/song/detail",
    //     method: "get",
    //     params: {
    //       ids
    //     },
    //   })
    //   console.log(res);

    // },
  },
  
  beforeDestroy(){
    
  }
}
</script>

<style scoped>
  #app{
    width: 100%;
    height: 100%;
  }
  
</style>
