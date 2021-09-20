<template>
  <div id="commemt" v-if="newCommentData.length !==0">
    <div >
      <!-- 评论输入框 -->
      <div class="commentArea">
        <el-input
          v-model="comment"
          class="inputArea"
          type="textarea"
          maxlength="140"
          show-word-limit
          :placeholder="placeholderData"
          @blur="blurComment"
        >
          <!-- @input="inputComment" -->
        </el-input>
        <div class="submitComment">
          <span>@</span>
          <span>#</span>
          <el-button size="medium" round @click="handleComment">评论</el-button>
        </div>
      </div>
      <!-- 热门评论 -->
      <div class="hotComment" v-if="hotCommentData.length !== 0">
        <div class="title">热门评论</div>
        <div
          class="commentListItem"
          v-for="item in hotCommentData"
          :key="item.id"
        >
          <img :src="item.user.avatarUrl" alt="" />
          <div class="commentInfo">
            <div class="userInfo">
              <span class="name">{{ item.user.nickname }}:</span>
              <span class="commentDetail">{{ item.content }}</span>
            </div>
            <div class="floorComment" v-if="item.parentCommentId !== 0">
              <span class="name"
                >@{{ item.beReplied[0].user.nickname + ":" }}</span
              >
              <span class="commentDetail">{{ item.beReplied[0].content }}</span>
            </div>
            <div class="commentDate">
              <span class="date">{{ commentTime(item.time) }}</span>
              <div class="commentControl">
                <div>
                  <i class="iconfont icon-zan"></i>{{ item.likedCount }}
                </div>
                <i class="iconfont icon-fenxiang"></i>
                <!-- 点击回复时传入当前的楼层的id 和 评论的名字 -->
                <i
                  class="iconfont icon-huifu"
                  @click="handleRepled(item.commentId, item.user.nickname)"
                ></i>
              </div>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
      <!-- 加载更多 -->
      <div v-show="moreHot" class="loadMore" @click="loadMore" >
        更多热门评论>
      </div>
      <!-- 最新评论 -->
      <div class="newComment" v-if="newCommentData.length !== 0">
        <div class="title">最新评论</div>
        <div
          class="commentListItem"
          v-for="item in newCommentData"
          :key="item.id"
        >
          <img :src="item.user.avatarUrl" alt="" />
          <div class="commentInfo">
            <div class="userInfo">
              <span class="name">{{ item.user.nickname }}:</span>
              <span class="commentDetail">{{ item.content }}</span>
            </div>
            <div class="floorComment" v-if="item.parentCommentId !== 0">
              <span class="name"
                >@{{ item.beReplied[0].user.nickname + ":" }}</span
              >
              <span class="commentDetail">{{ item.beReplied[0].content }}</span>
            </div>
            <div class="commentDate">
              <span class="date">{{ commentTime(item.time) }}</span>
              <div class="commentControl">
                <div>
                  <i class="iconfont icon-zan"></i>{{ item.likedCount }}
                </div>
                <i class="iconfont icon-fenxiang"></i>
                <i
                  class="iconfont icon-huifu"
                  @click="handleRepled(item.commentId, item.user.nickname)"
                ></i>
              </div>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          v-if="!(total < 100)"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="100"
          :current-page="currentPage"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 评论区点赞，分享暂时没做
import { request } from "network/request.js";
import { formatTime } from "plugins/utils.js";
export default {
  name: "Commemt",
  components: {},
  props: {
    commentType: {
      type: Number,
      default: 0,
    },
    sourceID: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    commentTime() {
      return (time) => {
        return formatTime(new Date(time));
      };
    },
  },
  data() {
    return {
      comment: "", //用于保存用户添加的评论
      hotCommentData: [],
      newCommentData: [],
      commentTypes: {
        //所有评论类型
        0: "music",
        1: "mv",
        2: "playlist",
        3: "ablum",
        4: "dj",
        5: "video",
      },
      placeholderData: "留下你的评论",
      currentPage: 1, //当前评论页数
      moreHot: false,
      total: 0,
      commentId: 0, //用于保存回复评论时所在楼层的id
      commentName: "", //用于保存回复评论时所在楼层的名字
      t: 1, //判断是发送评论还是回复评论
    };
  },
  created() {
    this.getHotCommentData(this.sourceID, this.commentType);
  },
  methods: {
    //获取评论数据
    async getHotCommentData(id, type) {
      this.hotCommentData =[]
      this.newCommentData = []
      let res = await request({
        url: "/comment/" + this.commentTypes[type],
        method: "get",
        params: {
          id,
          type,
          limit: 50,
          offset: (this.currentPage - 1) * 50,
        },
      });
      // console.log(res);
      let data = res.data;

      //判断是否有热门评论
      data.hotComments
        ? (this.hotCommentData = data.hotComments)
        : (this.hotCommentData = []);
      this.newCommentData = data.comments;
      //判断是否有更多的热门评论
      data.moreHot ? (this.moreHot = data.moreHot) : (this.moreHot = false);
      this.total = data.total;

      (res = null), (data = null);
    },

    //点击加载更多
    loadMore() {},
    // 分页点击
    pageChange(page) {
      this.currentPage = page;
      this.newCommentData = [];
      this.getHotCommentData(this.sourceID, this.commentType);
    },

    // 处理点击发送评论时的回调
    async handleComment() {
      console.log(this.$store.state.isLogin);
      let t = this.t,
        id = this.sourceID,
        type = this.commentType,
        content = this.comment,
        commentId = this.commentId;
      // 如果t为1 表示发送评论  post需要携带cookie 不然会报错301

      //判断是否登录
      // if (!this.$store.state.isLogin) {
      //   this.$message.warning("只有登陆后才能评论哦!");
      //   return;
      // }
      //判断发送内容是否为空
      if (content == "") {
        this.$message({
          message: "评论内容不能为空!",
          type: "warning",
        });
        return;
      }

      this.submitComment(t, type, id, commentId, content);
      //更新评论列表
      this.getHotCommentData(id, type);
    },
    //提交评论的请求
    async submitComment(t, type, id, commentId, content) {
      let timestamp = Date.parse(new Date());
      let res = await request({
        url: "/comment",
        method: "post",
        data: {
          t,
          type,
          id,
          commentId,
          content,
          cookie: window.localStorage.getItem("cookie"),
          timestamp,
        },
      });
      if (res.data.code !== 200) {
        this.$message.error("获取评论失败,请稍后重试!");
      }
      // console.log(res);
    },

    //监听input输入框
    // inputComment() {
    //   //如果t为2且comment为空时
    //   if (this.t == 2 && this.comment == "") {
    //     this.t = 1;
    //   }
    //   console.log(this.t);
    // },
    //输入框失去焦点,
    blurComment() {
      this.t = 1;
      this.placeholderData = "留下你的评论";
    },

    // 处理点击回复时的回调
    handleRepled(id, name) {
      this.placeholderData = `回复@${name}`;
      //用于发送评论时的参数
      this.commentId = id;
      //t为2表示回复评论
      this.t = 2;
      // 让评论框获得焦点
      let input = document.querySelector(".inputArea");
      // 阻止focus定位
      input.children[0].focus({ preventScroll: true });

      //回到评论框所处的位置
      let comment = document.getElementById("comment");
      window.scrollTo({
        // behavior:"smooth",
        top: 0,
      });
    },
  },
  watch: {
    sourceID(nV, oV) {
      this.getHotCommentData(nV, this.commentType);
    },
  },
};
</script>
<style lang="less" scoped>
#comment {
  width: 100%;
}
// /deep/ .el-textarea__inner{
//   // background-color: rgba(220,220,220,0.4);
//   // border-color:  rgba(220,220,220,0.4);

// }
.submitComment {
  display: flex;
  position: relative;
  width: 100%;
  height: 35px;
  line-height: 35px;
  flex-direction: row;
  margin: 20px 0;
  color: #dcdcdc;
  span {
    font-size: 20px;
    margin-right: 10px;
  }
  .el-button {
    position: absolute;
    right: 0;
  }
}
/deep/ .el-button:active,
.el-button:focus,
.el-button:hover,
.el-button:valid {
  color: black;
  background-color: #f2f2f2;
}

.hotComment,
.newComment {
  width: 100%;
  .title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
  }
}
.commentListItem {
  position: relative;
  display: flex;
  margin: 20px 0;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .commentInfo {
    width: 100%;
    font-size: 12px;
    margin-bottom: 20px;
    div {
      margin-bottom: 5px;
    }
  }
  .line {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
  }
}
.userInfo,
.floorComment {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5em;
  .name {
    color: #ec4141;
  }
}

.floorComment {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
}

.commentDate {
  display: flex;
  position: relative;
  .date {
    color: #d3d3d3;
  }
}
.commentControl {
  display: flex;
  position: absolute;
  right: 0;
  .iconfont {
    margin: 0 10px;
    &:hover {
      color: black;
      font-weight: bold;
    }
  }
}
.likedCound {
  font-size: 12px;
}
// 加载更多
.loadMore {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #dcdcdc;
  margin: 10px auto;
  &:hover {
    background-color: #dcdcdc;
  }
}
//分页
.pages {
  width: 100%;
  text-align: center;
  margin: 20px 0 80px 0;
}
</style>