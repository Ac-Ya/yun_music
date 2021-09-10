<template>
  <div id="asideNav">
      <ul  class="musicOperation" v-for="(val,key) in operationList1" :key="key" @click="to(key)">
          <li :class="{pickOn:click === key}">{{val}}</li>
      </ul>
      <!-- <ul class="musicOperation" @click="to">
          <li id="discoverMusic">发现音乐</li>
          <li id="video">视频</li>
          <li id="radio">电台</li>
          <li id="dynamic">动态</li>
          <li id="PrivateFM">私人FM</li>
      </ul> -->
      <div class="myMusic">我的音乐</div>
      <ul class="personOperation" v-for="(val,key) in operationList2" :key="key" @click="to(key)"> 
            <li :class="{pickOn:click === key}">
              <i class="iconfont" :class="iconfontList[key]"></i>
              <span>{{val}}</span>
            </li>
          <!-- <li id="localMusic">
              <i class="iconfont icon-ttpodicon"></i>
              <span>本地音乐</span>
          </li>
          <li id="downloadManager">
              <i class="iconfont icon-xiazaiguanli"></i>
              <span>下载管理</span>
          </li>
          <li id="recentPlay">
              <i class="iconfont icon-zuijinbofang"></i>
              <span>最近播放</span>
          </li>
          <li id="cloudDisk">
              <i class="iconfont icon-yunpan"></i>
              <span>我的音乐云盘</span>
          </li>
          <li id="collection">
              <i class="iconfont icon-favorite"></i>
              <span>我的收藏</span>
          </li>
          <li id="like">
              <i class="iconfont icon-xindong"></i>
              <span>我喜欢的音乐</span>
          </li>
          <li id="collectPlaylist">
              <i class="iconfont icon-gedan"></i>
              <span>收藏的歌单</span>
          </li> -->
      </ul>
  </div>
</template>

<script>
export default {
  name:"AsideNav",
  components: {},
  props: {},
  data() {
    return {
        click:"discoverMusic", //用于定位当前点击的li
        operationList1:{
            discoverMusic:"发现音乐",
            video:"视频",
            radio:"电台",
            dynamic:"动态",
            PrivateFM:"私人FM",
        },
        operationList2:{
            localMusic:"本地音乐",
            downloadManager:"下载管理",
            recentPlay:"最近播放",
            cloudDisk:"音乐云盘",
            collection:"我的收藏",
            like:"我的喜欢",
            collectPlaylist:"收藏的歌单"
        },
        iconfontList:{
            localMusic:"icon-ttpodicon",
            downloadManager:"icon-xiazaiguanli",
            recentPlay:"icon-zuijinbofang",
            cloudDisk:"icon-yunpan",
            collection:"icon-favorite",
            like:"icon-xindong",
            collectPlaylist:"icon-gedan"
        }
    }
  },
  created(){

  },
  methods:{
      to(key){
          this.click = key
        //   this.$router.push("/discoverMusic")
      }
  }
};
</script>
<style lang="less" scoped>
    #asideNav{
        padding: 10px 10px 0 20px;
        // li的样式
        .musicOperation li,.personOperation li{
            width:170px;
            height: 35px;
            line-height: 35px;
            margin-top: 5px;
            padding-left: 3px;
            border-radius: 5px;
            
        } 
        // li移入效果
        .musicOperation li:hover,
        .personOperation li:hover{   
            background-color: #F5F5F5;
        }
    }
    .myMusic{
        margin: 10px 0 ;
        font-size: 14px;
        color: 	#C0C0C0;
    }
    .personOperation .iconfont{
        font-weight: bold;
        margin-right: 10px;
    }
    
    .pickOn{
        font-weight: bold;
         background-color: #F5F5F5;
    }
</style>