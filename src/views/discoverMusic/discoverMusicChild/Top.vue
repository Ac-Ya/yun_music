<template>
  <div id="top">
    <div class="listTitle">
      <span>官方榜</span>
    </div>
    <!-- 官方榜数据 -->
    <div
      class="topItem"
      v-for="(item, indez) in officalListData"
      :key="item.id"
    >
      <div class="coverImg" @click="toMusicListDetail(item.id)">
        <img :src="item.coverImgUrl" alt="" />
        <span>{{ item.updateFrequency }}</span>
      </div>
      <div class="musicList">
        <div
          class="musicListItem"
          :class="{ showBackground: index % 2 == 0 }"
          v-for="(musicItem, index) in officalListDetail[indez] &&
          officalListDetail[indez].slice(0, 5)"
          :key="musicItem.id"
          @dblclick="playMusic(musicItem.id,index,indez,item.id)"
        >
          <span class="ranking" :class="{ showColor: index < 3 }">{{
            index + 1
          }}</span>
          <span class="musicName">{{ musicItem.name }}</span>
          <span class="singer"
            >{{ musicItem.ar[0].name
            }}{{ musicItem.ar[1] ? "/" + musicItem.ar[1].name : "" }}</span
          >
        </div>
      </div>
    </div>
    <!-- 全球榜数据 -->
    <div class="listTitle" v-if="globalListData !== null">
      <span>全球榜</span>
    </div>
    <div class="globalList" v-if="globalListData !== null">
      <div
        class="listItem"
        @mouseenter="enter(indey)"
        @mouseleave="leave(indey)"
        @click="toMusicListDetail(listItem.id)"
        v-for="(listItem, indey) in globalListData"
        :key="listItem.id"
      >
        <img :src="listItem.coverImgUrl" alt="" />
        <div class="playNum">
          <i class="iconfont icon-bofang4"></i>
          <span>{{ count(listItem.playCount) }}</span>
        </div>
        <div class="playIcon" :class="{ show: showIcon == indey }">
          <i class="iconfont icon-bofang"></i>
        </div>
        <span class="playlistTitle">{{ listItem.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "network/request.js";
import { tranNumber } from "plugins/utils.js";
export default {
  name: "Top",
  components: {},
  props: {},
  data() {
    return {
      showIcon: -1,
      officalListData: [], //官方榜的数据
      officalListDetail: [],
      globalListData: [], //全球榜数据
    };
  },
  computed: {
    count() {
      return (num, point = 2) => {
        return tranNumber(num, point);
      };
    },
  },
  created() {
    //获取榜单数据
    this.getTopListData();
  },
  methods: {
    // 获取榜单数据
    async getTopListData() {
      let res = await request({
        url: "/toplist",
        method: "get",
      });
      let data = res.data.list.slice(0, 4);
      // console.log(data);
      this.officalListData = data;
      data.slice(0, 4).forEach((item, index) => {
        this.getOfficalListDetail(item.id);
      });
      this.globalListData = res.data.list.slice(4);

      (res = null), (data = null);
    },
    // 获取官方榜的详情数据
    async getOfficalListDetail(id) {
      let res = await request({
        url: "/playlist/detail",
        method: "get",
        params: {
          id,
        },
      });
      this.officalListDetail.push(res.data.playlist.tracks);
      res = null;
    },

    // 鼠标移入移出事件
    enter(indey) {
      this.showIcon = indey;
      // console.log(index);
    },
    leave() {
      this.showIcon = -1;
    },

    //跳转到音乐榜单详情页
    toMusicListDetail(id) {
      this.$router.push({
        path: "/musicListDetail",
        query: {
          id,
        },
      });
    },
    playMusic(musicId,index,indez,musicListId){
      // index 是榜单所在索引
      //indez 是歌曲在榜单中的索引
      let store =  this.$store
      //将当前音乐id保存在vuex中
      store.commit("modifyMusicId", { musicId, index });
      store.commit("currentMusicList", this.officalListDetail[indez]);
      store.commit("modifyMusicListId",musicListId)
      store.commit("currentPlayState",true)
    }
  },
};
</script>
<style lang="less" scoped>
#top {
  padding: 50px 100px 0 100px;
  min-width: 1100px;
}
.listTitle {
  width: 100%;
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
}
.topItem {
  display: flex;
  margin-bottom: 50px;
  .coverImg {
    position: relative;
    width: 180px;
    height: 180px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    span {
      position: absolute;
      white-space: nowrap;
      color: white;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 30px);
    }
  }
  .musicList {
    flex: 1;
    height: 180px;
  }
}
.musicListItem {
  display: flex;
  width: 100%;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  padding: 0 10px;
  .ranking {
    width: 20px;
    height: 100%;
  }
  .count {
    width: 40px;
  }
  .musicName {
    flex: 1;
  }
  &:hover {
    background-color: #f3f3f3;
  }
}
.showBackground {
  border-radius: 5px;
  background-color: #f9f9f9;
}
.showColor {
  color: #ec4141;
}

.globalList {
  display: flex;
  flex-wrap: wrap;
  min-width: 1100px;
  margin-bottom: 70px;
  .listItem {
    position: relative;
    min-width: 150px;
    max-width: 200px;
    margin: 0 20px 20px 0;
  }
  // 标题样式
  .playlistTitle {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    margin-top: 5px;
  }
  //icon图标样式
  .playIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ec4141;
    opacity: 0;
    .iconfont {
      font-size: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
  .show {
    opacity: 1;
    transition: all 1s;
  }
}
.listItem img {
  width: 100%;
  border-radius: 5px;
}

.playNum {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 12px;
  color: white;
}
</style>