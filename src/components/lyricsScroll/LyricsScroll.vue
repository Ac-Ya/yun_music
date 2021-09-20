<template>
  <div id="lyricsScroll">
    <div class="placeholder"></div>
    <div
      class="lyricsItem"
      :class="lyricsIndex - 1 == index ? 'currentLyric' : ''"
      v-for="(item, index) in lyrics"
      :key="index"
    >
      {{ item[1] }}
    </div>
    <!-- <div class="placeholder"></div> -->
  </div>
</template>

<script>
let placeholderHeight = 0;
export default {
  name: "LyricsScroll",
  components: {},
  props: {
    lyrics: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      // 当前歌词索引
      lyricsIndex: 0,
      currentPlayTime: 0,
    };
  },
  mounted() {},
  methods: {
    // 实现歌词滚动
    lyricScroll(currentLyric) {
      // 获取歌词item
      let lyricsArr = document.querySelectorAll(".lyricsItem");
      // 获取歌词框
      let lyric = document.getElementById("lyricsScroll");
      //   歌词item在歌词框的高度 = 歌词框的offsetTop - 歌词item的offsetTop
      if (lyricsArr[currentLyric]) {
        let distance = lyricsArr[currentLyric].offsetTop - lyric.offsetTop *2;
        // console.log(lyricsArr[currentLyric].offsetTop);
        lyric.scrollTo({
          behavior: "smooth",
          top: distance,
        });
      }
    },
    getCurrentLyricsIndex(currentTime) {
      let lyricsIndex = 0;
      this.lyrics.some((item) => {
        if (lyricsIndex < this.lyrics.length - 1) {
          if (currentTime > item[0]) {
            lyricsIndex += 1;
          }
          return currentTime <= item[0];
        }
      });
      // console.log(lyricsIndex);
      this.lyricsIndex = lyricsIndex;
    },
  },
  watch: {
    //监听当前歌曲播放时长
    "$store.state.currentPlayTime"(currentPlayTime, lastTime) {
      // console.log(currentPlayTime,lastTime);
      this.currentPlayTime = currentPlayTime;
      this.getCurrentLyricsIndex(currentPlayTime);
      if (
        (lastTime && Math.abs(currentPlayTime - lastTime) >= 1) ||
        (this.lyricsIndex == 0 && this.lyrics.length > 1)
      ) {
        // 处理播放时间跳转时歌词位置的校准
        if (this.lyrics.length > 1) {
          this.getCurrentLyricsIndex(currentPlayTime);
          // 滑动到当前歌词
          this.lyricScroll(this.lyricsIndex);
        }
      }
      // 根据实时播放时间实现歌词滚动
      // console.log(currentPlayTime,this.lyrics[this.lyricsIndex][0]);
      if (this.lyricsIndex < this.lyrics.length) {
        if (currentPlayTime <= this.lyrics[this.lyricsIndex][0]) {
          this.lyricScroll(this.lyricsIndex);
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
#lyricsScroll {
  position: absolute;
  top: 100px;
  right: 300px;
  width: 300px;
  height: 450px;
  overflow: hidden;
  overflow-y: scroll;
}
.lyricsItem {
  width: 100%;
  height: 25px;
  text-align: center;
  color: #696969;
  margin-bottom: 15px;
  font-size: 16px;
}
.currentLyric {
  font-weight: 600;
  font-size: 18px;
  color: black;
}
.placeholder {
  width: 100%;
  height: 30px;
}
</style>