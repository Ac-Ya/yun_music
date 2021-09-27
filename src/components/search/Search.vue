<template>
  <div id="search">
    <!-- 搜索框 -->
    <div class="search">
      <i class="iconfont icon-sousuo"></i>
      <input
        type="text"
        :placeholder="defalutkeyWord"
        @change="handleChange"
        @keyup.enter="search"
        @focus="focus"
      />
    </div>
    <!-- 弹窗框 -->
    <div class="searchBox" v-show="showSearchBox" id="searchBox">
      <!-- 搜索历史 -->
      <div class="searchHistory" v-if="searchHistory.length !== 0">
        <div class="title">
          <span>搜索历史</span>
          <i class="iconfont icon-shanchu" @click="deleteHistory"></i>
        </div>
        <div class="history">
          <span
            class="historyItem"
            v-for="(item, index) in searchHistory"
            :key="item + index"
            >{{ item }}</span
          >
        </div>
      </div>
      <!-- 热搜榜 -->
      <div class="hotSearch">
        <div class="title">热搜榜</div>
        <div
          class="hotSerachItem"
          v-for="(item, index) in searchList"
          :key="item.score"
        >
          <div class="num" :class="{ top: index < 3 }">{{ index + 1 }}</div>
          <div class="content">
            <div class="musicname">
              <span> {{ item.searchWord }} </span>
              <span class="hotDeg">{{ item.score }}</span>
            </div>
            <div class="desc">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "network/request.js";
export default {
  name: "Search",
  components: {},
  props: {},
  data() {
    return {
      defalutkeyWord: "", //默认搜索关键词
      searchList: [], //搜索列表
      searchHistory: [], //搜索历史记录
      // searchValue: "",
      showSearchBox: false, //是否显示搜索框
    };
  },
  created() {
    this.getDefalutKeyWord();
    this.getSearchList();
    this.getSearchHistory();
  },
  mounted() {
  },
  methods: {
    //获取默认搜索关键词
    async getDefalutKeyWord() {
      let res = await request({
        url: "/search/default",
      });
      this.defalutkeyWord = res.data.data.showKeyword;
    },
    //获取搜索列表
    async getSearchList() {
      let res = await request({
        url: "/search/hot/detail",
      });
      console.log(res);
      if (res.data.code !== 200) {
        return;
      }
      this.searchList = res.data.data;
    },

    //监听输入框的输入
    //   handleInput(e){
    //       console.log(e);
    //   }
    //监听change事件
    handleChange(e) {
      let searchHistory = this.searchHistory;
      //获取输入框的内容
      if (e.target.value) {
        if (searchHistory.length == 10) {
          //如果数组存满了删除最后一个
          searchHistory.pop();
        }
        searchHistory.unshift(e.target.value);
        window.localStorage.setItem("searchHistory", searchHistory);
      }
    },
    //获取历史搜索记录
    getSearchHistory() {
      if (window.localStorage.getItem("searchHistory")) {
        this.searchHistory = window.localStorage
          .getItem("searchHistory")
          .split(",");
      }
    },
    //点击删除，删除历史记录
    deleteHistory() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(() => {
          this.searchHistory = [];
          window.localStorage.removeItem("searchHistory");
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    eventHandler(e) {
      if (
        !(e.clientX > 270 && e.clientX < 670) ||
        !(e.clientY > 20 && e.clientY < 550)
      ) {
        this.showSearchBox = false;
      }
    },
    focus() {
      this.showSearchBox = true;
      window.addEventListener("click", this.eventHandler);
    },
    search(){

    }
  },
  watch: {
    showSearchBox(n, o) {
      if (!n) {
        window.removeEventListener("click", this.eventHandler);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@color: #fff;
#search {
  position: relative;
}
.search {
  width: 160px;
  height: 30px;
  margin: auto 10px;
  border-radius: 20px;
  line-height: 30px;
  padding-left: 10px;
  background-color: rgba(88, 29, 29, 0.1);
}
.search i {
  color: @color;
}
.search input {
  width: 120px;
  margin-left: 5px;
  color: @color;
  border: none;
  /* 背景透明 */
  background-color: transparent;
}
/*兼容浏览器 */
.search input::-webkit-input-placeholder {
  color: rgba(211, 211, 211, 0.5);
  font-size: 12px;
}
/* Mozilla Firefox 4 to 18 */
.search input:-moz-placeholder {
  color: rgba(211, 211, 211, 0.5);
  opacity: 1;
  font-size: 12px;
}
/* Mozilla Firefox 19+ */
.search input::-moz-placeholder {
  color: rgba(211, 211, 211, 0.5);
  opacity: 1;
  font-size: 12px;
}
/* Internet Explorer 10+ */
.search input:-ms-input-placeholder {
  color: rgba(211, 211, 211, 0.5);
  font-size: 12px;
}

/* 选中时没有边框 */
.search input:focus {
  outline: none;
}

.searchBox {
  position: absolute;
  left: -20px;
  margin-top: 10px;
  padding: 10px 20px;
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
}
.searchHistory {
  width: 100%;
  margin-bottom: 15px;
  .title {
    font-weight: bold;
    .iconfont {
      margin-left: 10px;
      color: black;
    }
  }
  .history {
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    .historyItem {
      padding: 5px 15px;
      border: 1px solid #dcdcdc;
      margin: 0 15px 10px 0;
      border-radius: 20px;
    }
  }
}
.hotSearch {
  width: 100%;
  .title {
    font-weight: bold;
    margin-bottom: 15px;
  }
}
.hotSerachItem {
  width: 100%;
  height: 60px;
  display: flex;
  .num {
    height: 50px;
    line-height: 50px;
    width: 40px;
    text-align: center;
    color: #a9a9a9;
  }
  .content {
    height: 50px;
    width: 300px;
    font-size: 13px;
    .musicname {
      font-weight: bold;
      margin-right: 10px;
      margin-top: 5px;
    }
    .hotDeg {
      margin-left: 10px;
      color: #d2d2d2;
    }
    .desc {
      margin-top: 10px;
      color: #a9a9a9;
    }
    .musicname,
    .desc {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &:hover {
    background-color: #f2f2f2;
    border-radius: 5px;
  }
  .top {
    color: #ec4141;
  }
}
</style>