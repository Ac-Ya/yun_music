<template>
  <div id="musicDetail">
    <div class="inner" v-if="musicDetail !== null">
      <div class="bgImg" ></div>
      <!-- 音乐详情头部 -->
      <div class="header">
        <i class="iconfont icon-arrow_down" @click="showPlay"></i>
      </div>
      <div class="musicInfo">
        <!-- 音乐磁盘 -->
        <div class="track">
          <img
            src="../../assets/img/needle.png"
            alt=""
            class="needle"
            :class="{ isPlay: play }"
          />
          <div class="disk">
            <div
              class="diskAnimation"
              :class="{ aninationRunning: play, animationPause: !play }"
            >
              <img src="../../assets/img/disc.png" alt="" class="bDisk" />
              <img :src="musicDetail.al.picUrl" alt="" class="bg" />
            </div>
          </div>
        </div>
        <!-- 歌名和歌手名 -->
        <div class="musicName">
          <span class="name">{{musicDetail.al.name}}</span>
          <span class="singer">{{musicDetail.ar[0].name}}</span>
        </div>
        <!-- 歌词区域 -->
        <lyrics-scroll class="lyricsScroll" :lyrics="lyric"></lyrics-scroll>
        <!-- 评论区域 -->
        <comment
          class="comment"
          :commentType="+0"
          :sourceID="+this.currentMusicId"
        ></comment>
      </div>
    </div>
    <div class="inner2" v-else>
      <div class="header">
        <i class="iconfont icon-arrow_down" @click="showPlay"></i>
      </div>
      <span class="message">对不起暂时没有播放的音乐！</span>
    </div>
  </div>
</template>

<script>
import LyricsScroll from "components/lyricsScroll/LyricsScroll.vue";
import HeaderBar from "components/headerBar/HeaderBar.vue";
import Comment from "components/comment/Comment.vue";
import { request } from "network/request.js";
export default {
  name: "MusicDetail",
  components: { HeaderBar, LyricsScroll, Comment },
  props: {},
  data() {
    return {
      play: false,
      isShowDetail: false,
      lyric: [], //用于保存歌词
      currentMusicId: 0, //用于保存音乐id
      musicDetail: null,
    };
  },
  created() {},
  methods: {
    showPlay() {
      this.isShowDetail = false;
      this.$store.commit("modifyShowDetail", false);
    },
    //获取歌词
    async getLyric(id) {
      let res = await request({
        url: "/lyric",
        method: "get",
        params: {
          id,
        },
      });
      // console.log(res);
      if( res.data.lrc){
        let lyrics = res.data.lrc.lyric;
        // 对获取到的歌词进行处理
        let arr = lyrics.split("\n");
        let array = [];
        let time = "";
        let value = "";
        let result = [];

        //去除空行
        arr.forEach((item) => {
          if (item != "") {
            array.push(item);
          }
        });
        arr = array;
        arr.forEach((item) => {
          time = item.split("]")[0];
          value = item.split("]")[1];
          //去掉时间里的中括号得到xx:xx.xx
          var t = time.slice(1).split(":");
          //将结果压入最终数组
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
        this.lyric = result;
        arr = null,time = null,value= null, result = null
      }else {
        this.lyric = [[0,"纯音乐请享受！"]];
      }  

      // console.log(result);
    },
    //获取音乐信息
    async getMusicDetail(ids) {
      let res = await request({
        url: "/song/detail",
        method: "get",
        params: {
          ids,
        },
      });
      // console.log(res);
      this.musicDetail = res.data.songs[0];
    },
  },
  watch: {
    "$store.state.showDetail"(showDetail) {
      let currentMusicId = this.currentMusicId;
      //修改是否显示歌曲详情
      this.isShowDetail = showDetail;
      if (showDetail && currentMusicId ) {
        this.getLyric(currentMusicId);
        this.getMusicDetail(currentMusicId);
      }
    },
    "$store.state.currentMusic"(currentMusic) {
      this.currentMusicId = currentMusic.musicId;
      if (this.isShowDetail && this.currentMusicId ) {
        this.getLyric(currentMusic.musicId);
        this.getMusicDetail(currentMusic.musicId);
      }
    },
    "$store.state.isPlay"(isPlay){
      this.play = isPlay
    }
  },
};
</script>
<style lang="less" scoped>
.inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: height 0.5s linear;
  .bgImg {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-image: url("../../assets/img/tx.png");
    background: linear-gradient(45deg,rgba(254,172,94,0.5),rgba(199,121,208,0.5),rgba(75,192,200,0.5));

    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    transform: scale(1.2);
    filter:  brightness(0.8);
    // filter: blur(30px) brightness(0.8) drop-shadow(-10px 0 20px #000);

  }

  .musicInfo {
    position: relative;
    width: 1400px;
    height: 100%;
    left: 0;
    right: 0;
    top: 30px;
    bottom: 0;
    margin: auto;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .track {
      position: absolute;
      left: 200px;
      top: 20px;
    }
    .lyricsScroll {
      position: absolute;
    }
  }
}
.header {
  position: absolute;
  left: 20px;
  top: 20px;
  color: white;
  .iconfont {
    font-size: 30px;
  }
}
.inner2 {
  position: relative;
  width: 100%;
  height: 100%;
  transition: height 0.5s linear;
  background-color: #dcdcdc;
  .message {
    position: absolute;
    height: 100%;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    font-size: 30px;
    font-weight: bold;
  }
}

.disk {
  position: absolute;
  top: 150px;
  width: 300px;
  height: 300px;
  border: 15px solid rgba(245, 245, 245, 0.4);
  border-radius: 50%;
  .bDisk {
    position: absolute;
    width: 270px;
    height: 270px;
    z-index: 99;
  }
  .bg {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    top: 40px;
    left: 40px;
  }
}
.needle {
  position: absolute;
  top: 60px;
  left: 150px;
  transform-origin: top left;
  transform: rotate(0deg) scale(0.3);
  z-index: 99;
  transition: transform 0.8s;
}
.isPlay {
  transform: rotate(30deg) scale(0.3);
}

.musicName {
  width: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  .name {
    font-size: 30px;
    color: black;
  }
  .singer {
    font-size: 14px;
    margin-top: 10px;
    color: #dcdcdc;
  }
}
.comment {
  position: absolute;
  width: 70%;
  left: 15%;
  top: 600px;
}

/* 磁盘转动动画 */
.diskAnimation {
  width: 270px;
  height: 270px;
  animation: mymove 20s linear infinite;
  animation-delay: 0.8s;
}
@keyframes mymove {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animationPause {
  animation-play-state: paused;
  -webkit-animation-play-state: paused; /* Safari 和 Chrome */
}
.aninationRunning {
  animation-play-state: running;
  -webkit-animation-play-state: running; /* Safari 和 Chrome */
}
</style>