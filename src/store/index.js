import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: 0,
    isLogin: false,
    currentMusic: {
      musicId: 0,
      index: -1,
      state:null,//   state用于添加或删除musicList中的数据
    },//保存当前音乐的id和当前音乐所在音乐列表的索引
    /* 1表示随机播放,2表示单曲循环,0表示顺序播放 */
    musicModel: 0,//用于保存当前的音乐播放模式
 
    musicList: [],//当前播放音乐所在的歌单
    musicListId: '',//当前播放歌单的id
    // musicList2:[],//保存进入音乐列表时的歌单

    isPlay: false,//当前播放状态
    showDetail: false,
    currentPlayTime: 0,//当前播放时间
    showBottomControl: true, //是否显示底部控制栏
    currentKeywords:'',//当前的keywords
  },
  mutations: {
    UID(state,payload) {
      state.uid = payload
    },
    updataLoginState(state, payload) {
      state.isLogin = payload
    },
    modifyShowDetail(state, payload) {
      state.showDetail = payload
    },
    modifyMusicId(state, payload) {
      state.currentMusic = payload
    },
    currentMusicList(state, payload) {
      state.musicList = payload
    },
    currentPlayState(state, payload) {
      state.isPlay = payload
    },
    updatePlayModel(state, payload) {
      state.musicModel = payload
    },
    modifyMusicListId(state, payload) {
      state.musicListId = payload
    },
    modifyPlayTime(state, payload) {
      state.currentPlayTime = payload
    },
    modifyShowBottomControl(state, payload) {
      state.showBottomControl = payload
    },
    updateCurrentKeywords(state, payload) {
      state.currentKeywords = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
