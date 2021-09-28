<template>
  <div id="recommendMusic">
    <div class="header">
      <div class="top">
        <div class="rili">
          <i class="iconfont icon-rili"></i>
          <span>{{currentDate}}</span>
        </div>
        <div class="desc">
          <p class="title">每日歌曲推荐</p>
          <p class="time">根据你的音乐口味生成，每天6:00更新</p>
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <i class="iconfont icon-Path"></i>
          <span>播放全部</span>
          <i class="iconfont icon-icon-test1"></i>
        </div>
        <div class="item">
          <i class="iconfont icon-icon-test"></i>
          <span>收藏全部</span>
        </div>
      </div>
    </div>
    <div class="musicList" v-if="musicData.length !== 0  ">
      <music-table class="tableHeader">
        <div class="album" slot="album">专辑</div>
        <div class="burningTime" slot="burningTime">时长</div>
      </music-table>
      <music-table-item :mData="musicData" :musicListId="playListId">
        <i class="iconfont icon-xindong" slot="like"></i>
        <i class="iconfont icon-xiazai" slot="download"></i>
      </music-table-item>
    </div>
  </div>
</template>

<script>
import MusicTable from "components/musicTable/MusicTable.vue";
import MusicTableItem from "components/musicTable/MusicTableItem.vue";
import { request } from "network/request.js";
export default {
  name: "RecommendMusic",
  components: {MusicTable,MusicTableItem},
  props: {},
  data() {
    return {
        musicData:[],
        playListId:0,
        currentDate:0
    };
  },
  created(){
      this.currentDate = new Date().getDate()
      this.getRecommendMusic()
  },
  methods:{
      //获取每日推荐数据
      async getRecommendMusic(){
          let res = await request({
              url:'/recommend/songs',
              params:{
                  cookie:window.localStorage.getItem("cookie")
              }
          })
          this.musicData = res.data.data.dailySongs
      }
  }
};
</script>
<style lang="less" scoped>
#recommendMusic {
  width: 100%;
  .header {
    width: 100%;
    // height: 150px;
    padding: 10px 0 10px 20px;
  }
}
.top {
  display: flex;
  .rili {
    position: relative;
    font-size: 35px;
    color: #ec4141;
    font-weight: bold;
    .iconfont {
      font-size: 90px;
    }
    span {
      position: absolute;
      left: 27px;
      top: 48px;
    }
  }
  .desc {
    margin-left: 20px;
    .title {
      margin: 20px 0 10px 0;
      font-size: 24px;
      font-weight: bold;
    }
    .time {
      font-size: 12px;
    }
  }
}
.bottom {
  width: 100px;
  display: flex;
  .item {
    display: flex;
    white-space: nowrap;
    padding: 8px 10px;
    margin-right: 20px;
    font-size: 14px;
    border-radius: 20px;
    border: 1px solid #dcdcdc;
    background-color: #ec4141;
    color: #fff;
    &:hover{
        background-color: #DC443E;
    }
    .iconfont {
      font-size: 14px;
    }
    span {
      margin: 0 10px;
    }
  }
}
.musicList {
  width: 100%;
  border-top: 1px solid #dcdcdc;
}
.tableHeader {
  font-size: 14px;
  color: #a9a9a9;
  margin-top: 10px;
}

.album {
  width: 25%;
}
.burningTime {
  width: 10%;
}

</style>