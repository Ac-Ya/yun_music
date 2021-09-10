<template>
  <div id="navBarItem">
        <span class="barItem">
            <slot></slot>
        </span>  
  </div>
</template>

<script>
export default {
  name:"NavBarItem",
  components: {},
  props: {},
  data() {
    return {
    }
  },
};
</script>
<style lang="less" scoped>
#navBarItem{
    margin-right: 20px;
}
.barItem{
    display: block;
    height: 35px;
    line-height: 35px;
    // border-bottom: 3px solid #EC4141;
    // border:1px solid yellow;
}
.barItem:hover{
    // font-size: 18px;
    font-weight: bold;
}
</style>