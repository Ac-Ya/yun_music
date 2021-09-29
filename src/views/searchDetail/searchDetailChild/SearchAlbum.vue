<template>
  <div id="searchAlbum">
    <div class="albumList">
      <div class="albumItem" v-for="item in albums" :key="item.id">
        <img :src="item.picUrl" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchAlbum",
  components: {},
  props: {
    albums: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
#searchAlbum {
  width: 100%;
  border-top: 1px solid #dcdcdc;
  margin-bottom: 80px;
  .albumList {
    width: 100%;
  }
}
.albumItem {
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
  span {
    margin-right: auto;
  }

}
</style>