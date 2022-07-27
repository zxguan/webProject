// pages/songsheet/songSheet.js
import PubSub from 'pubsub-js'
const APP = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        songSheetList:[],//歌单的歌曲数据
        index:0//点击音乐的下标
    },
    toPlay(e){
        // let {song,index} = e.currentTarget.dataset
        // this.setData({
        //     index 
        // })
        // console.log(e)
        APP.globalData.songid = e.currentTarget.dataset.song.id
        console.log(APP.globalData.songid)
        wx.switchTab({
            url: '../play/play',
          })
    },
    // 获取歌单的数据
    getSongSheetList(){
        wx.request({
          url: 'http://localhost:3000/playlist/detail',
          data:{
              id:APP.globalData.songSheetId
          },
          success:(res)=>{
            console.log(res)
            this.setData({
                songSheetList:res.data.playlist.tracks
            })
            console.log(this.data.songSheetList)
            APP.globalData.songList=this.data.songSheetList
            console.log(APP.globalData.songList)
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取歌单的数据
        this.getSongSheetList()

        //  // 订阅（接收）来自play页面的发来的消息
        //  PubSub.subscribe('switchType',(msg,type) => { 
        //     let{songSheetList} = this.data
        //     if(type === 'pre'){//上一首
        //         (this.data.index === 0) && (this.data.index = songSheetList.length)
        //         this.data.index -= 1
        //     }else{//下一首
        //         (this.data.index === songSheetList.length-1) && (this.data.index = -1)
        //         this.data.index += 1
        //     }
        //     // 更新下标
        //     this.setData({
        //         index:this.data.index
        //     })
        //     let musicId = songSheetList[this.data.index].id
        //     // 将musicId回传给play页面
        //     PubSub.publish('musicId',musicId)
        // }) 
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