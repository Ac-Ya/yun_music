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
    // currentTag: {
    //   type: String,
    //   default: "",
    // },
    allTag: {
      type: Object,
      default: null,
    },
    currentPRoute:{//当前路由的父路由
        type:String,
        default:''
    }
  },
  created(){
    this.tag = this.$route.path
    // console.log(this.$route.path);
  },
  data() {
    return {
        tag:'',//用于保存当前路由
    };
  },
  methods:{
      handleClick(key){
        this.tag = key
        this.$router.push(key)
      }
  },
  watch:{
    // '$route.path'(n,v){
    //   console.log(n);
    // }
  }
};
</script>
<style lang="less" scoped>
#mNav {
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 999;
  background-color: white;
  margin-left: 20px;
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