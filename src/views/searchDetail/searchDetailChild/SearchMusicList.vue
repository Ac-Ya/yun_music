<template>
  <div id="searchMusicList">
    <div class="musicList">
      <div class="musicItem" v-for="item in musicList" :key="item.id"  @click="toMusicListDetail(item.id)">
        <img :src="item.coverImgUrl" alt="" />
        <span class="desc">{{item.name}}</span>
        <span class="musicCount">{{item.trackCount}}首</span>
        <span class="name">by {{item.creator.nickname}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchMusicList",
  components: {},
  props: {
    musicList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {};
  },
  methods:{
    toMusicListDetail(id){
       this.$router.push({
        path: "/musicListDetail",
        query: {
          id,
        },
      });
    }
  }
};
</script>
<style lang="less" scoped>
#searchMusicList {
  width: 100%;
  border-top: 1px solid #dcdcdc;
  margin-bottom: 80px;
  .musicList {
    width: 100%;
  }
}
.musicItem {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 80px;
  line-height: 80px;
  &:hover {
    background-color: #f0f1f2;
    border-radius: 10px;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin: 10px 20px;
  }
  .desc {
    width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .musicCount {
    font-size: 12px;
    width: 150px;
    color: #dcdcdc;
  }
  .name {
    font-size: 14px;
    width: 200px;
  }
}
</style>