// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [], // 视频列表数据
    videoId: '', // 视频id标识
    videoUpdateTime: [], // 记录video播放的时长
  },
  // 点击播放/继续播放的回调
  showVideo(){
    var that = this
    let cookie = wx.getStorageSync('cookie')
    wx.request({
      url: 'http://localhost:3000/video/timeline/recommend',
      header:{
        cookie:cookie
      },
      success(res){
        console.log(res)
        // console.log(res.data.datas[0].data.previewUrl)
        that.setData({
          // videoList:res.data.datas[0].data.coverUrl
          videoList:res.data.datas
      })
      
      }
    })
  },
  handlePlay(e){
    
    let vid = e.currentTarget.id;
    // console.log(e.currentTarget.id)
    //关闭上一个播放的视频
    // this.vid != vid && this.videoContext && this.videoContext.stop();     
    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid)
    this.videoContext.play()
  },
  getvideodetail(){
    wx.request({
      url: 'http://localhost:3000/video/detail',
      data:{
        id:'15D258CB5A61966E47FA2B5BC4FEADDB'
      },
      success(res){
        // console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showVideo()
    // this.getvideodetail()
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