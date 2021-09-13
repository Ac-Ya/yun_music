
<template>
  <el-container id="index">
    <!-- 头部 -->
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <!-- 内容主体 -->
    <el-container class="center" >
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
  
  .el-header{
    position: fixed;
    width: 100%;
    padding: 0;
    background-color: #EC4141;
    z-index: 999;
  }
  .el-aside {
    position: fixed;
    color: #333;
    border-right: 1px solid #DCDCDC;
    height: calc(100vh - 130px);
  }
  .center{
    flex: 1;
    position: absolute;
    top: 60px;
  }
  
  .el-main {
    color: #333;
    padding: 0;
    position: absolute;
    left: 210px;
    width: calc(100vw - 200px);
  }
  .musicControl{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: mediumaquamarine;
    z-index: 999;
  }

</style>