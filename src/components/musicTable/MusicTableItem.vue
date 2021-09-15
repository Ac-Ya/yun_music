<template>
  <div id="musicTableItem">
    <div class="musicTableItem" v-for="(item,index) in mData" :key="item.key" :class="{bgC:index%2 == 0}">
      <div class="index">
        <span class="seq">{{index+1}}</span>
        <slot name="like"></slot>
        <slot name="download"></slot>
      </div>
      <div class="content">
        <div class="musicName">{{item.name}}</div>
        <div class="singer">{{item.ar[0].name}}</div>
        <div class="album">{{item.al.name}}</div>
        <div class="burningTime">{{burningTime(item.dt)}}</div>
        <div class="playTime" :class="{ show: false }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatMusicTime} from "plugins/utils.js"
export default {
  name: "vue",
  components: {},
  props: {
    mData: {
      type: Array,
      default: [],
    },
  },
  computed:{
    burningTime(){
      return (time)=>{
        return formatMusicTime(time)
      }
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.musicTableItem {
  display: flex;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  .index {
    width: 100px;
    display: flex;
    justify-content: space-around;
    .seq {
      margin-left: 20px;
    }
  }
  .content {
    display: flex;
    width: calc(100% - 100px);
  }
  &:hover {
    background-color: #f4f4f4;
  }
}
.musicName {
  width: 40%;
}
.singer {
  width: 20%;
}
.album {
  width: 25%;
}
.burningTime {
  width: 10%;
}
.show {
  width: 0;
}

.musicName,.singer,.album{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bgC{
  background-color: #f9f9f9;
}


</style>