<template>
  <div id="recommendation">
    <!-- 推荐页轮播图区域 -->
    <div class="recommend">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item
          v-for="(item, index) in banners"
          :key="item.targetId + index"
        >
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommendPlaylist">
      <div class="title">
        <span>推荐歌单</span>
        <i class="iconfont icon-xiayiye"></i>
      </div>
      <div class="playlist">
        <div
          @mouseenter="enter(-2)"
          @mouseleave="leave()"
          class="recommendMusic listItem"
          @click="toRecommendMusic"
        >
          <img src="../../../assets/img/tx.png" alt="" class="dayEvery" />
          <span class="recommendTitle">每日歌曲推荐</span>
          <div class="rili">
            <i class="iconfont icon-rili"></i>
            <span>{{ currentDate }}</span>
          </div>
        </div>
        <!-- 每一个音乐卡片 -->
        <div
          v-for="(item, index) in recommendPlaylist"
          :key="item.id"
          class="listItem"
          @mouseenter="enter(index)"
          @mouseleave="leave(index)"
          @click="toMusicListDetail(item.id)"
        >
          <img :src="item.picUrl" alt="" />
          <div class="playNum">
            <i class="iconfont icon-bofang4"></i>
            <span>{{ playcount(item.playCount) }}</span>
          </div>
          <div class="playIcon" :class="{ show: showIcon == index }">
            <i class="iconfont icon-bofang"></i>
          </div>
          <span class="playlistTitle">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 独家放送 -->
    <div class="privatecontent">
      <div class="title">
        <span>独家放送</span>
        <i class="iconfont icon-xiayiye"></i>
      </div>
      <card-list class="privatecontentList">
        <card-list-item
          class="privatecontentListItem"
          v-for="item in privatecontent"
          :key="item.id"
        >
          <img :src="item.picUrl" alt="" slot="item-img" />
          <div slot="item-playIconfont" class="playIcon">
            <i class="iconfont icon-bofang"></i>
          </div>
          <span slot="item-title" class="privatecontentTitle">{{
            item.copywriter
          }}</span>
        </card-list-item>
      </card-list>
    </div>
    <!-- 推荐MV -->
    <div class="recommendMV">
      <div class="title" @click="tomMv">
        <span>推荐MV</span>
        <i class="iconfont icon-xiayiye"></i>
      </div>
      <card-list class="recommendMVList">
        <card-list-item
          class="recommendMVItem"
          v-for="item in recommendMV"
          :key="item.id"
          @click.native="toVideoDetail(item.id, 'mv')"
        >
          <img :src="item.picUrl" alt="" slot="item-img" />
          <div slot="item-playCount" class="count">
            <i class="iconfont icon-bofang"></i>
            <span>{{ playcount(item.playCount) }}</span>
          </div>
          <span slot="item-title" class="recommendMVTitle">
            {{ item.name }}
          </span>
        </card-list-item>
      </card-list>
    </div>
  </div>
</template>

<script>
import { request } from "network/request.js";
import CardList from "components/cardList/CardList.vue";
import CardListItem from "components/cardList/CardListItem.vue";
import { tranNumber } from "plugins/utils.js";

export default {
  name: "Recommendation",
  components: {
    CardList,
    CardListItem,
  },
  props: {},
  data() {
    return {
      banners: [],
      showIcon: -1,
      recommendPlaylist: [],
      privatecontent: [], //独家放送数据
      recommendMV: [], //推荐mv
      currentDate:0
    };
  },
  computed: {
    //   计算属性传参
    playcount() {
      return (num, point = 2) => {
        return tranNumber(num, point);
      };
    },
  },
  created() {
     this.currentDate = new Date().getDate()
    //获取轮播图数据
    this.getBannerData();
    this.getRecommendPlayList();
    this.getPrivatecontentData();
    this.getRecommendMvData();
  },
  methods: {
    //获取banners数据
    async getBannerData() {
      let res = await request({
        url: "/banner",
        method: "get",
      });
      this.banners = res.data.banners;
    },
    //推荐歌单列表
    async getRecommendPlayList() {
      let res = await request({
        url: "/personalized",
        method: "get",
        params: {
          limit: 9,
        },
      });
      this.recommendPlaylist = res.data.result;
    },

    //独家放送区域数据
    async getPrivatecontentData() {
      let res = await request({
        url: "/personalized/privatecontent",
        method: "get",
      });
      this.privatecontent = res.data.result;
    },
    //获取推荐Mv
    async getRecommendMvData() {
      let res = await request({
        url: "/personalized/mv",
        method: "get",
      });

      this.recommendMV = res.data.result;
    },
    // 鼠标移入移出事件
    enter(index) {
      this.showIcon = index;
      // console.log(index);
    },
    leave() {
      this.showIcon = -1;
    },
    // 跳转到歌单详情页面
    toMusicListDetail(id) {
      // console.log(id);
      this.$router.push({
        path: "/musicListDetail",
        query: {
          id,
        },
      });
    },
    //跳转到每日歌曲推荐
    toRecommendMusic() {
      this.$router.push("/recommendMusic");
    },
    //跳转到videoDetail
    toVideoDetail(id, type) {
      this.$router.push({
        path: "/videoDetail",
        query: {
          id,
          type,
        },
      });
    },
    //跳转到MVlist
    tomMv(){
      this.$router.push("/video/MV")
    }
  },
};
</script>
<style lang="less" scoped>
#recommendation {
  padding: 40px 100px 0 100px;
  width: 100%;
}
.recommend {
  max-width: 1100px;
}

.carousel {
  width: 100%;
}

.el-carousel {
  margin: auto;
  width: 1100px;
}

.el-carousel__item {
  border-radius: 10px;
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.recommendMusic {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  .dayEvery {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: scale(1.2);
    filter: blur(5px) brightness(80%);
  }
  .recommendTitle {
    position: absolute;
    top: 10px;
    color: #fff;
    left: 50%;
    transform: translate(-50%);
  }
  .rili {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 35px;
    color: #f2f2f2;
    // font-weight: bold;
    .iconfont {
      font-size: 90px;
    }
    span {
      position: absolute;
      left: 27px;
      top: 48px;
    }
  }
}
.recommendPlaylist {
  .playlist {
    display: flex;
    flex-wrap: wrap;
    min-width: 1100px;
    .listItem {
      position: relative;
      // width: 19%;
      min-width: 150px;
      max-width: 200px;
      margin: 0 20px 20px 0;
    }
    // 标题样式
    .playlistTitle {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      margin-top: 5px;
    }
    //icon图标样式
    .playIcon {
      position: absolute;
      right: 10px;
      bottom: 35px;
      color: #ec4141;
      opacity: 0;
      //   display: none;
      .iconfont {
        font-size: 30px;
        border-radius: 50%;
        background-color: white;
      }
    }
    .show {
      opacity: 1;
      transition: all 1s;
    }
  }
}

.listItem img {
  width: 100%;
  border-radius: 5px;
}

.playNum {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 12px;
  color: white;
}

// 独家放送区域
.privatecontent,
.recommendPlaylist,
.recommendMV {
  // 标题
  .title {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .title:hover {
    font-size: 22px;
  }
}
.privatecontent {
  margin-bottom: 30px;
  min-width: 1100px;
}
.privatecontent .privatecontentListItem {
  width: 32%;
  height: 180px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .playIcon {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .iconfont {
    font-size: 30px;
    color: #ec4141;
  }
}
.privatecontentTitle,
.recommendMVTitle {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.recommendMVList .recommendMVItem {
  width: 24%;
  height: 150px;
  img {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .count {
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
    font-size: 14px;
  }
}
.recommendMV {
  margin-bottom: 100px;
  min-width: 1100px;
}
</style>