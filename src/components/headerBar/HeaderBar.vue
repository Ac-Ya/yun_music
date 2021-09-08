<template>
  <div id="headerBar">
    <!-- 左边logo区域 -->
    <div class="logo">
      <img src="../../assets/img/login.png" alt="" />
    </div>

    <!-- 中间搜索框区域 -->
    <div class="center">
        <!-- 上一页 -->
      <div class="pre">
         <i class="iconfont icon-shangyiye"></i>
      </div>
        <!-- 下一页 -->
      <div class="next">
        <i class="iconfont icon-xiayiye"></i>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索" >
      </div>
      <!-- 听歌识曲 -->
      <div class="soundHound">
        <i class="iconfont icon-tinggeshiqu"></i>
      </div>
    </div>

    <!-- 右边控制区域 -->
    <div class="headerControl">
        <div class="login">
          <img src="../../assets/img/tx.png" alt="">
          <span class="loginInfo">点击头像登录</span>
          <i class="iconfont icon-xiangxia"></i>
        </div>
        <div class="constrol">
          <i class="iconfont icon-pifu"></i>
          <i class="iconfont icon-shezhi"></i>
          <i class="iconfont icon-xiaoxi1"></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  components: {},
  props: {},
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
@color:#fff;
#headerBar {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
}
/* logo区域 */
.logo {
  height: 100%;
  width: 200px;
  text-align: center;
}
.logo img {
  width: 150px;
  margin-top: 10px;
}
/* center区域 */
.center{
  display: flex;
  align-items: center;
  height: 100%;
  /* line-height: 60px; */
  padding-left: 30px;

  flex: 1;
}
/*center 上一页下一页区域 */
.pre,.next{
  height: 25px;
  width: 25px;
  line-height: 25px;
  text-align: center;
  color: rgba(211,211, 211, .5);
  background-color: rgba(88, 29, 29, 0.1);
  border-radius: 50%;
  margin: 0 3px;
}



/* 中部搜索框样式 */
.center .search{
  width: 160px;
  height: 30px;
  /* border: 1px solid yellowgreen; */
  margin: auto 10px;
  border-radius: 20px;
  line-height: 30px;
  padding-left: 10px;
  background-color: rgba(88, 29, 29, 0.1);
}
.search i{
  color:@color;
}
.search input{
  width: 120px;
  margin-left: 5px;
  color:@color;
  border: none;
  /* 背景透明 */
  background-color: transparent;
}
/*兼容浏览器 */
.search input::-webkit-input-placeholder {
    color:rgba(211,211, 211, .5) ;
    font-size: 12px;
}
/* Mozilla Firefox 4 to 18 */
.search input:-moz-placeholder {
    color:rgba(211,211, 211, .5);
    opacity: 1;
    font-size: 12px;
}
/* Mozilla Firefox 19+ */
.search input::-moz-placeholder {
    color:rgba(211,211, 211, .5);
    opacity: 1;
    font-size: 12px;
}
/* Internet Explorer 10+ */
.search input:-ms-input-placeholder {
    color:rgba(211,211, 211, .5);
    font-size: 12px;
}


/* 选中时没有边框 */
.search input:focus{
     outline: none;
}

/* 听歌识曲区域*/
.soundHound{
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: rgba(88, 29, 29, 0.1);
  border-radius: 50%;
  color: 	#DCDCDC;
}

/*右边头部控制栏区域 */
.headerControl{
  display: flex;
  width: 300px;
  height:60px;
  line-height: 60px;
  flex-direction:row;
  align-self: flex-end;
}
.headerControl .login{
  display: flex;
  align-items: center;
  height: 60px;

}
.login img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.login span,.login .iconfont{
  font-size: 12px;
  color: #fff;
  margin-left: 5px;
}
.constrol{
  display: flex;
  width: 150px;
  height: 60px;

  justify-content: space-around;
}
.constrol .iconfont{
  font-size: 18px;
  color: #fff;
}
</style>