<template>
  <div id="discoverMusic">
    <div class="navBar">
      <div @click="handleClick(key)"
        v-for="(val, key) in navBarList"
        :key="key"
        :class="{ navBarItem: currentRoute === key }" class="barItem">{{val}}</div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

let fatherRoute = "/discoverMusic/" 
export default {
  name: "DiscoverMusic",
  components: {
  },
  props: {},
  data() {
    return {
      currentRoute: "recommendation", //当前的标签
      navBarList: {
        recommendation: "个性推荐",
        playlist: "歌单",
        top: "排行榜",
        singer: "歌手",
        newMusic: "最新音乐",
      },
    };
  },
  computed:{
  },
  created() {
    this.strReplace(this.$route.path)
  },
  methods: {
    handleClick(key) {
      this.currentRoute = key; //修改当前点击的标签
      this.$router.push("/discoverMusic/" + this.currentRoute);
    },

    // 字符串替换
    strReplace(str){
      this.currentRoute = str.replace(fatherRoute,'')
    }
  },
  watch:{
    "$route.path"(n,o){
      this.strReplace(n)
      this.$router.push("/discoverMusic/" + this.currentRoute); 
    }
  }
};
</script>
<style lang="less" scoped>
#discoverMusic {
  width: 100%;
}

.navBarItem {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 3px solid #ec4141;
}
.navBar {
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 99;
  background-color: white;
  margin-left: 10px;
}
.barItem{
    margin-right: 20px;
    display: block;
    height: 35px;
    line-height: 35px;
}
.barItem:hover{
    font-weight: bold;
}
</style>