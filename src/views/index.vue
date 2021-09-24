
<template>
  <el-container id="index">
    <!-- 头部 -->
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <!-- 内容主体 -->
    <el-container class="center">
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <aside-nav></aside-nav>
      </el-aside>
      <!-- 主要内容区 -->
      <el-main>
        <keep-alive include="Video">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
    <music-detail
      class="musicDetail"
      :class="{ hide: isShowDetail }"
    ></music-detail>
    <bottom-control
      class="musicControl"
      v-show="isShowBottomControl"
    ></bottom-control>
  </el-container>
</template>

<script>
import HeaderBar from "components/headerBar/HeaderBar";
import AsideNav from "components/asideNav/AsideNav";
import MusicDetail from "components/musicDetail/MusicDetail";
import BottomControl from "components/bottomControl/BottomControl.vue";
export default {
  name: "Index",
  components: {
    HeaderBar,
    AsideNav,
    MusicDetail,
    BottomControl,
  },
  props: {},
  data() {
    return {
      isShowDetail: false,
      isShowBottomControl: true,
    };
  },
  created() {
    // 判断用户是否登录
  },
  methods: {},
  watch: {
    "$store.state.showDetail"(showDetail) {
      this.isShowDetail = showDetail;
    },
    //用于监听底部控制栏的显示
    "$store.state.showBottomControl"(showControl) {
      this.isShowBottomControl = showControl;
    },
  },
};
</script>
<style lang="less" scoped>
#index {
  display: flex;
}

.el-header {
  position: fixed;
  width: 100%;
  padding: 0;
  background-color: #ec4141;
  z-index: 999;
}
.el-aside {
  position: fixed;
  color: #333;
  border-right: 1px solid #dcdcdc;
  height: calc(100vh - 130px);
}
.center {
  flex: 1;
  position: absolute;
  top: 60px;
}

.el-main {
  color: #333;
  padding: 0;
  position: absolute;
  left: 200px;
  width: calc(100vw - 210px);
}
.musicControl {
  position: fixed;
  display: flex;
  justify-content: space-between;
  left: 0;
  bottom: 0;
  height: 70px;
  background-color: #fff;
  z-index: 9999;
  align-items: center;
  border-top: 1px solid #dcdcdc;
}

.musicDetail {
  width: 100%;
  height: 0;
  position: fixed;
  transition: height 0.5s linear;
  background-color: #fff;
  z-index: 999;
  bottom: 70px;
}
.hide {
  height: calc(100vh - 70px);
  transition: height 0.5s linear;
}
</style>