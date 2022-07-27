// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      phone:'',
      password:''
    },
    // 输入的事件的处理函数
    handleInput(){

    },
    // 登录相关的处理函数
    login(){
        // 验证手机号，判断手机号是否为空
        if(this.data.phone.trim()==''){
            wx.showToast({
                title: '请输入手机号',
                icon:'none'
        })
        return 
      }

        // 判断密码是否为空
        if(this.data.password.trim()===''){
            wx.showToast({
                title: '请输入密码',
                icon:'none'
        })
        return
     }
     wx.request({
       url: 'http://localhost:3000/login/cellphone',
       data:{
           phone:this.data.phone,
           password:this.data.password
       },
       success(res){
        //    console.log(e)
           if(res.data.code===200){
               //登录成功
               wx.setStorageSync('userinfo', res.data.profile)
               wx.setStorageSync('cookies', res.cookies)
               wx.switchTab({
                 url: '../index/index',
               })
           }else{
               wx.showToast({
                //    登录失败
                 title: '登录异常，请稍后再试',
                 icon:'none'
               })
           }
       },
     })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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