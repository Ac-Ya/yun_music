<template>
  <div id="lyricsScroll">
    <div class="lyricsItem" v-for="(item) in lyrics" :key="item[0]">{{item[1]}}</div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    // 实现歌词滚动
    // lyricScroll(currentLyric) {
    //   // 获取歌词item
    //   let lyricsArr = document.querySelectorAll(".lyricsItem");
    //   // 获取歌词框
    //   let lyrics = document.getElementById("lyricsScroll");
    //   // placeholder的高度
    //   if (placeholderHeight == 0) {
    //     placeholderHeight = lyricsArr[0].offsetTop - lyrics.offsetTop;
    //   }
    //   //   歌词item在歌词框的高度 = 歌词框的offsetTop - 歌词item的offsetTop
    //   //   console.log(currentLyric);
    //   if (lyricsArr[currentLyric - 1]) {
    //     let distance = lyricsArr[currentLyric - 1].offsetTop - lyrics.offsetTop;
    //     //   lyricsArr[currentLyric].scrollIntoView();
    //     lyrics.scrollTo({
    //       behavior: "smooth",
    //       top: distance - placeholderHeight,
    //     });
    //   }
    // },
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
  height: 35px;
  text-align: center;
  color: #dcdcdc;
}
</style>