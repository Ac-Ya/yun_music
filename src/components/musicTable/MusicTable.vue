<template>
  <div id="musicTable">
    <div class="tableH">
      <div class="musicName">音乐标题</div>
      <div class="singer">歌手</div>
      <slot name="album"></slot>
      <slot name="burningTime"></slot>
      <slot name="playTime"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicTable",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
    };
  },
};
</script>
<style lang="less" scoped>
#musicTable {
  width: 100%;
  min-width: 1100px;
}
.tableH {
  display: flex;
  width: 100%;
  height: 35px;
  line-height: 35px;
  padding-left: 100px;
  border-radius: 5px;
}

.musicName {
  width: 40%;
}
.singer {
  width: 20%;
}
.album{
  width: 25%;
}
.burningTime{
  width: 10%;
}
.show{
  width: 0;
}
</style>