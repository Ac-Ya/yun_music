<template>
  <div id="musicListDetail">
    <!-- 音乐榜单信息区域 -->
    <div class="listInfo" v-if="musicListData !== null">
      <div class="cover">
        <img :src="musicListData.coverImgUrl" alt="" />
      </div>
      <div class="info">
        <div class="listName">
          <span>{{ musicListData.name }}</span>
        </div>
        <div class="listAuthor">
          <img :src="musicListData.creator.avatarUrl" alt="" />
          <span>{{ musicListData.creator.nickname }}</span>
          <span>{{ musicListData.updateFrequency }}</span>
        </div>
        <div class="listControl">
          <div class="playAll">
            <i class="iconfont icon-bofang4"></i>
            <span>播放全部</span>
            <i class="iconfont icon-icon-test1"></i>
          </div>
          <div>
            <i class="iconfont icon-icon-test"></i>
            <span>收藏（{{ count(musicListData.subscribedCount, 0) }}）</span>
          </div>
          <div>
            <i class="iconfont icon-fenxiang"></i>
            <span>分享（{{ musicListData.shareCount }}）</span>
          </div>
          <div>
            <i class="iconfont icon-xiazai"></i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="des">
          <span
            >歌曲:{{ musicListData.trackCount }} 播放:{{
              count(musicListData.playCount)
            }}</span
          >
          <span>简介:{{ musicListData.description }}</span>
        </div>
      </div>
    </div>
    <!-- 列表 ，评论和收藏者区域 -->
    <div class="nav" v-if="musicListData !== null" @click="switchTag">
      <div :class="{ isClick: currentTag === '1' }" id="1">歌曲列表</div>
      <div id="2" :class="{ isClick: currentTag === '2' }">
        评论({{ count(musicListData.commentCount, 0) }})
      </div>
      <div id="3" :class="{ isClick: currentTag === '3' }">收藏者</div>
    </div>
    <!-- 列表区域 -->
    <div v-if="currentTag === '1'">
      <music-table class="tableHeader">
        <div class="album" slot="album">专辑</div>
        <div class="burningTime" slot="burningTime">时长</div>
      </music-table>
      <music-table-item :mData="musicData" :musicListId="playListId">
        <i class="iconfont icon-xindong" slot="like"></i>
        <i class="iconfont icon-xiazai" slot="download"></i>
      </music-table-item>
      <!-- 加载更多 -->
      <div v-show="isMore" class="loadMore" @click="loadMore">加载更多</div>
    </div>
    <!-- 评论区域 -->
    <!-- 传入评论类型type  资源id-->
    <comment v-if="currentTag === '2'" class="comment" :commentType="+2" :sourceID="+this.$route.query.id"></comment>
  </div>
</template>

<script>
import MusicTable from "components/musicTable/MusicTable.vue";
import MusicTableItem from "components/musicTable/MusicTableItem.vue";
import Comment from "components/comment/Comment.vue";
import { tranNumber } from "plugins/utils.js";
import { request } from "network/request.js";

export default {
  name: "MusicListDetail",
  components: { MusicTable, MusicTableItem, Comment },
  props: {},
  data() {
    return {
      currentTag: "1",
      ids: "", //用于保存加载更多是的参数
      isMore: false, //是否需要加载跟多
      musicListData: null,
      musicData: [], //歌单的音乐详情列表
      hotCommentData:[],//热门评论数据
      playListId:0,//歌单的id
    };
  },
  created() {
    // 要判断登录
    // console.log(this.$route.query.id);
    this.playListId = +this.$route.query.id
    this.getMusicListData(+this.$route.query.id);
  },
  computed: {
    count() {
      return (num, point) => {
        return tranNumber(num, point);
      };
    },
  },
  methods: {
    // 获取音乐列表数据
    async getMusicListData(id) {
      let res = await request({
        url: "/playlist/detail",
        method: "get",
        params: {
          id,
        },
      });
      // console.log(res);
      let data = res.data.playlist;
      /*
        1、如果isMore 为true 说明需要显示加载更多 
            然后判断用户是否登录，如果登录就显示加载更多
            如果没登陆就不显示加载更多
        2、如过isMore 为false 
          说明不需要显示加载更多
      */
      data.trackIds.length === data.tracks.length
        ? this.isMore
        : this.getIds(data.trackIds);
      this.musicListData = data;
      this.musicData = data.tracks;
    },
    getIds(trackIds) {
      // 显示加载更多按钮
      this.isMore = true;
      let ids = "";
      trackIds.forEach((item) => {
        ids += item.id + ",";
      });
      ids = ids.substr(0, ids.length - 1);
      this.ids = ids;
      ids = null;
    },
    //加载更多点击事件
    async loadMore() {
      // 要判断登录
      let res = await request({
        url: "/song/detail",
        method: "get",
        params: {
          ids: this.ids,
        },
      });
      this.isMore = false;
      this.musicData = res.data.songs;
      this.$store.commit('currentMusicList',res.data.songs)
    },
    switchTag(e) {
      if (/(1|2|3)/.test(+e.target.id)) {
        this.currentTag = e.target.id;
      }
    },

    // async isLogin(){
    //   let res = await request({
    //     url:'/login/status',
    //     method:'get'
    //   })
    // }
    playMusic(e){
      console.log(e);
    }
  },
};
</script>
<style lang="less" scoped>
#musicListDetail {
  width: 100%;
  min-width: 1100px;
  margin-bottom: 80px;
}
.listInfo {
  width: 100%;
  padding: 20px;
  display: flex;
  .cover img {
    width: 180px;
    height: 180px;
    border-radius: 10px;
  }
}
.info {
  margin-left: 20px;
  .listAuthor {
    display: flex;
    height: 30px;
    border-radius: 50%;
    line-height: 30px;
    img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    span {
      font-size: 12px;
      margin: 0 10px;
    }
  }
  .listName {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
}
.listControl {
  display: flex;
  font-size: 14px;
  margin: 10px 0;
  div {
    border: 1px solid #dcdcdc;
    margin-right: 10px;
    padding: 5px;
    border-radius: 20px;
    &:hover {
      background-color: #dcdcdc;
    }
  }
  .playAll {
    background-color: #ec4141;
    color: white;
  }
}
.des {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  span {
    width: 600px;
    margin: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.nav {
  display: flex;
  height: 35px;
  line-height: 35px;
  padding-left: 20px;
  div {
    margin-right: 10px;
  }
  .isClick {
    font-weight: bold;
    border-bottom: 3px solid #ec4141;
  }
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

.loadMore {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #dcdcdc;
  margin: 10px auto;
  &:hover {
    background-color: #dcdcdc;
  }
}

// 评论区域
.comment {
  padding: 20px;
  width: 100%;
  margin-bottom: 70px;
}
/deep/ .el-textarea__inner {
  height: 65px;
  font-size: 12px;
}
/deep/ .el-textarea__inner:focus {
  border-color: #ec4141;
}
</style>