// pages/playList/playList.js
const APP = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      songList:[]
    },
    // 去播放这首歌
    toPlay(e){
      // 获取歌曲id
      // e.currentTarget.dataset.songid
      // 存入全局变量
      console.log(e)
      APP.globalData.songid = e.currentTarget.dataset.songid
      // console.log(APP.globalData.songid)
      // 跳转到播放页面
      wx.switchTab({
        url: '../play/play',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    //   拿到用户输入的搜索关键字
      let keywords = APP.globalData.keywords

      let that = this
    //   根据keyWorlds发请求拿到相关数据
      wx.request({
        url: 'http://localhost:3000/cloudsearch',
        data:{
            keywords:keywords,
            limit:15
        },
        success(res){
          // console.log(res.data.result)
          that.setData({
            songList:res.data.result.songs
          })
          APP.globalData.songList=that.data.songList
          console.log(APP.globalData.songList)
        }
    })
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