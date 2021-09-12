<template>
  <div id="cardList">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:"CardList",
  components: {},
  props: {},
  data() {
    return {
    }
  },
};
</script>
<style lang="less" scoped>
#cardList{
  display: flex;
  flex-wrap: wrap;
}
</style>