<template>
  <div id="mNav">
    <div
      class="barItem"
      v-for="(val, key) in allTag"
      :key="key"
      :class="{ navBarItem: tag == key }"
      @click="handleClick(key)"
    >
      {{ val }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MNavbar",
  components: {},
  props: {
    allTag: {
      type: Object,
      default: null,
    },
    currentPRoute: {
      //当前路由的父路由
      type: String,
      default: "",
    },

  },
  data() {
    return {
      tag: "", //用于保存当前路由
      searchKeywords:''
    };
  },
   created() {
    this.tag = this.$route.path;
    this.searchKeywords = this.keywords
  },
  methods: {
    handleClick(key) {
        this.tag = key;
        this.$router.push(key);
    },
  },
  watch: {
    '$route.path'(n,o){
      this.tag = n
    }
  },
};
</script>
<style lang="less" scoped>
#mNav {
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 99;
  background-color: #fff;
  // margin-left: 20px;
  padding-top: 5px;
}
.barItem {
  margin-right: 20px;
  display: block;
  height: 35px;
  line-height: 35px;
  font-size: 20px;
}
.barItem:hover {
  font-weight: bold;
}
.navBarItem {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 3px solid #ec4141;
}
</style>