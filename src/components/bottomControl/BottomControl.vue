<template>
  <div id="bottomControl">
    <audio
      :src="musicUrl"
      ref="audioPlayer"
      @timeupdate="timeUpdate"
      @ended="playEnd"
      autoplay
    ></audio>
    <div class="coverImg">
      <div
        class="img"
        @mouseenter="enter"
        @mouseleave="leave"
        @click="showDetail"
      >
        <img :src="musicDetail.al.picUrl" alt="" v-if="musicDetail" />
        <img src="../../assets/img/tx2.jpg" alt="" v-else />
        <i class="iconfont icon-up" :class="{ showUp: showUp }"></i>
      </div>
      <div class="musicInfo" v-if="musicDetail">
        <span class="name">{{ musicDetail.name }}</span>
        <span class="singer">{{ musicDetail.ar[0].name }}</span>
      </div>
    </div>

    <div class="playControl">
      <div class="top">
        <i class="iconfont" @click="changePlayModel" :class="showIcon"></i>
        <!-- 上一首 -->
        <i class="iconfont icon-shangyishou" @click="changeMusic('pre')"></i>
        <!-- 播放暂停 -->
        <i
          class="iconfont"
          :class="{ 'icon-Path': !isPlay, 'icon-zantingtingzhi': isPlay }"
          @click="handlePlay"
        ></i>
        <!-- 下一首 -->
        <i class="iconfont icon-audio-up" @click="changeMusic('next')"></i>
      </div>
      <div class="bottom">
        <span>{{ currentTime | handleMusicTime }}</span>
        <el-slider
          @change="changeProgress"
          v-model="progressTime"
          :show-tooltip="false"
          class="progress"
        ></el-slider>
        <!-- :max="(musicDetail ? musicDetail.dt : 100) | maxLength" -->
        <span>{{ (musicDetail ? musicDetail.dt : 0) | handleMusicTime }}</span>
      </div>
    </div>
    <div class="musicList" @click="showDrawer = !showDrawer">
      <i class="iconfont icon-gedan"></i>
    </div>
    <el-drawer :visible.sync="showDrawer" :with-header="false">
      <!-- 没有列表数据的时候显示 -->
      <!-- <div class="message" v-show="true">对不起暂无数据</div> -->
      <div class="listData" v-show="true">
        <div class="drawerHeader">
          当前播放:<span class="musicCount">总({{ musicList.length }})首</span>
        </div>
        <div
          class="musicItem"
          v-for="(item, index) in musicList"
          :key="item.id"
          :class="{
            showBg: index % 2 == 0,
            showColor: currentIndex == index,
          }"
          @dblclick="playMusic(item.id, index)"
        >
          <i
            class="iconfont icon-zhengzaibofang"
            v-show="currentIndex == index"
          ></i>
          <div class="name">{{ item.name }}</div>
          <div class="singer">{{ item.ar[0].name }}</div>
          <div class="playTime">{{ item.dt | handleMusicTime }}</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
let durationNum = 0;
let time = 0;
import { request } from "network/request.js";
import { handleMusicTime, randomNum } from "plugins/utils.js";
export default {
  name: "BottomControl",
  components: {},
  props: {},
  data() {
    return {
      progressTime: 0, //用于显示进度条已播放的长度
      currentTime: "00:00", //当前音乐播放的时间
      icons: {
        0: "icon-bofangliebiao",
        1: "icon-suijibofang",
        2: "icon-danquxunhuan",
      },
      currentIcon: 0,
      isPlay: true,
      musicUrl: "", //当前播放音乐的url
      showUp: false,
      musicDetail: null,
      totalTime: 0,
      currentIndex: -1,
      showDrawer: false,
      musicList: [], //用于展示抽屉的音乐数据
    };
  },
  computed: {
    showIcon() {
      return this.icons[this.currentIcon];
    },
  },
  filters: {
    handleMusicTime,
    maxLength(time) {
      return parseInt(time / 1000);
    },
  },
  methods: {
    // 改变播放模式
    changePlayModel() {
      let currentIcon = this.currentIcon;
      currentIcon >= 2 ? (this.currentIcon = 0) : this.currentIcon++;
      this.$store.commit("updatePlayModel", this.currentIcon);

      currentIcon = null;
    },
    //处理点击播放或暂停按钮时间
    handlePlay() {
      let isPlay = !this.isPlay;
      let audioPlayer = this.$refs.audioPlayer;
      if (isPlay && this.musicUrl) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      this.isPlay = isPlay;
      // 修改保存在vuex中的播放状态
      this.$store.commit("currentPlayState", isPlay);
    },

    // 处理鼠标移入移除事件
    enter() {
      this.showUp = true;
    },
    leave() {
      this.showUp = false;
    },
    // 是否显示歌曲详情栏
    showDetail() {
      let showDetail = this.$store.state.showDetail;
      //修改showDetail
      this.$store.commit("modifyShowDetail", !showDetail);
    },
    //进度条改变
    changeProgress(value) {
      this.currentTime = value;
      if (!this.musicUrl) {
        return;
      }
      this.$refs.audioPlayer.currentTime = Math.floor(
        (value / 100) * durationNum
      );
    },
    //播放时间的监听
    timeUpdate() {
      //获取当前播放时间
      if (!this.musicUrl) {
        return;
      }
      time = this.$refs.audioPlayer.currentTime;
      this.$store.commit("modifyPlayTime", time);
      time = Math.floor(time);
      this.currentTime = time;
      this.progressTime = Math.floor((time / durationNum) * 100);
    },

    //音乐播放结束
    playEnd() {
      // 判断播放模式，如果是循环播放
      let currentIcon = this.$store.state.musicModel;
      // console.log(currentIcon);
      if (currentIcon == 2) {
        this.$refs.audioPlayer.play();
      } else {
        this.changeMusic("next");
      }
    },
    //切换音乐
    changeMusic(model) {
      let state = this.$store.state;
      // 获取当前的音乐播放模式
      let currentIcon = state.musicModel;
      //获取当前音乐所在index,和当前音乐所在的音乐列表,当前音乐列表的长度
      let index = state.currentMusic.index;
      if (index == -1) {
        return;
      }
      let currentMusicList = state.musicList;
      let listLength = currentMusicList.length;

      if (currentIcon == 2 || currentIcon == 0) {
        //单曲循环或顺序播放
        if (model == "next") {
          index = index + 1;
          index >= listLength ? (index = 0) : index;
          this.modify(index, currentMusicList);
          return;
        } else {
          index = index - 1;
          index < 0 ? (index = listLength - 1) : index;
          this.modify(index, currentMusicList);
          return;
        }
      } else if (currentIcon == 1) {
        //随机播放
        let num = Math.floor(Math.random() * 10);
        if (model == "next") {
          index = index + num;
          index >= listLength ? (index = 0) : index;
          this.modify(index, currentMusicList);
          return;
        } else {
          index = index - num;
          index < 0 ? (index = listLength - 1) : index;
          this.modify(index, currentMusicList);
        }
      }
    },
    //修改音乐Id ,index
    modify(index, currentMusicList) {
      this.$store.commit("modifyMusicId", {
        musicId: currentMusicList[index].id,
        index,
      });
    },

    //获取歌曲详情
    async getMusicDetailData(ids) {
      let res = await request({
        url: "/song/detail",
        method: "get",
        params: {
          ids,
        },
      });
      // console.log(res);
      let data = res.data.songs[0];
      this.musicDetail = data;
      this.totalTime = parseInt(data.dt / 1000) + 1;
      durationNum = parseInt(data.dt / 1000) + 1;
      (data = null), (res = null);
    },
    //获取歌曲的url
    async getMusicUrl(id) {
      this.isPlay = true;
      let res = await request({
        url: "/song/url",
        method: "get",
        params: {
          id,
        },
      });
      // console.log(res);
      if (res.data.data[0].url == null) {
        this.$message.error("该歌曲暂无版权。");
        // this.changeMusic("next");
        return;
      }
      this.musicUrl = res.data.data[0].url;
    },
    //双击播放
    playMusic(musicId, index) {
      let store = this.$store;
      this.currentIndex = index;
      //将当前音乐id保存在vuex中
      store.commit("modifyMusicId", { musicId, index });
      store.commit("currentPlayState", true);
    },
  },
  watch: {
    //监听musicId,
    async "$store.state.currentMusic"(currentMusic) {
      // console.log(currentMusic);
      //清空当前音乐
      this.musicUrl = "";
      this.musicId = currentMusic.musicId;
      this.value1 = 0;
      this.currentIndex = currentMusic.index;
      await this.getMusicDetailData(currentMusic.musicId);
      await this.getMusicUrl(currentMusic.musicId);

      if (currentMusic.state === "push") {
        let musicList = this.$store.state.musicList;
        musicList = [this.musicDetail]
        this.$store.commit("currentMusicList", musicList);
      }
    },
    "$store.state.showBottomControl"(showControl) {
      if (!showControl) {
        this.$refs.audioPlayer.pause();
        this.$store.commit("currentPlayState", showControl);
        this.isPlay = showControl;
      }
    },
    "$store.state.musicList"(musicList) {
      // console.log(musicList);
      this.musicList = musicList;
    },
  },
};
</script>
<style lang="less" scoped>
#bottomControl {
  width: 100%;
  // overflow: hidden;
  .coverImg {
    width: 200px;
    display: flex;
    height: 50px;
  }
  .musicInfo {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    span {
      width: 120px;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.img {
  margin: 0 10px;
  width: 50px;
  height: 50px;
  position: relative;
  border-radius: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 5px;
  }
  .iconfont {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate(30%, 25%);
    font-size: 20px;
    color: white;
    display: none;
  }
  .showUp {
    display: block;
  }
}
.playControl {
  width: 450px;
  // flex: 1;
  margin: auto;
  height: 100%;
}

.top {
  margin: 10px 0 5px 90px;
  display: flex;
  width: 200px;
  justify-content: space-between;
  .iconfont {
    font-size: 20px;
  }
}
.bottom {
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 12px;
  .progress {
    margin: 0 10px;
    width: 350px;
  }
}

.musicList {
  position: absolute;
  // width: 100px;
  right: 10px;
  margin-right: 30px;
  .iconfont {
    font-size: 30px;
  }
}

.listData {
  width: 100%;
  margin-bottom: 70px;
  .drawerHeader {
    position: fixed;
    width: 100%;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdcdc;
    // margin: 10px 10px 0 10px;
    padding: 10px 0 0 10px;
    background-color: #fff;
    z-index: 99;
    .musicCount {
      font-size: 14px;
      color: #dcdcdc;
    }
  }
}
.musicItem {
  position: relative;
  top: 40px;
  width: 100%;
  height: 35px;
  display: flex;
  line-height: 35px;
  font-size: 12px;
  .name,
  .singer {
    padding-left: 30px;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover {
    background-color: #f2f2f2;
  }
  .iconfont {
    position: absolute;
    color: #ec4141;
    margin-left: 5px;
  }
}
.showBg {
  background-color: #f9f9f9;
}
.showColor {
  color: #ec4141;
  background-color: #fbeeed;
}
</style>