<template>
  <div id="mVideo" @scroll="handleScroll">
    <!-- 列表数据 -->
    <div
      v-if="videoList !== null"
      class="videoList"
      v-infinite-scroll="load"
      infinite-scroll-distance="100"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-immediate="false"
      infinite-scroll-delay="200"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      @scroll="handleScroll"
    >
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
              @click="handleSwitch(item.name, item.id)"
              >{{ item.name }}</span
            >
          </div>
        </el-card>
      </nav-bar>
      <div
        class="vide-item"
        v-for="item in videoList"
        :key="item.data.id"
        @click="toVideoDetail(item.data.vid, 'video')"
      >
        <img :src="item.data.coverUrl" alt="" />
        <div class="playCount">
          <i class="iconfont icon-bofang4"></i>
          <span>{{ item.data.playTime | handleNum }}</span>
        </div>
        <div class="time">{{  item.data.durationms | handleMusicTime }}</div>
        <div class="desc">
          {{ item.data.title ? item.data.title : item.data.name }}
        </div>
        <div class="ar">
          {{
            item.data.creator
              ? item.data.creator.nickname
              : item.data.artists[0].name
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/navBar/NavBar.vue";
import { request } from "network/request.js";
import CardList from "components/cardList/CardList.vue";
import CardListItem from "components/cardList/CardListItem.vue";
import { handleNum, handleMusicTime } from "../../../plugins/utils";

export default {
  name: "MVideo",
  components: {
    NavBar,
    CardList,
    CardListItem,
  },
  props: {},
  data() {
    return {
      currentTag: "", //视频当前标签
      hotTags: [], //视频热门标签
      allTags: [], //所有标签
      show: false, //是否显示所有标签
      currentTagId: 0, //当前tag的id
      currentPage: 1, //当前页
      videoList: [], //视频列表数据
      hasMore: true, //是否有更多数据
      disabled: false, //是否无限加载
      loading: true, //是否显示正在加载
      currentHeight:0,

    };
  },
  filters: {
    handleNum,
    handleMusicTime,
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
      this.currentTagId = res.data.data[0].id;
      if (res.data.message !== "success") {
        console.log("错误请求，请稍后再试！");
      }
      // console.log(res);
      res = null;
    },
    //切换标签
    handleSwitch(tag, tagId) {
      this.currentTag = tag;
      this.currentTagId = tagId;
      this.show = false;
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
    async getVideoListData(id) {
      this.loading = true;
      let i = 2;
      let timestamp = Date.parse(new Date());

      while (i && this.hasMore) {
        let res = await request({
          url: "/video/group",
          method: "get",
          params: {
            id,
            offset: (this.currentPage - 1) * 8,
            timestamp,
            cookie: window.localStorage.getItem("cookie"),
          },
        });
        // console.log(res);
        this.currentPage += 1;
        this.hasMore = res.data.hasmore;
        this.videoList.push(...res.data.datas);
        i--;
      }
      (i = null), (timestamp = null);
      this.loading = false;
    },

    //跳转到视频详情页
    toVideoDetail(id, type) {
      this.$router.push({
        path: "/videoDetail",
        query: {
          id,
          type,
        },
      });
    },
    //触底事件
    load() {
      if (this.hasMore) {
        this.getVideoListData(this.currentTagId);
      }
      this.disabled = true;
    },
    handleScroll(e) {
      this.currentHeight = e.target.scrollTop
    }
  },
  mounted() {

  },
  watch: {
    currentTagId(nId, oId) {
      this.currentPage = 1;
      this.videoList = [];
      this.getVideoListData(nId);
    },
    videoList() {
      if (this.hasMore) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
  activated() {
    let mVideo = document.querySelector(".videoList")
    mVideo.scrollTo({
      top:this.currentHeight
    })
  },
  deactivated() { 
  },
};
</script>
<style lang="less" scoped>
#mVideo {
  padding: 20px 0 0 100px;
  width: 100%;
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
.videoList {
  width: 100%;
  min-width: 1100px;
  height: calc(100vh - 200px);
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
  overflow-y: scroll;
   &::-webkit-scrollbar {
    display: none;
  }
}
.vide-item {
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
  .time {
    position: absolute;
    right: 5px;
    top: 130px;
    color: white;
    font-size: 12px;
  }
  .desc,
  .ar {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .ar {
    margin-top: 5px;
    color: #d3d3d3;
  }
}
</style>