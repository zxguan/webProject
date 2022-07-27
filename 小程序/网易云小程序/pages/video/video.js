

Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList:[],//导航标签数据
        navId:'',//导航的标识
        videoList:[],//视频列表数据
        videoId:'',//视频的id标识
        videoUpdateTime:[] //记录播放的时间
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
        //  获取导航标签数据
        this.getVideoGroupListData()
        
    },
    // 获取导航标签数据
    getVideoGroupListData(){
        wx.request({
          url: 'http://localhost:3000/video/group/list',
          success:(res)=>{
            //   console.log(res.data.data.slice(0,14))
              let videoGroupListData = res.data.data.slice(0,14)
              this.setData({
                  videoGroupList:videoGroupListData,
                  navId:res.data.data[0].id
              })
            //   console.log(this.data.navId)
              // 获取导航列表数据
              this.getVideoList(this.data.navId)
          }
        })
    },

    // 点击切换导航标签的回调
    changeNav(e){
        // 若以id形式传参的话：通过id传参的时候，如果传的是number会自动转换成String
        // let navId = e.currentTarget.id
        // // console.log(typeof navId) 
        // this.setData({
        //     navId: navId*1
        // })
        // 若以data-id形式传参的话
        let navId = e.currentTarget.dataset.id
        this.setData({
            // 将目标数据先转换成二进制，然后移动指定的位数
            // 右移零位会将非number数据强制转换成number
            navId: navId>>>0
        })
    },
    
    //获取视频列表的数据
    getVideoList(navId){
        if(!navId){//判断navId为空字符串的情况
            return
        }
        wx.request({
          // url: 'http://localhost:3000/video/group',
          url: 'http://localhost:3000/video/timeline/recommend',
          // data:{
          //     id:navId
          // },
          header:{
            cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
          },
          success:(res)=>{
              console.log(res.data.datas)
              //   赋予id
              let index = 0
              let videoListData = res.data.datas.map(item =>{
                  item.id = index++
                  return item
              })
              this.setData({
                  videoList:videoListData
              })
          }
        })
    }, 

    // 点击播放、接续播放的回调
    /* 
    *  问题：多个视频同时播放的问题
    *  需求：
    *   1.在点击播放的事件中需要找到上一个播放的视频
    *   2.在播放新的视频之前关闭上一个正在播放的视频
    *  关键：
    *   如何找到上一个视频的实例对象
    *   如何确认点击播放的视频和正在播放的视频不是同一个视频
    * 单例模式
    * 1.需要创建多个对象的场景下，通过一个变量接受，始终保持只有一个对象
    * 2.节省内存空间
    **/
    handlePlay(e){
      // console.log('play')
      let vid = e.currentTarget.id
      // 判断是否有上一个视频的id，true的关闭上一个播放的视频
      // this.vid !== vid && this.videoContext && this.videoContext.stop()
      // this.vid = vid

      // 更新data中videId的状态数据
      this.setData({
        videoId: vid
      })
      // 创建控制video标签的实例对象
      this.videoContext = wx.createVideoContext(vid)
      // 判断当前的视频之前是否有播放过，是否有播放记录，如果有，跳转至指定的播放位置
      let {videoUpdateTime} = this.data
      let videoItem = videoUpdateTime.find(item => item.vid === vid)
      if(videoItem){
        this.videoContext.seek(videoItem.currentTime)
      }
      this.videoContext.play()
      // this.videoContext.stop()
    },
    // 监听视频播放进度的回调
    handleTimeUpdate(e){
      // console.log(e)
      let videoTimeObj = {vid:e.currentTarget.id,currentTime:e.detail.currentTime}
      let {videoUpdateTime} = this.data
     /**
      * 思路：判断记录播放时长的videoUpdateTime数组中是否有当前视频的播放记录
      *   1、如果有，在原有的播放记录照片那个修改播放时间为当前的播放时间
      *   2、如果没有，需要在数组中天剑当前视频的播放对象
      */
      let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid)
      if(videoItem){//之前有
        videoItem.currentTime = e.detail.currentTime
      }else{//之前没有
        videoUpdateTime.push(videoTimeObj)
      }
      // 更新videoUpdateTime的状态
      this.setData({
        videoUpdateTime
      })
    },
    // 视频播放结束调用的回调
    handleEnded(e){
      // 移除记录播放时长数组中当前视频的对象
      let {videoUpdateTime} = this.data
      videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === e.currentTarget.id),1)
      this.setData({
        videoUpdateTime
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