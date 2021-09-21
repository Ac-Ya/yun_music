<template>
  <div id="video">
    <m-nav
      :allTag="navBarList"
      :currentTag="currentRoute"
      :currentPRoute="'/' + 'video' + '/'"
    ></m-nav>
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
        mVideo: "视频",
        MV: "MV",
      },
      currentRoute: "mVideo",
    };
  },
  methods: {
    
  },
};
</script>
<style lang="less" scoped>
#video {
  width: 100%;
}
.show{
  position: relative;
  top: 40px;
}
</style>