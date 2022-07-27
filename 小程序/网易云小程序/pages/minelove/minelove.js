// pages/minelove/minelove.js
const APP = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        usreinfo:{},
        playlists:[],
        gedanid:''
       
    },

      // 获取收藏歌单的方法
    getPlayList() {
    var that = this
    wx.request({
      url: 'http://localhost:3000/user/playlist',
      data:{
        uid:this.data.userinfo.userId
        },
      // method: "GET",
      success(res) {
        // console.log(res.data.playlist[0].name)
        // console.log(res.data.playlist[0].trackCount)
        console.log(res.data.playlist.slice(0,15))
        that.setData({
          playlists: res.data.playlist.slice(0,15)
        })
      }
    })
  },



    // 点击查看歌单歌曲
    toPlay(res){
      console.log(res)
     
      wx.navigateTo({
        url: '../mineList/mineList',
      })
      console.log(res) 
      APP.globalData.gedanid=res.currentTarget.dataset.gedanid.id   
      console.log(APP.globalData.gedanid)
      // console.log(res.currentTarget.dataset.gedanid.id)     
      

    },
  onLoad(){
    //把本地缓存中的用户信息拿过来
    let obj = wx.getStorageSync('userinfo')
    this.setData({
        userinfo:obj
    })
      //获取用户播放记录
      if(this.data.userinfo.userId){
        this.getPlayList()
    }
    // this.getPlayList()
  }
})