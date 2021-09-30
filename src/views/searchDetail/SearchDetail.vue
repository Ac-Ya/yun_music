<template>
  <div id="searchDetail">
    <div class="sdHearder">找到({{ total }})首{{ currentTag }}</div>
    <div class="searchDetailNav">
      <div
        class="navItem"
        :class="{ showBottom: item.tag === currentTag }"
        v-for="item in navBarList"
        :key="item.id"
        @click="handleClick(item.tag, item.id)"
      >
        {{ item.tag }}
      </div>
    </div>
    <!-- <keep-alive :include="['SearchSong', 'SearchSinger','SearchAlbum','SearchMusicList','SearchMVideo']">
      <component :is="show" ></component>
    </keep-alive> -->
    <template v-if="result !== null">
      <search-song
        :songs="result.songs"
        v-show="currentTag === '单曲'"
      ></search-song>
      <search-singer
        :singers="result.artists"
        v-show="currentTag === '歌手'"
      ></search-singer>
      <search-album v-show="currentTag === '专辑'" :albums="result.albums">
      </search-album>
      <search-music-list
        v-show="currentTag === '歌单'"
        :musicList="result.playlists"
      ></search-music-list>
      <search-m-video
        v-show="currentTag === '视频'"
        :mvListData="result.videos"
      ></search-m-video>
    </template>

    <!-- 分页 -->
    <div class="pages" v-if="!(total < 100)">
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
import SearchSong from "views/searchDetail/searchDetailChild/SearchSong.vue";
import SearchSinger from "views/searchDetail/searchDetailChild/SearchSinger.vue";
import SearchAlbum from "views/searchDetail/searchDetailChild/SearchAlbum.vue";
import SearchMusicList from "views/searchDetail/searchDetailChild/SearchMusicList.vue";
import SearchMVideo from "views/searchDetail/searchDetailChild/SearchMVideo.vue";

import MNav from "components/navBar2/MNavbar.vue";
export default {
  name: "vue",
  components: {
    SearchSong,
    SearchSinger,
    SearchAlbum,
    SearchMusicList,
    SearchMVideo,
  },
  props: {},
  data() {
    return {
      navBarList: [
        { tag: "单曲", id: 1 },
        { tag: "歌手", id: 100 },
        { tag: "专辑", id: 10 },
        { tag: "歌单", id: 1000 },
        { tag: "视频", id: 1014 },
      ],
      keywords: "",
      currentTag: "单曲",
      total: 0,
      currentPage: 1,
      result: null,
      type: 1,
      show:'SearchSong'
    };
  },
  created() {
    let keywords = this.$route.query.keywords;
    this.keywords = keywords;
    this.getSearchInfo(keywords, 1, 1);
  },
  methods: {
    handleClick(tag, type) {
      this.currentTag = tag;
      this.type = type;
      let show =''
       switch (type) {
        case 1:
          show = 'SearchSong';
          break;
        case 100:
           show = 'SearchSinger';
          break;
        case 10:
          show = 'SearchAlbum';
          break;
        case 1000:
           show = 'SearchMusicList';
          break;
        case 1014:
           show = 'SearchMVideo';
          break;
        default:
          break;
      }
      this.show = show
      this.getSearchInfo(this.keywords, type, this.currentPage);
      show = null
    },
    //获取搜索的信息
    async getSearchInfo(keywords, type, currentPage) {
      let timeStamp = new Date();
      let res = await request({
        url: "/cloudsearch",
        params: {
          keywords,
          limit: 48,
          offset: (currentPage - 1) * 48,
          type,
          timeStamp,
        },
      });
      let result = res.data.result;
      this.result = result;
      let total = 0;
      switch (type) {
        case 1:
          total = result.songCount;
          break;
        case 100:
          total = result.artistCount;
          break;
        case 10:
          total = result.albumCount;
          break;
        case 1000:
          total = result.playlistCount;
          break;
        case 1014:
          total = result.videoCount;
          break;
        default:
          break;
      }
      this.total = total;
      (res = null), (result = null), (total = null);
    },
    //分页事件
    pageChange(page) {
      this.currentPage = page;
      this.result = null;
      this.getSearchInfo(this.keywords, this.type, page);
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
#searchDetail {
  width: 100%;
  // padding: 0 20px;
  .sdHearder {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    margin: 10px 20px;
  }
  .searchDetailNav {
    display: flex;
    width: 100%;
    // border: 1px solid red;
    height: 40px;
    padding: 0 20px;
    font-weight: bold;
  }
}
.navItem {
  height: 30px;
  line-height: 30px;
  margin-right: 30px;
}
.showBottom {
  border-bottom: 3px solid #ec4141;
}

.show {
  width: 100%;
}
//分页
.pages {
  width: 100%;
  text-align: center;
  margin-bottom: 100px;
}
</style>