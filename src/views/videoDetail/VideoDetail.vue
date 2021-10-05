<template>
  <div id="videoDetail">
    <!--视频详情 -->
    <div class="detail" v-if="videoDetailData !== null">
      <div class="title">
        <!-- <i class="iconfont icon-shangyiye"></i> -->
        <span v-if="routeData.type == 'video'">视频详情</span>
        <span v-else>MV详情</span>
      </div>
      <!-- 视频盒子 -->
      <video autoplay controls :src="videourl ? videourl : ''" class="videoBox"></video>
      <!-- 视频信息 -->
      <div class="videoInfo" v-if="videoDetailData !== null">
        <!-- 用户信息 -->
        <div class="user">
          <img
            :src="videoDetailData.cover || videoDetailData.coverUrl"
            alt=""
          />
          <span class="singer">{{
            videoDetailData.artistName || videoDetailData.creator.nickname
          }}</span>
          <div class="attention">
            <i class="iconfont icon-icon-test1"></i>
            <span>关注</span>
          </div>
        </div>
        <!--  -->
        <div class="info">
          <div class="title">
            {{ videoDetailData.name || videoDetailData.title }}
          </div>
          <div class="playCount">
            <span class="time"
              >发布:{{
                routeData.type == "mv"
                  ? videoDetailData.publishTime
                  : videoDetailData.publishTime | showDate
              }}</span
            >
            <span
              >播放:{{
                (routeData.type == "mv"
                  ? videoDetailData.playCount
                  : videoDetailData.playTime) | handleNum
              }}次</span
            >
          </div>
          <div class="tags">
            <span v-for="item in videoDetailData.videoGroup" :key="item.id">{{
              item.name
            }}</span>
          </div>
          <div class="desc">
            {{ videoDetailData.desc }}
          </div>
        </div>
        <div class="operation" v-if="videoInfo !== null">
          <div class="operationItem">
            <i class="iconfont icon-zan"></i>
            <span>赞({{ videoInfo.likedCount }})</span>
          </div>
          <div class="operationItem">
            <i class="iconfont icon-favorite"></i>
            <span
              >收藏({{
                videoDetailData.subCount || videoDetailData.subscribeCount
              }})</span
            >
          </div>
          <div class="operationItem">
            <i class="iconfont icon-fenxiang"></i>
            <span>分享({{ videoInfo.shareCount }})</span>
          </div>
          <div class="operationItem">
            <i class="iconfont icon-xiazai"></i>
            <span>下载</span>
          </div>
        </div>
      </div>
      <div class="commentCount">评论({{ videoDetailData.commentCount }})</div>
      <comment
        :commentType="routeData.type == 'video' ? 5 : 1"
        :sourceId="routeData.id"
        class="comment"
      ></comment>
    </div>
    <!--相关推荐  -->
    <div class="related" v-if="relatedData !== null">
      <div class="title">
        <span>相关推荐</span>
      </div>
      <div
        class="recommentItem"
        v-for="item2 in relatedData"
        :key="item2.id"
        @click="toVideoDetail(item2.vid || item2.id, routeData.type)"
      >
        <img :src="item2.coverUrl || item2.cover" alt="" />
        <div class="palyCount">
          <i class="iconfont icon-bofang4"></i>
          <span>{{  (item2.playTime || item2.duration) | handleNum }}</span>
        </div>
        <div class="time">
          <span>{{
            (item2.durationms || item2.playCount) | handleMusicTime
          }}</span>
        </div>
        <div class="relatedInfo">
          <div class="desc">{{ item2.title || item2.name }}</div>
          <div class="ar">
            {{ item2.creator ? item2.creator[0].userName : item2.artistName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let routeData = null;
let res = null,
  mvid = null,
  url = null,
  params = null,
  vid = null;
import { request } from "network/request.js";
import Comment from "components/comment/Comment.vue";
import { formatTime, handleNum, handleMusicTime } from "../../plugins/utils";
export default {
  name: "VideoDetail",
  components: { Comment },
  props: {},
  data() {
    return {
      routeData: {
        id: "", //用于保存传过来的id
        type: "", //用于保存是什么类型的
      },
      videoDetailData: null, //视频详情数据
      videoInfo: null, //用于保存视频的点赞，分享，评论数
      videourl: "", //用于保存视频的url
      relatedData: [], //用于保存相关推荐数据
    };
  },
  filters: {
    showDate(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);

      // 2、将date进行格式化
      return formatTime(date);
    },
    handleNum,
    handleMusicTime,
  },
  created() {
    this.$store.commit("modifyShowBottomControl", false);
    routeData = this.$route.query;
    this.routeData = routeData;
    this.getAllData(routeData.id,routeData.type)
  },
  methods: {
    //获取视频详情数据
    async getVideoData(id, type) {
      type == "video" ? (url = "/video/detail") : (url = "/mv/detail");
      type == "video" ? (params = { id }) : (params = { mvid: id });
      res = await request({
        url,
        method: "get",
        params,
      });
      if (res.data.code !== 200) {
        this.$message("获取数据失败，请刷新重试！");
        return;
      }
      this.videoDetailData = res.data.data;
      (res = null), (mvid = null), (url = null), (params = null);
    },
    //获取视频的点赞转发评论数据
    async getVideoInfo(id, type) {
      type == "video"
        ? (url = "/video/detail/info")
        : (url = "/mv/detail/info");
      type == "video" ? (params = { vid: id }) : (params = { mvid: id });
      res = await request({
        url,
        method: "get",
        params,
      });
      // console.log(res);
      if (res.data.code !== 200) {
        this.$message("获取数据失败，请刷新重试！");
        return;
      }
      this.videoInfo = res.data;
      (res = null), (mvid = null), (url = null), (params = null), (vid = null);
    },
    //获取视频的url
    async getVideoUrl(id, type) {
      let timestamp = Date.parse(new Date());
      type == "video" ? (url = "/video/url") : (url = "/mv/url");
      res = await request({
        url,
        method: "get",
        params: {
          id,
          timestamp,
        },
      });
      // console.log(res);
      if (res.data.code !== 200) {
        this.$message("获取数据失败，请刷新重试！");
        return;
      }
      type == "video"
        ? (this.videourl = res.data.urls[0].url)
        : (this.videourl = res.data.data.url);
    },
    //获取相关推荐视频
    async getRelatedData(id, type) {
      let timestamp = Date.parse(new Date());
      type == "video" ? (url = "/related/allvideo") : (url = "/simi/mv");
      type == "video" ? (params = { id }) : (params = { mvid: id });
      res = await request({
        url,
        method: "get",
        params,
        timestamp,
      });
      // console.log(res);
      type == "video"
        ? (this.relatedData = res.data.data)
        : (this.relatedData = res.data.mvs);
    },
    //获取所有数据
    getAllData(id,type) {
      this.getVideoData(id, type);
      this.getVideoInfo(id, type);
      this.getVideoUrl(id, type);
      this.getRelatedData(id, type);
    },

    toVideoDetail(id, type) {
      this.getAllData(id,type)
    },
  },
  beforeDestroy() {
      this.$store.commit("modifyShowBottomControl", true);
      (res = null),
      (mvid = null),
      (url = null),
      (params = null),
      (vid = null)
  },
};
</script>
<style lang="less" scoped>
#videoDetail {
  width: 100%;
  min-width: 1100px;
  padding: 20px 30px 0 50px;
  display: flex;
}
.detail {
  width: 60%;
  margin-right: 40px;
  .title {
    font-weight: bold;
  }
  .videoBox {
    width: 100%;
    height: 350px;
    margin: 10px 0;
    background-color: black;
  }
}

.videoInfo {
  width: 100%;
  .user {
    display: flex;
    height: 60px;
    line-height: 60px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .singer {
      margin-right: auto;
    }
    .attention {
      background-color: blue;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      margin-top: 10px;
      background-color: #fef6f5;
      color: #ec4141;
    }
  }
}

.info {
  margin: 20px 0;
  .playCount {
    margin: 15px 0;
    font-size: 12px;
    color: #dcdcdc;
    .time {
      margin-right: 10px;
    }
  }
  .tags {
    display: flex;
    flex-direction: row;
    font-size: 12px;
    span {
      background-color: #dcdcdc;
      margin-right: 10px;
      padding: 3px;
      border-radius: 10px;
    }
  }
  .desc {
    width: 100%;
    font-size: 12px;
    margin: 10px 0 20px 0;
  }
}
.title {
  font-size: 22px;
  font-weight: bold;
}

.operation {
  display: flex;
  font-size: 14px;
  margin-bottom: 40px;
  .operationItem {
    padding: 7px 20px;
    border: 1px solid #dcdcdc;
    margin-right: 10px;
    border-radius: 20px;
    span {
      margin-left: 5px;
    }
  }
}
.comment {
  width: 100%;
}
.commentCount {
  width: 100%;
  margin-bottom: 20px;
  font-weight: bold;
}

.related {
  width: 40%;
  height: 500px;
}
.recommentItem {
  position: relative;
  display: flex;
  height: 100px;
  width: 350px;
  margin-top: 10px;
  img {
    position: absolute;
    width: 160px;
    height: 100px;
    border-radius: 10px;
  }
  .palyCount {
    position: absolute;
    left: 90px;
    font-size: 12px;
    color: white;
  }
  .time {
    position: absolute;
    bottom: 0;
    left: 110px;
    font-size: 14px;
    color: white;
  }
  .relatedInfo {
    position: absolute;
    left: 150px;
    margin-left: 20px;
    font-size: 14px;
    .desc {
      display: -weblit-box;
      -webkit-box-oritent: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 20px;
    }
    .ar {
      margin-top: 20px;
      color: #dcdcdc;
      font-size: 12px;
    }
  }
}
</style>