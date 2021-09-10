<template>
  <div id="navBar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:"NavBar",
  components: {},
  props: {},
  data() {
    return {
    }
  },
};
</script>
<style lang="less" scoped>
#navBar{
    display: flex;
    // flex-direction: row;
}
</style>