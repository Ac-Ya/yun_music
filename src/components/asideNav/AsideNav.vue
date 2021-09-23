<template>
  <div id="asideNav">
    <ul
      class="musicOperation"
      v-for="(val, key) in operationList1"
      :key="key"
      @click="to(key)"
    >
      <li :class="{ pickOn: click === key }">{{ val }}</li>
    </ul>
    <div class="myMusic">我的音乐</div>
    <ul
      class="personOperation"
      v-for="(val2, key2) in operationList2"
      :key="key2"
      @click="to(key2)"
    >
      <li :class="{ pickOn: click === key2 }">
        <i class="iconfont" :class="iconfontList[key2]"></i>
        <span>{{ val2 }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AsideNav",
  components: {},
  props: {},
  data() {
    return {
      // click: "discoverMusic", //用于定位当前点击的li
      click:'',
      operationList1: {
        discoverMusic: "发现音乐",
        video: "视频",
        radio: "电台",
        dynamic: "动态",
        PrivateFM: "私人FM",
      },
      operationList2: {
        recentPlay: "最近播放",
        cloudDisk: "音乐云盘",
        collection: "我的收藏",
        like: "我的喜欢",
        collectPlaylist: "收藏的歌单",
      },
      iconfontList: {
        recentPlay: "icon-zuijinbofang",
        cloudDisk: "icon-yunpan",
        collection: "icon-favorite",
        like: "icon-xindong",
        collectPlaylist: "icon-gedan",
      },
    };
  },
  created() {
    // console.log(this.$route.path);
    this.pattern(this.$route.path);
  },
  methods: {
    to(key) {
      this.click = key;
      this.$router.push("/" + key);
    },
    pattern(str) {
      const subString = str.split("/")[1];
      this.click = subString
    },
  },

  // watch: {
  //   "$route.path"(n,o){
  //     this.strReplace(n)
  //     // this.$router.push(n);
  //   }
  // },
};
</script>
<style lang="less" scoped>
#asideNav {
  padding: 10px 10px 0 20px;
  // li的样式
  .musicOperation li,
  .personOperation li {
    width: 170px;
    height: 35px;
    line-height: 35px;
    margin-top: 5px;
    padding-left: 3px;
    border-radius: 5px;
  }
  // li移入效果
  .musicOperation li:hover,
  .personOperation li:hover {
    background-color: #f5f5f5;
  }
}
.myMusic {
  margin: 10px 0;
  font-size: 14px;
  color: #c0c0c0;
}
.personOperation .iconfont {
  font-weight: bold;
  margin-right: 10px;
}

.pickOn {
  font-weight: bold;
  background-color: #f5f5f5;
}
</style>