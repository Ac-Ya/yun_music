<template>
  <div id="mVideo">
    <!-- 导航栏 -->
    <nav-bar
      :tags="hotTags"
      :tag="currentTag"
      @child="handleSwitch"
      @showAll="showAll"
    >
      <el-card
        class="box-card allTags"
        slot="allTag"
        v-loading="loading"
        element-loading-background="rgba(255, 255, 255,1)"
        v-show="show"
      >
        <div slot="header" class="allVideo">
          <span>全部视频</span>
        </div>
        <div class="text item">
          <span
            :class="{ categoryTag: item.name === currentTag }"
            v-for="item in allTags"
            :key="item.id"
            @click="handleSwitch(item.name,item.id)"
            >{{ item.name }}</span
          >
        </div>
      </el-card>
    </nav-bar>
    <!-- 列表数据 -->
    <div class="videoList">
      <div class="vide-item">
        <img src="../../../assets/img/tx.png" alt="" > 
        <div class="playCount">
          <i class="iconfont icon-bofang4"></i>
          <span>262万</span>
        </div>
        <div class="time">01:03</div>
        <div class="desc">一到夏天，哈奇士就喜欢进冰箱睡觉拉都拉不</div>
        <div class="ar">by原点FM</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/navBar/NavBar.vue";
import { request } from "network/request.js";
import CardList from "components/cardList/CardList.vue";
import CardListItem from "components/cardList/CardListItem.vue";
export default {
  name: "MVideo",
  components: {
    NavBar,
    CardList,
    CardListItem
  },
  props: {},
  data() {
    return {
      currentTag: "", //视频当前标签
      hotTags: [], //视频热门标签
      allTags: [], //所有标签
      loading: true,
      show: false,
      currentTagId:''
    };
  },
  created() {
    this.getVideoHotTags();
  },
  methods: {
    //获取视频的热门标签
    async getVideoHotTags() {
      let res = await request({
        url: "/video/category/list",
        method: "get",
        params: {
          cookie: window.localStorage.getItem("cookie"),
        },
      });
      this.hotTags = res.data.data;
      this.currentTag = res.data.data[0].name;
      this.currentTagId = res.data.data[0].id
      if (res.data.message !== "success") {
        console.log("错误请求，请稍后再试！");
      }
      console.log(res);
      res = null;
    },
    //切换标签
    handleSwitch(tag,tagId) {
      this.currentTag = tag;
      this.currentTagId = tagId
    },
    //获取视频全部标签
    async getVideoAllTags() {
      let res = await request({
        url: "/video/group/list",
        method: "get",
      });
      // console.log(res);
      if (res.data.message !== "success") {
        console.log("请刷新，重新获取数据！");
        return;
      }
      this.loading = false;
      this.allTags = res.data.data;
    },
    //显示所有标签
    showAll(show) {
      this.show = show;
      this.getVideoAllTags();
    },
    //根据标签获取视频列表数据
    async getVideoListData(id){
       let timestamp = Date.parse(new Date());
      let res = await request({
        url:"/video/group",
        method:"get",
        params:{
          id,
          timestamp,
          cookie:window.localStorage.getItem('cookie')
        },

      
      })
      console.log(res);
    }
  },
  watch:{
    currentTagId(nId,oId){
      this.getVideoListData(nId)
    }
  }
};
</script>
<style lang="less" scoped>
#mVideo {
  padding: 20px 100px 0 100px;
  width: 100%;
  height: 1000px;

}

.box-card {
  width: 650px;
  height: 400px;
  position: absolute;
  z-index: 99;
  left: 0;
  top: 35px;
  overflow: scroll;
}
.allVideo {
  font-size: 14px;
}
.item {
  width: 100%;
  display: flex;
  // margin-bottom: 18px;
  flex-wrap: wrap;
  span {
    width: 60px;
    height: 35px;
    line-height: 35px;
    margin: 10px 20px;
    font-size: 12px;
    white-space: nowrap;
    &:hover {
      color: #ec4141;
    }
  }
}
.categoryTag {
  color: #ec4141;
  font-weight: bold;
}
.videoList{
  width: 100%;
  min-width: 1100px;
  display: flex;
   flex-wrap: wrap;

}
.vide-item{
  position: relative;
  width: 23%;
  margin: 10px 20px 10px 0;
  img{
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 8px;
  }
  .playCount{
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
    font-size: 14px;
  }
  .time{
    position: absolute;
    right: 5px;
    top: 130px;
    color: white;
    font-size: 12px;
  }
  .desc,.ar{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .ar{
    margin-top: 5px;
    color:#D3D3D3;
  }
  
}
</style>