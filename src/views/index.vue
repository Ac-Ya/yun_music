
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
        <router-view></router-view>
      </el-main>
    </el-container>
    <footer class="musicControl">footer </footer>
  </el-container>
</template>

<script>
import HeaderBar from "components/headerBar/HeaderBar";
import AsideNav from "components/asideNav/AsideNav";

export default {
  name: "Index",
  components: {
    HeaderBar,
    AsideNav
  },
  props: {},
  data() {
    return {
      
    };
  },
  created(){
    // 判断用户是否登录
    
  },
  methods:{
  
  },
};
</script>
<style lang="less" scoped>
  #index{
    display: flex;
    height: 100vh;
  }
  .center{
    flex: 1;
  }
  .el-header{
    width: 100%;
    padding: 0;
    background-color: #EC4141;
  }
   .el-aside {
    color: #333;
  }
  
  .el-main {
    // background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    margin:15px 0 0 0;
    padding: 0;
    // line-height: 160px;
    // border: 1px solid red;
  }
  .musicControl{
    width: 100%;
    height: 80px;
    background-color: mediumaquamarine;
  }
</style>