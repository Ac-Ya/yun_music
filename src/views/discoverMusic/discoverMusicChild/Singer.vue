<template>
  <div id="singer">
    <div
      class="singerList"
      v-infinite-scroll="load"
      infinite-scroll-distance="100"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-immediate="false"
      infinite-scroll-delay="200"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
    >
      <!-- 歌手导航栏 -->
      <div class="singerNavbar">
        <div class="area">
          <div class="title">语种:</div>
          <div class="tags">
            <span
              @click="handleClick(item1.area, 'area')"
              :class="{ isShow: item1.area === requestParams.area }"
              class="currentTag"
              v-for="item1 in areaList"
              :key="item1.val"
              >{{ item1.val }}</span
            >
          </div>
        </div>
        <div class="type">
          <div class="title">分类:</div>
          <div class="tags">
            <span
              @click="handleClick(item2.type, 'type')"
              :class="{ isShow: item2.type === requestParams.type }"
              class="currentTag"
              v-for="item2 in typeList"
              :key="item2.val"
              >{{ item2.val }}</span
            >
          </div>
        </div>
        <div class="initial">
          <div class="title">筛选:</div>
          <div class="tags">
            <span
              @click="handleClick(item3.initial, 'initial')"
              :class="{ isShow: item3.initial === requestParams.initial }"
              class="currentTag"
              v-for="item3 in initialList"
              :key="item3.val"
              >{{ item3.val }}</span
            >
          </div>
        </div>
      </div>
      <!-- 歌手item -->
      <div class="singerItem" v-for="item4 in artists" :key="item4.id" @click="toSingerDetail(item4.id)">
        <img :src="item4.img1v1Url + '?param=400y400'" alt="" />
        <span class="singerName">{{ item4.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "network/request.js";
export default {
  val: "Singer",
  components: {},
  props: {},
  data() {
    return {
      // 导航栏语种list
      areaList: [
        { area: -1, val: "全部" },
        { area: 7, val: "华语" },
        { area: 96, val: "欧美" },
        { area: 8, val: "日本" },
        { area: 16, val: "韩国" },
        { area: 0, val: "其他" },
      ],
      //类型list
      typeList: [
        { type: -1, val: "全部" },
        { type: 1, val: "男歌手" },
        { type: 2, val: "女歌手" },
        { type: 3, val: "乐队" },
      ],
      //名字索引
      initialList: [
        { initial: -1, val: "热门" },
        { initial: "a", val: "A" },
        { initial: "b", val: "B" },
        { initial: "c", val: "C" },
        { initial: "d", val: "D" },
        { initial: "e", val: "E" },
        { initial: "f", val: "F" },
        { initial: "g", val: "G" },
        { initial: "h", val: "H" },
        { initial: "i", val: "I" },
        { initial: "j", val: "J" },
        { initial: "k", val: "K" },
        { initial: "l", val: "L" },
        { initial: "m", val: "M" },
        { initial: "n", val: "N" },
        { initial: "o", val: "O" },
        { initial: "p", val: "P" },
        { initial: "q", val: "Q" },
        { initial: "r", val: "R" },
        { initial: "s", val: "S" },
        { initial: "t", val: "T" },
        { initial: "u", val: "U" },
        { initial: "v", val: "V" },
        { initial: "w", val: "W" },
        { initial: "x", val: "X" },
        { initial: "y", val: "Y" },
        { initial: "z", val: "Z" },
        { initial: 0, val: "#" },
      ],
      //查询参数
      requestParams: {
        area: -1,
        type: -1,
        initial: -1,
      },
      //歌手标表数据
      artists: [],
      disabled: false, //是否无限加载
      loading: true,
      hasMore: true,
      currentPage: 1,
    };
  },
  created() {
    let { area, type, initial } = this.requestParams;
    this.getSingerListData(area, type, initial);

    (area = null), (type = null), (initial = null);
  },
  methods: {
    //获取歌手列表数据
    async getSingerListData(area, type, initial) {
      this.loading = true;
      let res = await request({
        url: "/artist/list",
        method: "get",
        params: {
          area,
          type,
          initial,
          limit: 48,
          offset: (this.currentPage - 1) * 48,
        },
      });
      // console.log(res);
      if (res.data.code !== 200) {
        this.$message.error("获取数据失败，请稍后再试！");
        return;
      }
      this.currentPage += 1;
      this.hasMore = res.data.more;
      this.artists.push(...res.data.artists);
      this.loading = false;
    },
    //处理导航标签点击
    handleClick(tag, tagType) {
      this.requestParams[tagType] = tag;
      this.artists = [];
      this.currentPage = 1;
      let { area, type, initial } = this.requestParams;
      this.getSingerListData(area, type, initial);
      (area = null), (type = null), (initial = null);
    },
    //无限加载事件
    load() {
      let { area, type, initial } = this.requestParams;
      if (this.hasMore) {
        this.getSingerListData(area, type, initial);
      }
      this.disabled = true;
      (area = null), (type = null), (initial = null);
    },
    //跳转到歌手详情页
    toSingerDetail(id){
      console.log(id);
      this.$router.push({
        path:'/singerDetail',
        query:{id}
      })
    }
  },
  watch: {
    requestParams(n, o) {
      console.log(n);
    },
    artists() {
      if (this.hasMore) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
#singer {
  padding: 50px 100px 0 100px;
  width: 100%;
  height: calc(100vh - 110px);
  overflow-y: scroll;
}
.singerNavbar {
  width: 100%;
  min-width: 1100px;
}
.area,
.type,
.initial {
  width: 100%;
  display: flex;
  font-size: 12px;
  margin-bottom: 5px;
  .title {
    line-height: 34px;
    white-space: nowrap;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 60px;
      text-align: center;
      padding: 10px;
      border-radius: 20px;
      margin: 0 5px;
    }
  }
}
.isShow {
  color: #ec4141;
  background-color: #fef6f5;
}
.currentTag:hover {
  background-color: #fef6f5;
}
.singerList {
  width: 100%;
  min-width: 1100px;

  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  .singerItem {
    width: 160px;
    height: 180px;
    margin: 0 20px 10px 0;
    img {
      width: 100%;
      height: 160px;
      border-radius: 5px;
    }
    .singerName {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
</style>