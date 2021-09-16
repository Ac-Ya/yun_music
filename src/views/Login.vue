<template>
  <div class="login">
    <div class="login-box">
      <div class="login-image">
        <img src="../assets/img/wyyLogo1.jpg" alt="" />
      </div>
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login-from"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!-- 用户名输入框 prop="phone" 验证规则-->
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            prefix-icon="iconfont icon-yonghu"
            placeholder="请输入手机号！"
          ></el-input>
        </el-form-item>
        <!-- 密码输入框 prop="password" 验证规则-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-password"
            placeholder="请输入密码！"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="login" :plain="true"
            >登录</el-button
          >
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <router-link to="/index" replace="">
        <div class="custom">游客试用</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { request } from "../network/request";

export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      //用于表单的数据绑定
      loginForm: {
        phone: "",
        password: "",
      },
      uid: "", //用户id 用于获取用户的信息
      //表单的验证规则
      loginFormRules: {
        //用于用户名的验证
        phone: [
          //添加验证规则
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        //用于密码的验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //重置表单
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //登陆验证
    login() {
      let timestamp = Date.parse(new Date());
      this.$refs.loginFormRef.validate(async (validate) => {
        if (!validate) {
          return;
        }
        let res = await request({
          url: "/login/cellphone",
          method: "post",
          data: {
            phone: this.loginForm.phone,
            password: this.loginForm.password,
            withCredentials: true,
            timestamp
          },
        });
        if (res.data.code === 200) {
          this.$message({
            duration: 3000, //设置自动关闭时间  默认为3000
            message: `${res.statusText}`,
            type: "success",
          });

          window.localStorage.setItem("cookie", res.data.cookie);
          window.localStorage.setItem("uid", res.data.profile.userId);
          this.$store.commit("UID", res.data.profile.userId);
          this.$store.commit("updataLoginState", true);
          this.$router.push("/index");
        } else {
          this.$message({
            // showClose: true,
            duration: 3000,
            message: `${res.data.msg}`,
            type: "error",
          });
          //重置表单
          this.resetForm();
        }
      });
    },
  },
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #ec4141;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}

.login-image {
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.login-from {
  width: 100%;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 50px;
}
.login-from .login-btn {
  display: flex;
  justify-content: center;
}
.el-button {
  background-color: #ff5a5a;
  border: none;
  color: #fff;
  margin-left: 5px;
}
.el-button:hover {
  background-color: #ec4141;
}
.custom {
  position: absolute;
  bottom: 20px;
  right: 50px;
  font-size: 14px;
  color: #ff5a5a;
  text-decoration: underline;
}
.custom:hover {
  color: #ec4141;
}
</style>