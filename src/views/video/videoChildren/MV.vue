<template>
  <div id="MV">
    <div class="mvNavbar">
      <!-- 地区的所有标签 -->
      <div class="area">
        <div class="title">地区:</div>
        <div class="tags">
          <span
            class="currentTag"
            @click="handleClick(item.path, 'area')"
            :class="{ isShow: item.path === requestParams.area }"
            v-for="item in areaTags"
            :key="item.path"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <!-- 类型的所有标签 -->
      <div class="type">
        <div class="title">类型:</div>
        <div class="tags">
          <span
            class="currentTag"
            @click="handleClick(item.path, 'type')"
            :class="{ isShow: item.path === requestParams.type }"
            v-for="item in typeTags"
            :key="item.path"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <!-- 排序的所有标签 -->
      <div class="order">
        <div class="title">排序:</div>
        <div class="tags">
          <span
            class="currentTag"
            @click="handleClick(item.path, 'order')"
            :class="{ isShow: item.path === requestParams.order }"
            v-for="item in orderTags"
            :key="item.path"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
    <!-- mv数据列表 -->
    <div
      class="mvList"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255,255,1)"
    >
      <div
        class="mv-item"
        v-for="item in mvListData"
        :key="item.id"
        @click="toVideoDetail(item.id, 'mv')"
      >
        <img :src="item.cover" alt="" />
        <div class="playCount">
          <i class="iconfont icon-bofang4"></i>
          <span>{{ item.playCount | handleNum }}</span>
        </div>
        <div class="desc">{{ item.name }}</div>
        <div class="ar">{{ item.artistName }}</div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pages" v-if="!total < 100">
      <el-pagination
        background
        :total="total"
        layout="prev, pager, next"
        :page-size="50"
        :current-page="currentPage"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { request } from "network/request.js";
import { handleNum } from "../../../plugins/utils";
export default {
  name: "MV",
  components: {},
  props: {},
  filters: {
    handleNum,
  },
  data() {
    return {
      //注:这里数据可以重新设计,直接用一个就行
      // mv 地区
      areaTags: [
        { name: "全部", path: "" },
        { name: "内地", path: "内地" },
        { name: "港台", path: "港台" },
        { name: "欧美", path: "欧美" },
        { name: "日本", path: "日本" },
        { name: "韩国", path: "韩国" },
      ],
      // mv 类型
      typeTags: [
        { name: "全部", path: "" },
        { name: "官方版", path: "官方版" },
        { name: "原生", path: "原生" },
        { name: "现场版", path: "现场版" },
        { name: "网易出品", path: "网易出品" },
      ],
      // 排序
      orderTags: [
        { name: "上升最快", path: "" },
        { name: "最热", path: "最热" },
        { name: "最新", path: "最新" },
      ],
      requestParams: {
        area: "", //地区
        type: "", //类型
        order: "最热", //排序
      }, //请求参数
      currentPage: 1, //分页
      hasMore: true, //是否有更多数据
      mvListData: [], //mv数据
      total: 0,
      loading: true,
    };
  },
  created() {
    this.getAllData(this.requestParams);
  },
  methods: {
    //根据tag 获取数据
    async getAllData(requestParams) {
      this.loading = true;
      this.mvListData = [];
      let res = await request({
        url: "/mv/all",
        method: "get",
        params: {
          area: requestParams.area,
          type: requestParams.type,
          order: requestParams.order,
          limit: 40,
          offset: (this.currentPage - 1) * 40,
        },
      });
      // console.log(res);
      let data = res.data;
      this.mvListData = data.data;
      data.count ? (this.total = data.count) : this.total;
      this.hasMore = data.hasMore;
      this.loading = false;
    },

    //标签的点击事件
    handleClick(tag, requestType) {
      this.requestParams[requestType] = tag;
      this.getAllData(this.requestParams);
      this.currentPage = 1;
    },
    pageChange(page) {
      this.currentPage = page;
      this.getAllData(this.requestParams);
    },
    //跳转到videoDetail
    toVideoDetail(id, type) {
      // console.log(id);
      // console.log(type);
      this.$router.push({
        path: "/videoDetail",
        query: {
          id,
          type,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
#MV {
  padding: 20px 100px 0 100px;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}
.mvNavbar {
  width: 100%;
  min-width: 1100px;
}
.area,
.type,
.order {
  width: 100%;
  display: flex;
  font-size: 12px;
  align-items: center;
  margin-bottom: 5px;
  .title {
    text-align: center;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 80px;
      text-align: center;
      padding: 10px;
      border-radius: 20px;
      margin: 0 5px;
    }
  }
}
.mvList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-width: 1100px;
  margin-bottom: 50px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.mv-item {
  position: relative;
  width: 23%;
  margin: 10px 20px 10px 0;
  img {
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 8px;
  }
  .playCount {
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
    font-size: 14px;
  }
  .desc,
  .ar {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .ar {
    margin-top: 5px;
    color: #d3d3d3;
  }
}
.isShow {
  color: #ec4141;
  background-color: #fef6f5;
}
.currentTag:hover {
  background-color: #fef6f5;
}
//分页
.pages {
  width: 100%;
  text-align: center;
  margin-bottom: 120px;
}
</style>