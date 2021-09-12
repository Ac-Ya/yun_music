<template>
  <div id="cardListItem">
    <slot name="item-img"></slot>
    <slot name="item-name"></slot>
    <slot name="item-playCount"></slot>
    <slot name="item-playIconfont"></slot>
    <slot name="item-title"></slot>
  </div>
</template>

<script>
export default {
  name: "CardListItem",
  components: {},
  props: {},
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
#cardListItem{
      position: relative;
      // min-width: 150px;
      // max-width: 200px;
      margin: 0 10px 20px 0;
}
</style>