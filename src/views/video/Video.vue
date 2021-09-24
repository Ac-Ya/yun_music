<template>
  <div id="video">
    <m-nav :allTag="navBarList" :currentTag="currentRoute"></m-nav>
       <div class="show">
        <router-view></router-view>
      </div> 
          
  </div>
</template>

<script>
import MNav from "components/navBar2/MNavbar.vue";
export default {
  name: "Video",
  components: { MNav },
  props: {},
  data() {
    return {
      navBarList: {
        "/video/mVideo": "视频",
        "/video/MV": "MV",
      },
      currentRoute: "/video/mVideo",
    };
  },
  created() {
  },
  methods: {
    
  },
  mounted(){
      //可以在这里面直接进行滚动条的获取
    let video = document.getElementById("video")
    this.video = video
    this.video.addEventListener('scroll', this.handleScroll, true)

  },
  activated() {
      this.video.scrollTo({
        top:this.currentHeight
      })
  },
  deactivated() {
  },
};
</script>
<style lang="less" scoped>
#video {
  width: 100%;
}
.show {
  position: relative;
  top: 40px;
}
</style>