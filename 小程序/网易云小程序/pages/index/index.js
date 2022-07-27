// index.js
// 获取应用实例
const APP = getApp()

Page({
  data: {
   bannerList:[],
   playlists:[],
   newSonglists:[],
   
  },
  // 跳转搜索页面
  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 获取轮播图方法
  getBannner(){
    var that = this
    wx.request({ 
      url: 'http://localhost:3000/banner?type=2',
      success(res){
        that.setData({
          bannerList:res.data.banners
        })
      }
    })
  },
  // 每日推荐
  toRecommendSong(){
    wx.navigateTo({
      url: '../recommendSong/recommendSong',
    })
  },
  //视频页
  showVideo(){
    wx.navigateTo({
      url: '../mv/mv',
    })
  },
  // 歌单
  togedanSquare(){
    wx.navigateTo({
      url: '../gedanSquare/gedanSquare',
    })
  },
  //歌单的歌曲
  tosongSheet(e){
    console.log(e)
    APP.globalData.songSheetId = e.currentTarget.dataset.id
    console.log(APP.globalData.songSheetId)
    wx.navigateTo({
        url: '../songSheet/songSheet',
      })
},
  // 去播放这首歌
  toPlay(e){
    // 获取歌曲id
    // e.currentTarget.dataset.songid
    // 存入全局变量
    // console.log(e.currentTarget.dataset.songid)
    APP.globalData.songid = e.currentTarget.dataset.songid
    // 跳转到播放页面
    wx.switchTab({
      url: '../play/play',
    })
  },
  // 获取精品歌单的方法
  getPlayList(){
    var that = this
    wx.request({
      url: 'http://localhost:3000/top/playlist/highquality?limit=10',
      method:'GET',
      success(res){
        // console.log(res.data.playlists)
        that.setData({
          playlists:res.data.playlists
        })
        console.log(that.data.playlists)
      }
    })
  },
  // 获取新歌数据的方法
  //切割数组sclie()方法 0 3 3 6 6 9


  getNewSong(){
    var arr = []
    var that = this
    wx.request({
      url: 'http://localhost:3000/personalized/newsong?limit=9',
      method:'GET',
      success(res){
        // console.log(res.data.result)
        for (var i = 0;i < 3 ;i++){
          arr[i]=res.data.result.slice(i*3,(i+1)*3)
        }
        // APP.globalData.songList=arr
        that.setData({
          newSonglists:arr
        })
        const songlist = []
        for(var j=0;j<arr.length;j++){
          for(var k=0;k<arr[j].length;k++){
            songlist.push(arr[j][k])

          }
        }
        APP.globalData.songList=songlist
        console.log(songlist)
      }
    })
  },
  onLoad() {
    this.getBannner()
    this.getPlayList()
    this.getNewSong()
  },
 
 
})
