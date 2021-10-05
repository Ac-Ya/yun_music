<template>
  <div id="likeDetail">
    <div class="likeList">
      <music-table class="tableHeader">
        <div class="album" slot="album">专辑</div>
        <div class="burningTime" slot="burningTime">时长</div>
      </music-table>
      <music-table-item :mData="musicData" :musicListId="0">
        <i class="iconfont icon-xindong" slot="like"></i>
        <i class="iconfont icon-xiazai" slot="download"></i>
      </music-table-item>
    </div>
  </div>
</template>

<script>
import MusicTable from "components/musicTable/MusicTable.vue";
import MusicTableItem from "components/musicTable/MusicTableItem.vue";
import { request } from "network/request.js";
export default {
  name: "LikeDetail",
  components: { MusicTable, MusicTableItem },
  props: {},
  data() {
    return {
      musicData: [],
    };
  },
  created() {
    //获取uid
    let uid = null;
    let ids = "";

    if (this.$store.state.isLogin) {
      uid = window.localStorage.getItem("uid");
        this.getLikeListData(uid)
    }
  },
  methods: {
    async getLikeListData(uid) {
        let res = await request({
            url:'/likelist',
            params:{
                cookie:window.localStorage.getItem('cookie'),
                uid
            }
        })
        await this.getMusicDetail(res.data.ids.join(','))

    },
    async getMusicDetail(ids){
        let res = await request({
        url: "/song/detail",
        method: "get",
        params: {
          ids
        },
      });
      console.log(res);
      this.musicData = res.data.songs
    }
  },
};
</script>
<style lang="less" scoped>
#likeDetail {
  width: 100%;
  .likeList {
    width: 100%;
    margin-top: 150px;
  }
}
</style>