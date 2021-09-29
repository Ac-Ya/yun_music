<template>
  <div id="searchSong">
    <music-table class="tableHeader">
      <div class="album" slot="album">专辑</div>
      <div class="burningTime" slot="burningTime">时长</div>
    </music-table>
    <music-table-item :mData="songs">
      <i class="iconfont icon-xindong" slot="like"></i>
      <i class="iconfont icon-xiazai" slot="download"></i>
    </music-table-item>
  </div>
</template>

<script>

import MusicTable from "components/musicTable/MusicTable.vue";
import MusicTableItem from "components/musicTable/MusicTableItem.vue";
export default {
  name: "SearchSong",
  components: { MusicTable, MusicTableItem },
  props: {
    songs:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
    
    };
  },
  created() {
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
#searchSong {
  width: 100%;
  border-top: 1px solid #dcdcdc;
  margin-bottom: 80px;
}

.tableHeader {
  font-size: 14px;
  color: #a9a9a9;
  margin-top: 10px;
}

.album {
  width: 25%;
}
.burningTime {
  width: 10%;
}

</style>