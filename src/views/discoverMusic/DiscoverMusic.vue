<template>
  <div id="discoverMusic">
      <!-- v-for="(val,key) in navBarList" :key="key" -->
    <nav-bar class="navBar">
      <nav-bar-item 
      @click.native="handleClick(key)"
      v-for="(val,key) in navBarList" :key="key" :class="{navBarItem:borderB === key}">{{val}}</nav-bar-item>
      <!-- <nav-bar-item>歌单</nav-bar-item>
      <nav-bar-item>排行榜</nav-bar-item>
      <nav-bar-item>歌手</nav-bar-item>
      <nav-bar-item>最新音乐</nav-bar-item> -->
    </nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "components/navBar/NavBar.vue";
import NavBarItem from "components/navBar/NavBarItem.vue";
export default {
  name: "DiscoverMusic",
  components: {
    NavBar,
    NavBarItem,
  },
  props: {},
  data() {
    return {
      borderB:"recommendation", //当前的标签
      navBarList: {
        recommendation: "个性推荐",
        playlist: "歌单",
        top: "排行榜",
        singer:"歌手",
        newMusic:"最新音乐"
      },
    };
  },
  methods: {
    handleClick(key) {
        this.borderB = key   //修改当前点击的标签
        this.$router.push("/"+key)
    },
  },
};
</script>
<style lang="less" scoped>
    .navBarItem{
        font-size: 18px;
        font-weight: bold;
        border-bottom: 3px solid #ec4141;
    }
    .navBar{
        // width:1000px;
        width: 100%;
        position: fixed;
        z-index: 999;
        background-color: white;
    }
</style>