<template>
  <div id="commemt">
    <div class="comment">
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
      <template v-if="hotCommentData.length !== 0">
        <!-- 热门评论 -->
        <div class="hotComment">
          <div class="title">热门评论</div>
          <div
            class="commentListItem"
            v-for="item1 in hotCommentData"
            :key="item1.id"
          >
            <img :src="item1.user.avatarUrl" alt="" />
            <div class="commentInfo">
              <div class="userInfo">
                <span class="name">{{ item1.user.nickname }}:</span>
                <span class="commentDetail">{{ item1.content }}</span>
              </div>
              <div class="floorComment" v-if="item1.beReplied.length !== 0">
                <span class="name"
                  >@{{ item1.beReplied[0].user.nickname + ":" }}</span
                >
                <span class="commentDetail">{{
                  item1.beReplied[0].content
                }}</span>
              </div>
              <div class="commentDate">
                <span class="date">{{ commentTime(item1.time) }}</span>
                <div class="commentControl">
                  <div>
                    <i class="iconfont icon-zan"></i>{{ item1.likedCount }}
                  </div>
                  <i class="iconfont icon-fenxiang"></i>
                  <!-- 点击回复时传入当前的楼层的id 和 评论的名字 -->
                  <i
                    class="iconfont icon-huifu"
                    @click="handleRepled(item1.commentId, item1.user.nickname)"
                  ></i>
                </div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <!-- 加载更多 -->
        <div v-show="moreHot" class="loadMore" @click="loadMore">
          更多热门评论>
        </div>
      </template>
      <template v-if="newCommentData.length !== 0">
        <!-- 最新评论 -->
        <div class="newComment">
          <div class="title">最新评论</div>
          <div
            class="commentListItem"
            v-for="item2 in newCommentData"
            :key="item2.id"
          >
            <img :src="item2.user.avatarUrl" alt="" />
            <div class="commentInfo">
              <div class="userInfo">
                <span class="name">{{ item2.user.nickname }}:</span>
                <span class="commentDetail">{{ item2.content }}</span>
              </div>
              <div class="floorComment" v-if="item2.beReplied.length !== 0">
                <span class="name"
                  >@{{ item2.beReplied[0].user.nickname + ":" }}</span
                >
                <span class="commentDetail">{{
                  item2.beReplied[0].content
                }}</span>
              </div>
              <div class="commentDate">
                <span class="date">{{ commentTime(item2.time) }}</span>
                <div class="commentControl">
                  <div>
                    <i class="iconfont icon-zan"></i>{{ item2.likedCount }}
                  </div>
                  <i class="iconfont icon-fenxiang"></i>
                  <i
                    class="iconfont icon-huifu"
                    @click="handleRepled(item2.commentId, item2.user.nickname)"
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
      </template>
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
    sourceId: {
      type: String,
      default: "",
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
      id: "", //资源id 但你是视频或mv时保存
    };
  },
  created() {
    // console.log(this.sourceID, this.commentType);
    if (this.commentType == 5 || this.commentType == 1) {
      this.id = this.sourceId;
      this.getHotCommentData(this.id, this.commentType);
    } else {
      this.getHotCommentData(this.sourceID, this.commentType);
    }
  },
  methods: {
    //获取评论数据
    async getHotCommentData(id, type) {
      var timestamp = Date.parse(new Date());
      this.hotCommentData = [];
      this.newCommentData = [];
      let res = await request({
        url: "/comment/" + this.commentTypes[type],
        method: "get",
        params: {
          id,
          type,
          limit: 50,
          offset: (this.currentPage - 1) * 50,
          timestamp,
        },
      });
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
      if (this.commentType == 5 || this.commentType == 1) {
        this.getHotCommentData(this.sourceId, this.commentType);
      } else {
        this.getHotCommentData(this.sourceID, this.commentType);
      }
    },

    // 处理点击发送评论时的回调
    async handleComment() {
      let t = this.t,
        id = this.sourceID,
        type = this.commentType,
        content = this.comment,
        commentId = this.commentId;
      // 如果t为1 表示发送评论  post需要携带cookie 不然会报错301
      // console.log(id, type);

      //判断是否登录
      if (!this.$store.state.isLogin) {
        this.$message.warning("只有登陆后才能评论哦!");
        this.comment = "";
        return;
      }
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
      // 清空输入框
      this.comment = "";
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
        this.$message.error("评论失败,请稍后重试!");
      } else {
        //更新评论
        this.getHotCommentData(id, type);
      }
      timestamp = null;
    },

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
      let comment = document.querySelector(".comment");
      comment.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    },
  },
  watch: {
    sourceID(nV, oV) {
      this.getHotCommentData(nV, this.commentType);
    },
    sourceId(nV, oV) {
      this.getHotCommentData(nV, this.commentType);
    },
  },
};
</script>
<style lang="less" scoped>
#comment {
  width: 100%;
}

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