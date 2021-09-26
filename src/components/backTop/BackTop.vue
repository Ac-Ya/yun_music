<template>
  <div id="backTop">
    <div class="top" @click="goTop" :class="{ showBtn: isGoTopShow }">
      <i class="iconfont icon-31huidaodingbu"></i>
    </div>
  </div>
</template>

<script>
let obj;
export default {
  name: "BackTop",
  components: {},
  props: {
    scrollObj: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      // 是否显示改组件
      isGoTopShow: false,
    };
  },
  cereated() {
  },
  mounted() {
    if (this.scrollObj == "") {
      obj = document;
      this.el = document.documentElement;
    } else {
      obj = document.querySelector(this.scrollObj);
      this.el = obj;
    }
    obj.onscroll = (e) => {
      if (this.el.scrollTop >= 800) {
        this.isGoTopShow = true;
      } else if (this.el.scrollTop < 800) {
        this.isGoTopShow = false;
      }
    };
  },
  methods: {
    goTop() {
      this.el.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    },
  },
};
</script>
<style lang="less" scoped>
#backTop {
  position: fixed;
  z-index: 9999;
  right: 30px;
  bottom: 80px;
  .top {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ec4141;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    opacity: 0;
    .iconfont {
      font-size: 30px;
      color: white;
    }
  }
  .showBtn {
    opacity: 1;
    transition: all 0.8s;
  }
}
</style>