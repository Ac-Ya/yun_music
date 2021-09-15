<template>
  <div id="commemt">
    <div class="commentArea">
      <el-input
        v-model="comment"
        class="inputArea"
        type="textarea"
        maxlength="140"
        show-word-limit
      ></el-input>
      <div class="submitComment">
        <span>@</span>
        <span>#</span>
        <el-button size="medium" round>评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Commemt",
  components: {},
  props: {},
  data() {
    return {
      comment: "",
    };
  },
};
</script>
<style lang="less" scoped>
#comment {
  width: 100%;
}
.submitComment{
      display: flex;
      position: relative;
      width: 100%;
      height: 35px;
      line-height: 35px;
      flex-direction:row;
      margin: 20px 0;
      span{
          font-size: 20px;
          margin-right: 10px;
      }
      .el-button{
          position: absolute;
          right: 0;
      }
  }
  /deep/ .el-button:active,.el-button:focus,.el-button:hover,.el-button:valid{
      color: black;
      background-color:#f2f2f2;
      border-color: #f2f2f2;
  }
</style>