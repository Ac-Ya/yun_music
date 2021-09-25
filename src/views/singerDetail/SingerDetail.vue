<template>
  <div id="singerDetail">
    <!-- 头部歌手信息 -->
    <div class="singerInfo">
      <img src="../../assets/img/tx.png" alt="" />
      <div class="info">
        <div class="name">薛之谦</div>
        <div class="alias">Joker Xue</div>
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
          <span>单曲数:223</span>
          <span>专辑数:18</span>
          <span>mv数:92</span>
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
    <div class="album">
      <!-- 热门50首 -->
      <div class="hot">
        <img src="../../assets/img/tx.png" alt="" />
        <div class="musicList">
          <div class="title">热门50首</div>
          <music-table-item :mData="hotMusic" :musicListId="singerId">
            <i class="iconfont icon-xindong" slot="like"></i>
            <i class="iconfont icon-xiazai" slot="download"></i>
          </music-table-item>
        </div>
      </div>
      <!-- 其他专辑 -->
      <div class="otherAlbum">
        <img src="../../assets/img/tx.png" alt="" />
        <div class="publishedTime">2020-9-9</div>
        <div class="musicList">
          <div class="title">天外来物</div>
          <music-table-item :mData="hotMusic" :musicListId="singerId">
            <i class="iconfont icon-xindong" slot="like"></i>
            <i class="iconfont icon-xiazai" slot="download"></i>
          </music-table-item>
        </div>
        <div class="more">查看更多(12首)</div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicTable from "components/musicTable/MusicTable.vue";
import MusicTableItem from "components/musicTable/MusicTableItem.vue";
import { request } from "network/request.js";
export default {
  name: "SingerDetail",
  components: { MusicTable, MusicTableItem },
  props: {},
  data() {
    return {
      currentTag: "1",
      hotMusic: [], //热门歌曲50首
      singerId: 0,
      singerInfo:null,//歌手信息
    };
  },
  created() {
    let singerId = +this.$route.query.id
    this.singerId = singerId
    this.getHotMusic(singerId);
    this.getSingerInfo(singerId)
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
    //   console.log(res);
      if (res.data.code !== 200) {
        this.$message.error("数据请求失败，请稍后再试！");
        return;
      }
      this.hotMusic = res.data.songs;
    },
    //获取歌手详情信息
    async getSingerInfo(id){
        let res = await request({
            url:'/artist/detail',
            method:'get',
            params:{
                id
            }
        })
        console.log(res);
    }
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
.hot,.otherAlbum{
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
    overflow-y:scroll;
    .title {
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
.otherAlbum{
  //发表时间   
  height: 210px;
  .publishedTime{
      position: absolute;
      top:160px ;
      left: 10px;
      font-size: 14px;
  }
  .more{
      position: absolute;
      bottom: -30px;
      right: 10px;
      font-size: 14px;
      font-weight: bold;
  }
}
</style>