<template>
  <div id="playList">
    <!-- 精品歌单入口 -->
    <div class="highquality" v-if="highqualityFirst !== null">
      <!-- 精品歌单背景 -->
      <img :src="highqualityFirst.coverImgUrl" alt="" class="backgroundImg" />
      <div class="cover">
        <img :src="highqualityFirst.coverImgUrl" alt="" />
      </div>
      <div class="entryInfo">
        <div class="title">
          <i class="iconfont icon-jingpin"></i>
          <span>精品歌单</span>
        </div>
        <div class="name">{{ highqualityFirst.name }}</div>
        <div class="desc">{{ highqualityFirst.copywriter }}</div>
      </div>
    </div>
    <!-- 导航栏 -->
  
    <!-- 定义组件传入标签  -->
    <nav-bar 
    :tags="hotTags" 
    :tag="currentTag" 
    @child="switchTag" 
    @showAll="showAllTag">
      <el-card class="box-card allTags " slot="allTag"   v-show="show">
        <div slot="header" class="clearfix">
          <span>全部歌单</span>
        </div>
        <div class="text item">
          <div class="category" v-for="(val, key) in categories" :key="key">
            <div class="categoryTitle">
              <i class="iconfont" :class="tagIconfont[key]"></i>
              <span>{{ val }}</span>
            </div>
            <div class="categoryTags">
              <span :class="{categoryTag:item.name == currentTag}" 
              @click="switchTag(item.name)"
              v-for="item in allTagsList[key].List" 
              :key="item.name">
                {{item.name}}
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </nav-bar>
    <!-- 歌单列表 -->
    <card-list
      class="list"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      v-show="currentListData !== null"
    >
      <card-list-item
        class="playListItem"
        v-for="(item, index) in currentListData"
        :key="item.uersId"
        @mouseenter.native="enter(index)"
        @mouseleave.native="leave"
        @click.native="toMusicListDetail(item.id)"
      >
        <img :src="item.coverImgUrl" alt="" slot="item-img" />
        <div slot="item-name" class="playListName">
          <i class="iconfont icon-yonghu1"></i>
          <span>{{ item.creator.nickname }}</span>
        </div>
        <div
          slot="item-playIconfont"
          class="playIcon"
          :class="{ show: showIcon == index }"
        >
          <i class="iconfont icon-bofang"></i>
        </div>
        <div slot="item-playCount" class="count">
          <i class="iconfont icon-bofang"></i>
          <span>{{count(item.playCount)}}</span>
        </div>
        <span slot="item-title" class="playListTitle">
          {{ item.name }}
        </span>
      </card-list-item>
    </card-list>
    <!-- 分页 -->
    <div class="pages" v-show="showPage">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
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
import NavBar from "components/navBar/NavBar.vue";

import CardList from "components/cardList/CardList.vue";
import CardListItem from "components/cardList/CardListItem.vue";

import {tranNumber} from "plugins/utils.js"
export default {
  name: "PlayList",
  components: {
    NavBar,
    CardList,
    CardListItem,
  },
  props: {},
  data() {
    return {
      showIcon: -1,
      highqualityFirst: null, //精品歌单的第一个数据
      hotTags: [], //右侧热门歌单标签
      currentTag: "华语", //当前歌单标签
      currentListData: [], //当前歌单标签的数据
      loading: true,
      showPage: false,
      currentPage: 1, // 当前页数
      total: 0,
      allTagsList: [], //所有标签列表
      categories: null, //所有标签的分类
      tagIconfont: {
        0: "icon-yuyan",
        1: "icon-fengge",
        2: "icon-chabei",
        3: "icon-smile",
        4: "icon-zhuti",
      },
      show:false
    };
  },
  computed: {
    count(){
      return (num,point = 2)=>{
        return tranNumber(num,point)
      }
    }
  },
  created() {
  
    this.getHighQualityFirst();

    //获取热门歌单标签
    this.getHotTags();

    //获取当前歌单标签的列表数据
    this.getCurrentListData();

    //获取所有标签
    this.getAllTags();
  },
  methods: {
    //根据tag获取精品歌单的第一个数据
    async getHighQualityFirst() {
      let res = await request({
        url: "/top/playlist/highquality",
        method: "get",
        params: {
          cat: this.currentTag,
          limit: 1,
        },
      });

      if (res.data.msg) {
        this.highqualityFirst = null;
        return;
      }
      this.highqualityFirst = res.data.playlists[0];

      res = null
    },

    //获取热门歌单标签
    async getHotTags() {
      let res = await request({
        url: "/playlist/hot",
        method: "get",
      });
      this.hotTags = res.data.tags;

      res = null
    },

    //获取当前歌单标签的列表数据
    async getCurrentListData() {
      this.currentListData = [];
      let res = await request({
        url: "/top/playlist",
        method: "get",
        params: {
          cat: this.currentTag,
          limit: 50,
          order: "hot",
          offset: 50 * (this.currentPage - 1),
        },
      });
      // console.log(res);
      let data = res.data.playlists;
      this.currentListData = data
      this.total = res.data.total;
      this.loading = false;
      this.showPage = true;

      res = null
    },

    //点击标签切换事件
    switchTag(tag) {
      this.loading = true;
      this.showPage = false;
      // 修改当前的标签
      this.currentTag = tag;
      // 修改当前页数为1
      this.currentPage = 1;
      //获取当前标签的数据
      this.getCurrentListData();
      this.getHighQualityFirst();
    },
    // 鼠标移入移出事件
    enter(index) {
      this.showIcon = index;
    },
    leave() {
      this.showIcon = -1;
    },
    pageChange(page) {
      this.loading = true;
      this.currentPage = page;
      this.getCurrentListData();
    },

    // 获取所有标签
    async getAllTags() {
      let res = await request({
        url: "/playlist/catlist",
        method: "get",
      });
      this.categories = res.data.categories;
      this.allTagsList = this.allTagCategory(res.data.sub)
    },

    //全部标签分类
    allTagCategory(arr){
      let dataArr = [];
      arr.map((mapItem) => {
        if (dataArr.length == 0) {
          dataArr[mapItem.category]={category: mapItem.category, List: [mapItem] };
        } else {
          let res = dataArr.some((item) => {
            //判断相同，有就添加到当前项
            if (item.category == mapItem.category) {
              item.List.push(mapItem);
              return true;
            }
          });
          if (!res) {
            //如果没找相同,添加一个新对像
            dataArr[mapItem.category]= { category: mapItem.category, List: [mapItem] };
          }
        }
      });
      return dataArr
    },

    showAllTag(data){
      this.show = data
    },
    // 跳转到歌单详情
    toMusicListDetail(id){
      this.$router.push({
        path:"/musicListDetail",
        query:{
          id
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
#playList {
  padding: 50px 100px 0 100px;
  width: 100%;
}
// 精品歌单入口区域
.highquality {
  width: 1100px;
  height: 180px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  padding: 15px 15px;
  position: relative;
  .cover img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin: 0 auto;
  }
}
.backgroundImg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  transform: scale(1.5);
  filter: blur(20px) brightness(80%);
}
.entryInfo {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 15px 0;
  .title {
    width: 100px;
    border-radius: 20px;
    padding: 5px 8px;
    border: 1px solid #e3a858;
    color: #e3a858;
    font-size: 14px;
    .iconfont {
      margin-right: 5px;
    }
  }
  .name {
    color: white;
    margin-top: 20px;
  }
  .desc {
    color: #a9a9a9;
    margin-top: 10px;
    font-size: 12px;
  }
}

// 导航栏
.playlistNav {
  width: 100%;
  height: 30px;
  // border: 1px solid yellow;
  margin: 20px 0;
  position: relative;
  display: flex;
  .currentTag {
    width: 100px;
    height: 30px;
    border: 1px solid #dcdcdc;
    padding: 5px 10px;
    text-align: center;
    border-radius: 15px;
  }
}
.playlistTag {
  display: flex;
  height: 30px;
  line-height: 30px;
  position: absolute;
  right: 0;
  .playlistTagItem {
    padding: 10px;
    // height: 30px;
    margin-left: 5px;
    line-height: 10px;
    text-align: center;
    font-size: 12px;
    border-radius: 10px;
    color: #ec4141;
  }
}

.isShow {
  background-color: #fef6f5;
}

.currentTag:hover {
  background-color: #f5f5f5;
}

.list {
  display: flex;
  flex-wrap: wrap;
  width: 1115px;
  .playListItem {
    width: 19%;
    position: relative;
    img {
      width: 100%;
      border-radius: 10px;
    }
    .playListName {
      position: absolute;
      left: 10px;
      top: 185px;
      color: white;
      font-size: 12px;
    }
    .count {
      position: absolute;
      top: 10px;
      color: white;
      right: 10px;
      font-size: 14px;
    }
    .playListTitle {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 14px;
    }
    .playIcon {
      position: absolute;
      right: 10px;
      bottom: 40px;
      color: #ec4141;
      opacity: 0;
      .iconfont {
        font-size: 30px;
        border-radius: 50%;
        background-color: white;
      }
    }
    .show {
      opacity: 1;
      transition: all 1s;
    }
  }
}

.pages {
  width: 100%;
  text-align: center;
  margin: 20px 0 80px 0;
}

// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }

.box-card {
  width: 800px;
  position: absolute;
  z-index: 99;
  left: 0;
  top: 35px;
}
// 标签分类
.category {
  display: flex;
  width: 100%;
  margin-bottom: 18px;
  .categoryTitle {
    display: flex;
    margin-right: 20px;
    line-height: 35px;
    color: #c0c0c0;
    .iconfont {
      font-size: 20px;
      margin-right: 10px;
    }
    span{
      white-space: nowrap;
    }
  }
  .categoryTags {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 60px;
      height: 35px;
      line-height: 35px;
      margin: 0 20px;
      font-size: 14px;
      white-space: nowrap;
    }
  }
  .categoryTag{
    color: #ec4141;
  }
}
</style>