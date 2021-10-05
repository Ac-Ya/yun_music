<template>
  <div id="recentPlay">
    <div class="header">
      <div class="title">最近播放<span class="playCount">共{{musicData.length}}首</span></div>
      <div class="playAll" @click="playAll">
        <i class="iconfont icon-Path"></i>
        <span>播放全部</span>
        <i class="iconfont icon-icon-test1"></i>
      </div>
    </div>

    <music-table class="tableHeader">
      <div class="album" slot="album">专辑</div>
      <div class="burningTime" slot="burningTime">时长</div>
    </music-table>
    <music-table-item :mData="musicData" :musicListId="0">
      <i class="iconfont icon-xindong" slot="like"></i>
      <i class="iconfont icon-xiazai" slot="download"></i>
    </music-table-item>
  </div>
</template>

<script>
import MusicTable from "components/musicTable/MusicTable.vue";
import MusicTableItem from "components/musicTable/MusicTableItem.vue";
import { request } from "network/request.js";
export default {
  name: "RecentPlay",
  components: { MusicTable, MusicTableItem },
  props: {},
  data() {
    return {
        musicData:[]
    };
  },
  created(){
      let uid = window.localStorage.getItem("uid")
      this.getRecentPlayData(uid,0)
  },
  methods:{
      //获取列表数据
      async getRecentPlayData(uid,type){
          let res = await request({
              url:'/user/record',
              params:{
                  uid,
                  type
              }
          })
        //   console.log(res);
          let arr = []
          res.data.allData.forEach(item => {
            arr.push(item.song)
          });
          this.musicData = arr
          arr = null
      },

      //点击palyAll
      playAll(){
      let store =  this.$store
      //将当前音乐id保存在vuex中
      store.commit("modifyMusicId", {musicId:this.musicData[0].id , index:0});
      store.commit("currentMusicList", this.musicData);
      store.commit("currentPlayState",true)
      }
  },
};
</script>
<style lang="less" scoped>
#recentPlay {
  width: 100%;
  margin-bottom: 100px;
  .header {
    width: 100%;
    padding: 10px 20px;
    height: 100px;
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .playCount {
      margin-left: 10px;
      font-size: 14px;
      color: #dcdcdc;
    }
  }
}
.playAll {
  width: 130px;
  display: flex;
  white-space: nowrap;
  padding: 8px 10px;
  margin-right: 20px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid #dcdcdc;
  background-color: #ec4141;
  color: #fff;
  &:hover {
    background-color: #dc443e;
  }
  .iconfont {
    font-size: 14px;
  }
  span {
    margin: 0 10px;
  }
}
</style>