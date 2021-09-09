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
        <input type="text" placeholder="搜索" />
      </div>
      <!-- 听歌识曲 -->
      <div class="soundHound">
        <i class="iconfont icon-tinggeshiqu"></i>
      </div>
    </div>

    <!-- 右边控制区域 -->
    <div class="headerControl">
      <div class="login">
        <img :src="userInfo.avatarUrl" alt="" v-if="userInfo.avatarUrl" />
        <img src="../../assets/img/tx.png" alt="" v-else/>
        <span class="loginInfo" v-if="userInfo.nickname">{{userInfo.nickname}}</span>
        <span class="loginInfo" v-else>点击头像登录</span>
        <i class="iconfont icon-xiangxia" @click="loginOrInfo"></i>
      </div>

      <div class="constrol">
        <i class="iconfont icon-pifu"></i>
        <i class="iconfont icon-shezhi"></i>
        <i class="iconfont icon-xiaoxi1"></i>
      </div>
    </div>
    <!-- 下拉扫描二维码登录 -->
    <div class="qrLogin" v-if="showQr" :class="{isShow:show}">
      <p class="p1">扫码登陆</p>
      <div class="qr">
        <img src="../../assets/img/wyyqr.png" alt="" />
        <p class="p2">使用网易云APP扫码登陆</p>
      </div>

      <div class="otherLoginMethod"><span>选择其它登录方式</span>></div>
    </div>
    <!-- 登录后的下拉的个人信息 -->
    <div class="userInfo" v-else :class="{isShow:show}">
      <div class="info">
        <div class="infoItem">
          <span class="s1">{{userInfo.eventCount}}</span>
          <span class="s2">动态</span>
        </div>
        <div class="infoItem">
          <span class="s1">{{userInfo.follows}}</span>
          <span class="s2">关注</span>
        </div>
        <div class="infoItem">
          <span class="s1">{{userInfo.followeds}}</span>
          <span class="s2">粉丝</span>
        </div>
      </div>
      <div class="signIn">签到</div>
      <div class="line"></div>
      <div class="infoList">
        <ul class="infoUl">
          <li class="listItem">
            <i class="iconfont icon-huiyuan"></i>
            <span>会员中心</span>
            <i class="iconfont icon-xiayiye jump"></i>
          </li>
          <li class="listItem">
            <i class="iconfont icon-dengji"></i>
            <span>等级</span>
            <i class="iconfont icon-xiayiye jump"></i>
          </li>
          <li class="listItem">
            <i class="iconfont icon-shouye"></i>
            <span>商城</span>
            <i class="iconfont icon-xiayiye jump"></i>
          </li>
        </ul>
        <div class="line"></div>
        <ul class="infoUl">
          <li class="listItem">
            <i class="iconfont icon-gerenxinxishezhi"></i>
            <span>个人信息设置</span>
            <i class="iconfont icon-xiayiye jump"></i>
          </li>
          <li class="listItem">
            <i class="iconfont icon-bangding"></i>
            <span>绑定社交账号</span>
            <i class="iconfont icon-xiayiye jump"></i>
          </li>
        </ul>
        <div class="line"></div>
        <ul class="infoUl">
          <li class="listItem">
            <i class="iconfont icon-tuichudenglu"></i>
            <span>退出登录</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "network/request.js";
let uid = 0;
export default {
  name: "HeaderBar",
  components: {},
  props: {},
  data() {
    return {
      showQr: false,//判断是否显示二维码框
      show:false, //判断是否显示元素
      userInfo: {
        nickname:"",
        avatarUrl:"",
        eventCount:0, //用户动态数
        follows:0,//用户关注
        followeds:0 //用户粉丝
      }, //用于保存用户的登录信息
    };
  },
  created() {
    //首先获取localStorage中的用户id
    //发送请求，请求用户信息
    this.getUserInfo();
  },
  methods: {
    //获取用户信息
    async getUserInfo() {
      uid = window.localStorage.getItem("uid");
      // 判断uid是否为0，如果为0则表示没有登录
      if (!uid) {
        this.$message("请先登录！");
        return 
      }

      let res = await request({
        url: "/user/detail",
        method: "get",
        params: {
          uid,
        },
      });
      console.log(res);
      this.userInfo = res.data.profile;
    },

    //点击下拉
    loginOrInfo(){
      // 判断是否登录
      uid = window.localStorage.getItem("uid");
      // 已经登陆
      if(uid){
        this.show = !this.show
      }
      if(!uid){
        this.showQr = true
        this.show = !this.show
      }

    }
  },
};
</script>
<style lang="less" scoped>
@color: #fff;
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
.center {
  display: flex;
  align-items: center;
  height: 100%;
  /* line-height: 60px; */
  padding-left: 30px;

  flex: 1;
}
/*center 上一页下一页区域 */
.pre,
.next {
  height: 25px;
  width: 25px;
  line-height: 25px;
  text-align: center;
  color: rgba(211, 211, 211, 0.5);
  background-color: rgba(88, 29, 29, 0.1);
  border-radius: 50%;
  margin: 0 3px;
}

/* 中部搜索框样式 */
.center .search {
  width: 160px;
  height: 30px;
  /* border: 1px solid yellowgreen; */
  margin: auto 10px;
  border-radius: 20px;
  line-height: 30px;
  padding-left: 10px;
  background-color: rgba(88, 29, 29, 0.1);
}
.search i {
  color: @color;
}
.search input {
  width: 120px;
  margin-left: 5px;
  color: @color;
  border: none;
  /* 背景透明 */
  background-color: transparent;
}
/*兼容浏览器 */
.search input::-webkit-input-placeholder {
  color: rgba(211, 211, 211, 0.5);
  font-size: 12px;
}
/* Mozilla Firefox 4 to 18 */
.search input:-moz-placeholder {
  color: rgba(211, 211, 211, 0.5);
  opacity: 1;
  font-size: 12px;
}
/* Mozilla Firefox 19+ */
.search input::-moz-placeholder {
  color: rgba(211, 211, 211, 0.5);
  opacity: 1;
  font-size: 12px;
}
/* Internet Explorer 10+ */
.search input:-ms-input-placeholder {
  color: rgba(211, 211, 211, 0.5);
  font-size: 12px;
}

/* 选中时没有边框 */
.search input:focus {
  outline: none;
}

/* 听歌识曲区域*/
.soundHound {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: rgba(88, 29, 29, 0.1);
  border-radius: 50%;
  color: #dcdcdc;
}

/*右边头部控制栏区域 */
.headerControl {
  display: flex;
  width: 300px;
  height: 60px;
  line-height: 60px;
  flex-direction: row;
  align-self: flex-end;
}
.headerControl .login {
  display: flex;
  align-items: center;
  height: 60px;
}
.login img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.login span,
.login .iconfont {
  font-size: 12px;
  color: #fff;
  margin-left: 5px;
}
.constrol {
  display: flex;
  width: 150px;
  height: 60px;

  justify-content: space-around;
}
.constrol .iconfont {
  font-size: 18px;
  color: #fff;
}

//共同样式
.commont {
  display: none;
  width: 300px;
  height: 400px;
  position: absolute;
  top: 65px;
  right: 60px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 999;
}

// 二维码登录框
.qrLogin {
  text-align: center;
  .commont();
  .p1 {
    font-size: 30px;
    margin: 20px 0;
  }
  .qr {
    position: relative;
    img {
      margin: 10px 0 10px 0;
      width: 200px;
      height: 200px;
    }
    .p2 {
      font-size: 14px;
    }
  }
  .otherLoginMethod {
    font-size: 12px;
    margin-top: 20px
  }
}


// 登录后的个人信息样式框
.userInfo {
  .commont();
  .info {
    display: flex;
    text-align: center;
    justify-content: space-around;
    width: 100%;
    height: 80px;
    .infoItem {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      .s1 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .s2 {
        font-size: 14px;
      }
    }
  }
  .signIn {
    text-align: center;
    width: 100px;
    height: 40px;
    box-shadow: 0 0 3px 3px rgba(128, 128, 128, 0.1);
    line-height: 40px;
    border-radius: 20px;
    margin: 10px auto;
    font-weight: bold;
  }
  .line {
    border: 0.5px solid #f5f5f5;
  }
  .infoUl {
    width: 100%;
    // height: 250px;
    padding: 0 5px 0 20px;
    display: flex;
    flex-direction: column;
    .listItem {
      height: 43px;
      line-height: 43px;
    }
  }
}
.signIn:hover {
  box-shadow: 2px 2px 3px 3px rgba(128, 128, 128, 0.2);
}
.listItem {
  .iconfont {
    font-size: 18px;
    margin-right: 5px;
  }
  span {
    font-size: 14px;
  }
  .jump {
    float: right;
    font-size: 12px;
    color: #c0c0c0;
  }
}

.isShow{
  display:block ;
}
</style>