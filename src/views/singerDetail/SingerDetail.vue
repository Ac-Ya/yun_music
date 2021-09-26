<template>
  <div id="singerDetail">
    <!-- 头部歌手信息 -->
    <div class="singerInfo" v-if="singerInfo !== null">
      <img :src="singerInfo.artist.cover" alt="" />
      <div class="info">
        <div class="name">{{ singerInfo.artist.name }}</div>
        <div class="alias">{{ singerInfo.artist.name }}</div>
        <div class="operation">
          <div class="collect">
            <i class="iconfont icon-icon-test"></i>
            <span>收藏</span>
          </div>
          <div class="homePage">
            <i class="iconfont icon-yonghu1"></i>
            <span>个人主页</span>
          </div>
        </div>
        <div class="count">
          <span>单曲数:{{ singerInfo.artist.musicSize }}</span>
          <span>专辑数:{{ singerInfo.artist.albumSize }}</span>
          <span>mv数:{{ singerInfo.artist.mvSize }}</span>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="nav" @click="switchTag">
      <div :class="{ isClick: currentTag === '1' }" id="1">专辑</div>
      <div id="2" :class="{ isClick: currentTag === '2' }">MV</div>
      <div id="3" :class="{ isClick: currentTag === '3' }">歌手详情</div>
    </div>
    <!-- 专辑区域 -->
    <div
      class="album"
      v-if="(hotMusic !== null || albumsDetail !== null) && currentTag === '1'"
    >
      <!-- 热门50首 -->
      <div class="hot">
        <img src="../../assets/img/Hot.png" alt="" />
        <div class="musicList">
          <div class="title">热门50首</div>
          <music-table-item :mData="hotMusic" :musicListId="singerId">
            <i class="iconfont icon-xindong" slot="like"></i>
            <i class="iconfont icon-xiazai" slot="download"></i>
          </music-table-item>
        </div>
      </div>
      <!-- 其他专辑 -->
      <div class="otherAlbum" v-for="(item, index) in albums" :key="item.id">
        <img
          @click="toMusicListDetail(albumsId[index])"
          :src="item.picUrl"
          alt=""
        />
        <div class="publishedTime">{{ item.publishTime | formatTime }}</div>
        <div class="musicList">
          <div class="title">{{ item.name }}</div>
          <music-table-item
            :mData="albumsDetail[index]"
            :musicListId="singerId"
          >
            <i class="iconfont icon-xindong" slot="like"></i>
            <i class="iconfont icon-xiazai" slot="download"></i>
          </music-table-item>
        </div>
        <div class="more">查看更多({{ item.size }})首</div>
      </div>
    </div>
    <!-- mv区域 -->

    <!-- 歌手描述区域 -->
    <div class="singerDesc" v-if="currentTag === '3'">
      <div class="desc">
        <div class="title">歌手简介</div>
        <p class="content">{{singerDesc.briefDesc}}</p>
      </div>
      <div class="desc" v-for="item2 in singerDesc.introduction" :key="item2.ti">
        <div class="title">{{item2.ti}}</div>
        <p class="content">{{item2.txt}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MusicTable from "components/musicTable/MusicTable.vue";
import MusicTableItem from "components/musicTable/MusicTableItem.vue";
import { request } from "network/request.js";
import { formatTime } from "plugins/utils.js";
export default {
  name: "SingerDetail",
  components: { MusicTable, MusicTableItem },
  props: {},
  data() {
    return {
      currentTag: "1",
      hotMusic: [], //热门歌曲50首
      singerId: 0,
      singerInfo: null, //歌手信息
      albumPage: 1,
      albums: [], // 用于保存歌手的专辑
      albumsDetail: [], //用于保存专辑详情
      albumsId: [],
      singerDesc:null,
    };
  },
  filters: {
    formatTime(date) {
      return formatTime(new Date(date), false);
    },
  },
  created() {
    let singerId = +this.$route.query.id;
    this.singerId = singerId;
    this.getHotMusic(singerId);
    this.getSingerInfo(singerId);
    this.getSingerAlbum(singerId);
    this.getSingerDesc(singerId)
  },
  methods: {
    //切换标签
    switchTag(e) {
      if (/(1|2|3)/.test(+e.target.id)) {
        this.currentTag = e.target.id;
      }
    },
    //获取歌手热门50首歌曲
    async getHotMusic(id) {
      let res = await request({
        url: "/artist/top/song",
        method: "get",
        params: {
          id,
        },
      });
      if (res.data.code !== 200) {
        this.$message.error("数据请求失败，请稍后再试！");
        return;
      }
      this.hotMusic = res.data.songs;
    },
    //获取歌手详情信息
    async getSingerInfo(id) {
      let res = await request({
        url: "/artist/detail",
        method: "get",
        params: {
          id,
        },
      });
      if (res.data.code !== 200) {
        this.$message.error("数据获取失败，请稍后重试！");
      }
      this.singerInfo = res.data.data;
    },
    //获取歌手专辑信息
    async getSingerAlbum(id) {
      let res = await request({
        url: "/artist/album",
        method: "get",
        params: {
          id,
          limit: 30,
          offset: (this.albumPage - 1) * 30,
        },
      });
      let data = res.data;
      data.code !== 200 ? "" : (this.albums = data.hotAlbums);

      await data.hotAlbums.forEach((item) => {
        this.getAlbumDetail(item.id);
      });
    },
    //获取专辑详情
    async getAlbumDetail(id) {
      let res = await request({
        url: "/album",
        method: "get",
        params: {
          id,
        },
      });
      if (res.data.code !== 200) {
        return;
      }
      this.albumsId.push(res.data.album.id);
      this.albumsDetail.push(res.data.songs);
    },
    //获取歌手详情描述
    async getSingerDesc(id) {
      let res = await request({
        url: "/artist/desc",
        method: "get",
        params: {
          id,
        },
      });
      this.singerDesc = res.data
    },

    //跳转到专辑详情页
    toMusicListDetail(id) {
      console.log(id);
      // this.$router.push({
      //   path:"/musicListDetail",
      //   query:{
      //     id
      //   }
      // })
    },
  },
};
</script>
<style lang="less" scoped>
#singerDetail {
  padding: 20px;
}
// 头部歌手信息
.singerInfo {
  width: 100%;
  height: 180px;
  display: flex;
  margin-bottom: 20px;
  img {
    border-radius: 10px;
  }
  .info {
    width: 100%;
    height: 100%;
    margin-left: 20px;
    .name {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .alias {
      font-size: 14px;
    }
  }
}
.operation {
  display: flex;
  margin: 10px 0;
  .collect,
  .homePage {
    padding: 5px 10px;
    border: 1px solid #dedede;
    border-radius: 20px;
    margin-right: 10px;
    span {
      margin-left: 5px;
    }
  }
}
.count {
  display: flex;
  font-size: 14px;
  span {
    margin-right: 15px;
  }
}
//导航
.nav {
  display: flex;
  height: 35px;
  line-height: 35px;
  margin-bottom: 20px;
  div {
    margin-right: 10px;
  }
  .isClick {
    font-weight: bold;
    border-bottom: 3px solid #ec4141;
  }
}
//专辑
.album {
  width: 100%;
  margin-bottom: 100px;
}
.hot,
.otherAlbum {
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 80px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-right: 60px;
  }
  .musicList {
    flex: 1;
    width: 100px;
    // height: 385px;
    max-height: 385px;
    // overflow: hidden;
    overflow-y: scroll;
    .title {
      width: 100%;
      height: 35px;
      // line-height: 35px;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
.otherAlbum {
  //发表时间
  height: 210px;
  .publishedTime {
    position: absolute;
    top: 160px;
    left: 10px;
    font-size: 14px;
  }
  .more {
    position: absolute;
    bottom: -30px;
    right: 10px;
    font-size: 14px;
    font-weight: bold;
  }
}

//描述
.singerDesc {
  width: 100%;
  margin-bottom: 100px;
}
.desc {
  width: 100%;
  margin-bottom: 20px;
  .title {
    font-weight: bold;
  }
  .content {
    text-indent: 2rem;
    line-height: 2rem;
    font-size: 14px;
  }
}
</style>