<template>
  <div id="searchMVideo">
    <!--  v-for="item in mvListData"
      :key="item.id" 
      @click="toVideoDetail(item.id, 'mv')"
      -->
    <div
      class="mv-item"
      v-for="item in mvListData"
      :key="item.vid"
      @click="toVideoDetail(item.vid)"
    >
      <img :src="item.coverUrl" alt="" />
      <div class="playCount">
        <i class="iconfont icon-bofang4"></i>
        <span>{{ item.playTime | handleNum }}</span>
      </div>
      <div class="time">{{ item.durationms | handleMusicTime }}</div>
      <div class="desc">{{ item.title }}</div>
      <div class="ar">{{ item.creator[0].userName }}</div>
    </div>
  </div>
</template>

<script>
import { handleNum, handleMusicTime } from "../../../plugins/utils";
export default {
  name: "SearchMVideo",
  components: {},
  props: {
    mvListData:{
      type:Array,
      default(){
        return []
      }
    }
  },
  filters:{
    handleMusicTime,
    handleNum
  },
  data() {
    return {};
  },
  methods:{
    //跳转到视频详情
     toVideoDetail(id) {
      let type 
      Number.isNaN(+id) ? type = 'video': type = 'mv'
      this.$router.push({
        path: "/videoDetail",
        query: {
          id,
          type
        },
      });
      type = null
    }
  },
  beforeDestroy(){
    // console.log(1);
  }
  
};
</script>
<style lang="less" scoped>
#searchMVideo {
  width: 100%;
  border-top: 1px solid #dcdcdc;
  margin-bottom: 80px;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  min-width: 1100px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.mv-item {
  position: relative;
  width: 23%;
  margin: 10px 20px 10px 0;
  img {
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 8px;
  }
  .playCount {
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
    font-size: 14px;
  }
  .desc,
  .ar {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .time {
    position: absolute;
    right: 5px;
    top: 130px;
    color: white;
    font-size: 12px;
  }
  .ar {
    margin-top: 5px;
    color: #d3d3d3;
  }
}
</style>