// pages/mine/mine.js
// 获取应用实例
const APP = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        songid:0,
        userinfo:{},
        recentPlayList:[],
        bannerList: [],
        playlists: [],
        songList: []
    },
    // 获取历史播放
    getHistoryPlay(){
        wx.request({
          url: 'http://localhost:3000/user/record',
          data:{
            uid:this.data.userinfo.userId
          },
          success:(res)=>{
              console.log(res.data.allData.slice(0,20))
              this.setData({
                  recentPlayList:res.data.allData.slice(0,20)
              })
              console.log(this.data.recentPlayList)
              for(var i=0;i<this.data.recentPlayList.length;i++){
                   APP.globalData.songList[i]=this.data.recentPlayList[i].song
              }
              console.log(APP.globalData.songList)
             
            
          }
        })
    },
    // 去播放这首歌
    toPlay(e){
        // 获取歌曲id
        // e.currentTarget.dataset.songid
        // 存入全局变量
        console.log(e)
        APP.globalData.songid =e.currentTarget.dataset.id.song.id
        // 跳转到播放页面
        wx.switchTab({
            url: '../play/play',
        })
    },
    // 跳转到登录页面
    toLogin(){
        wx.redirectTo({
          url: '../login/login',
        })
    },
    // 登出
    logout(){
        this.setData({
            userinfo:{},
            recentPlayList:[]
        })
        wx.removeStorageSync('userinfo')
    },
 //获取用户歌单
 getgedan(){
        
},
search(){
    wx.navigateTo({
      url: '../minelove/minelove',
    })
},
toLogin(){
    wx.redirectTo({
      url: '../login/login',
    })
},
logout(){
    this.setData({
        userinfo:{},
        recentPlayList:[]
    })
    wx.removeStorageSync('userinfo')
},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let obj = wx.getStorageSync('userinfo')
        this.setData({
            userinfo:obj
        })
        if(this.data.userinfo){
            this.getHistoryPlay()
        }
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