<template>
  <div id="navBar">
    <div class="playlistNav">
      <!-- 当前歌单列表标签 -->
      <div class="currentTag" @click="showAllTag">
        <span>{{tag}}</span>
        <i class="iconfont icon-xiayiye"></i> 
      </div>
      <!-- 全部标签 -->
      <slot name="allTag"></slot>

      <!-- 歌单标签导航栏 -->
      <div class="playlistTag">
        <div
          class="playlistTagItem"
          :class="{ isShow: tag === item.name }"
          @click="switchTag(item.name,item.id)"
          v-for="item in tags"
          :key="item.id"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  props: {
    tags:{
      type:Array,
      default:[]
    },
    tag:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      show:false
    };
  },
  methods:{
    switchTag(tag,tagId){
      this.$emit("child",tag,tagId)
    },
    showAllTag(){
      this.show = !this.show
      this.$emit("showAll",this.show)
    }
  },
};
</script>
<style lang="less" scoped>
#navBar {
  display: flex;
  // flex-direction: row;
  width: 1100px;
}

// 导航栏
.playlistNav {
  width: 100%;
  height: 30px;
  // border: 1px solid yellow;
  margin: 20px 0;
  position: relative;
  display: flex;
  .currentTag {
    width: 120px;
    height: 30px;
    border: 1px solid #dcdcdc;
    padding: 5px 10px;
    text-align: center;
    border-radius: 15px;
    white-space: nowrap;
  }
}
.playlistTag {
  display: flex;
  height: 30px;
  line-height: 30px;
  position: absolute;
  right: 0;
  .playlistTagItem {
    padding: 10px;
    // height: 30px;
    margin-left: 5px;
    line-height: 10px;
    text-align: center;
    font-size: 12px;
    border-radius: 10px;
    color: #ec4141;
  }
}

.isShow {
  background-color: #fef6f5;
}

.currentTag:hover {
  background-color: #f5f5f5;
}
</style>