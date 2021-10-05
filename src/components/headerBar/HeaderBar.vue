<template>
  <div id="headerBar">
    <!-- 左边logo区域 -->
    <div class="logo">
      <img src="../../assets/img/login.png" alt="" />
    </div>

    <!-- 中间搜索框区域 -->
    <div class="center">
      <!-- 上一页 -->
      <div class="pre" @click="handleClick('pre')">
        <i class="iconfont icon-shangyiye"></i>
      </div>
      <!-- 下一页 -->
      <div class="next" @click="handleClick('next')">
        <i class="iconfont icon-xiayiye"></i>
      </div>
      <!-- 搜索框 -->
      <!-- <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索" />
      </div> -->
      <search></search>
      <!-- 听歌识曲 -->
      <div class="soundHound">
        <i class="iconfont icon-tinggeshiqu"></i>
      </div>
    </div>

    <!-- 右边控制区域 -->
    <div class="headerControl">
      <div class="login">
        <img :src="userInfo.avatarUrl" alt="" v-if="userInfo.avatarUrl" @click="toProfileInfo"/>
        <img src="../../assets/img/tx.png" alt="" v-else />
        <span class="loginInfo" v-if="userInfo.nickname">{{
          userInfo.nickname
        }}</span>
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
    <div class="qrLogin" v-if="showQr" :class="{ isShow: show }">
      <p class="p1">扫码登陆</p>
      <div class="qr">
        <img :src="qrImg" alt="" />
        <p class="p2">使用网易云APP扫码登陆</p>
      </div>

      <div class="otherLoginMethod" @click="login">
        <span>选择其它登录方式</span>>
      </div>
    </div>
    <!-- 登录后的下拉的个人信息 -->
    <div class="userInfo" v-else :class="{ isShow: show }">
      <div class="info">
        <div class="infoItem">
          <span class="s1">{{ userInfo.eventCount }}</span>
          <span class="s2">动态</span>
        </div>
        <div class="infoItem">
          <span class="s1">{{ userInfo.follows }}</span>
          <span class="s2">关注</span>
        </div>
        <div class="infoItem">
          <span class="s1">{{ userInfo.followeds }}</span>
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
          <li class="listItem" @click="logOut">
            <i class="iconfont icon-tuichudenglu"></i>
            <span>退出登录</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
let timer;
import { request } from "network/request.js";
import Search from "components/search/Search.vue"
let uid = 0;
export default {
  name: "HeaderBar",
  components: {Search},
  props: {},
  data() {
    return {
      showQr: false, //判断是否显示二维码框
      show: false, //判断是否显示元素
      userInfo: {
        nickname: "",
        avatarUrl: "",
        eventCount: 0, //用户动态数
        follows: 0, //用户关注
        followeds: 0, //用户粉丝
      }, //用于保存用户的登录信息
      qrImg: "", //用于保存二维码
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
        return;
      }
      let res = await request({
        url: "/user/detail",
        method: "get",
        params: {
          uid,
        },
      });
      this.userInfo = res.data.profile;
    },

    //点击下拉
    loginOrInfo() {
      // 判断是否登录
      uid = window.localStorage.getItem("uid");
      // 已经登陆
      if (uid) {
        this.show = !this.show;
        this.showQr = false
        clearInterval(timer);
      }
      if (!uid) {
        console.log(1);
        this.showQr = true;
        this.show = !this.show;
        this.qrlogin();
      }
    },
    //退出登录
    logOut() {
      window.localStorage.removeItem("uid");
      window.localStorage.removeItem("cookie");
      this.$store.commit("updataLoginState", false);
      this.$router.push("/login");
    },
    //点击其他登录方式跳转到登录页
    login() {
      this.$router.push("/login");
    },

    //检查二维码扫码状态
    async checkStatus(key) {
      let res = await request({
        url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    },
    //获取登录状态
    async getLoginStatus() {
      const res = await request({
        url: `/login/status?timerstamp=${Date.now()}`,
        params: {
          cookie: window.localStorage.getItem("cookie"),
        },
        withCredentials: true, //关键
      });
      console.log(res);
      if (res.data.data.profile !== null) {
        //获取的数据不完整
        // this.userInfo = res.data.data.profile;
        window.localStorage.setItem("uid", res.data.data.account.id);
        await this.getUserInfo()
        this.$store.commit("updataLoginState",true)
      }
      this.show = false
    },
    //二维码登录
    async qrlogin() {
      let timestamp = Date.now();
      //获取二维码key
      const res = await request({
        url: `/login/qr/key?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      const key = res.data.data.unikey;
      //获取二维码图片
      const res2 = await request({
        url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      this.qrImg = res2.data.data.qrimg;


      //轮询检查二维码扫描情况
      timer = setInterval(async () => {
        const statusRes = await this.checkStatus(key);
        if (statusRes.code === 800) {
          this.$message.error("二维码已过期,请重新获取");
          clearInterval(timer);
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          // console.log(statusRes);
          // 保存cookie
          window.localStorage.setItem("cookie", statusRes.cookie);
          this.$message.success("授权登录成功");
          await this.getLoginStatus();
          debugger
          clearInterval(timer);
        }
      }, 3000);
    },
    handleClick(type){
      if(type == 'pre'){
        this.$router.back(-1)
      }else if(type == 'next'){
        this.$router.go(1)
      }
    },
    //跳转到个人详情
    toProfileInfo(){
      this.$router.push("/profileInfo")
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
  &:hover{
    color:#fff;
  }
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
  color: @color;
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
  color: @color;
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
  background-color: #fff;
}

// 二维码登录框
.qrLogin {
  position: relative;
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
    margin-top: 20px;
    cursor: pointer;
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
      cursor: pointer;
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
      cursor: pointer;
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

.isShow {
  display: block;
}
</style>