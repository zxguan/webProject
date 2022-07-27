// pages/mineList/mineList.js
const APP = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        songList:[],
        songlista:[],
        playlists: [],
    },
    //获取歌曲的方法
    getSongList(){
    var that = this
    let cookie = wx.getStorageSync('cookie')
    wx.request({
      url: 'http://localhost:3000/playlist/detail',
      header:{
        cookie:cookie
      },
      data:{
        id:APP.globalData.gedanid
        },
        success(res){
         console.log(res.data.playlist.tracks)
         console.log(res)
         that.setData({
          recentPlayList:res.data.playlist.tracks
         })
        }
    })

    },
    toPlaym(e){
      // 1. 拿到歌曲id
      console.log(e)
      console.log(e.currentTarget.dataset.gequid.id)
      // 2. 存入全局变量里
      APP.globalData.songid = e.currentTarget.dataset.gequid.id
      console.log(e.currentTarget.dataset.gequid.id)
      console.log(APP.globalData.songid)
      // 3.跳转到播放页面
      APP.globalData.playList = this.data.recentPlayList
      let index = e.currentTarget.dataset.index
      APP.globalData.playIndex = index
      console.log(index)
      wx.switchTab({
        url: '../play/play',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
            this.getSongList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})