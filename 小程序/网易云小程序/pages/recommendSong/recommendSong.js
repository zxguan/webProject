// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js'
const APP = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        day:'',//天
        month:'',//月
        recommendList:[],//推荐歌曲数据
        index:0//点击音乐的下标
    },
     // 去播放这首歌
     toPlay(e){
        // 获取歌曲id
        // e.currentTarget.dataset.songid
        // 存入全局变量
        // console.log(e.currentTarget.dataset)
        let {song,index} = e.currentTarget.dataset
        this.setData({
            index 
        })
        console.log(e)
        APP.globalData.songid = song.id
        // console.log(APP.globalData.songid)
        // 跳转到播放页面
        wx.switchTab({
          url: '../play/play',
        })
      },
    // 获取用户每日推荐数据
    getRecommendList(){
        // 获取缓存区的cookie数组，通过find方法查询item包含‘MUSIC_U’的值，如果有值返回字符串，没有的返回-1；
        // 若本地没有cookie则为空''，indexOf（）方法返回某个指定的字符串值在字符串中首次出现的位置
        //  let cookie = wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
       
         wx.request({
             url: 'http://localhost:3000/recommend/songs',
             header:{
                cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
             },
             success:(res)=>{
                // console.log(res)
                this.setData({
                    recommendList:res.data.data.dailySongs
                })
                APP.globalData.songList=this.data.recommendList
                console.log(this.data.recommendList)
             }     
         })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 判断用是否登录
        let userinfo = wx.getStorageSync('userinfo')
        if(!userinfo){
            wx.showToast({
              title: '请先登录',
              icon:'none',
              success:()=>{
                  //跳转至登录页面
                  wx.reLaunch({
                    url: '../login/login',
                  })
              }
            })
        }
        // 更新日期的状态数据 
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        })

        // 获取用户每日推荐
        this.getRecommendList()

        // 订阅（接收）来自play页面的发来的消息
        PubSub.subscribe('switchType',(msg,type) => { 
            let{recommendList} = this.data
            if(type === 'pre'){//上一首
                (this.data.index === 0) && (this.data.index = recommendList.length)
                this.data.index -= 1
            }else{//下一首
                (this.data.index === recommendList.length-1) && (this.data.index = -1)
                this.data.index += 1
            }
            // 更新下标
            this.setData({
                index:this.data.index
            })
            let musicId = recommendList[this.data.index].id
            // 将musicId回传给play页面
            PubSub.publish('musicId',musicId)
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