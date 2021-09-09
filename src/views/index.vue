
<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <!-- 内容主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside></el-aside>
      <!-- 主要内容区 -->
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderBar from "components/headerBar/HeaderBar";
export default {
  name: "vue",
  components: {
    HeaderBar,
  },
  props: {},
  data() {
    return {
      userInfo:null
    };
  },
};
</script>
<style scoped>
  .el-header{
    width: 100%;
    padding: 0;
    background-color: #EC4141;
  }
</style>