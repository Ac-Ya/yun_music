<template>
  <div id="searchSinger">
    <div class="singerList">
      <div class="singerItem" v-for="item in singers" :key="item.id" @click="toSingerDetail(item.id)">
        <img :src="item.picUrl" alt="" />
        <span>{{item.name}}</span>
        <i class="iconfont icon-yonghu1"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchSinger",
  components: {},
  props: {
    singers:{
      type:Array,
      default(){
        return []
      },
    }
  },
  data() {
    return {
    };
  },
  created(){

  },
  methods:{
    //跳转到歌手详情
    toSingerDetail(id){
     this.$router.push({
        path: "/singerDetail",
        query: { id },
      });
    }
  },
};
</script>
<style lang="less" scoped>
#searchSinger {
  width: 100%;
  border-top: 1px solid #dcdcdc;
  margin-bottom: 80px;


  .singerList {
    width: 100%;
  }
}
.singerItem {
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
    width: 70px;
    height: 70px;
    border-radius: 5px;
    margin: 5px 20px;
  }
  span {
    margin-right: auto;
  }
  .iconfont {
    align-self: flex-end;
    font-size: 25px;
    color: #ec4141;
    margin-right: 10px;
  }
}
</style>