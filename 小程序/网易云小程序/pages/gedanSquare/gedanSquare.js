// pages/gedanSquare/gedanSquare.js
const APP = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gedanSquareList:[],//导航标签数据
        navName:'',//导航的标识
        navId:'',
        gedanList:[]//歌单列表数据
    },
    tosongSheet(e){
        // console.log(e)
        APP.globalData.songSheetId = e.currentTarget.dataset.id
        console.log(APP.globalData.songSheetId)
        wx.navigateTo({
            url: '../songSheet/songSheet',
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getgedanSquareListData()
    },
    // 获取导航标签数据
    getgedanSquareListData(){
        // if(!navId){//判断navId为空字符串的情况
        //     return
        // }
        wx.request({
          url: 'http://localhost:3000/playlist/catlist',
          success:(res)=>{
            console.log(res)
            let gedanSquareListData = res.data.sub.slice(0,14)
            //   赋予id
            let index = 0
            let gedanSquareListData2 = gedanSquareListData.map(item =>{
                item.id = index++
                return item
            })
            this.setData({
                gedanSquareList:gedanSquareListData2,
                navName:res.data.sub[0].name,
                navId:res.data.sub[0].id
             
            })

            
            // 获取导航列表数据
            this.getgedanSquareList(this.data.navName)
          }
        })
    },
    changeNav(e){
        // console.log(e)
        let navName = e.currentTarget.dataset.name
        let navId =  e.currentTarget.dataset.id
        this.setData({
            // 将目标数据先转换成二进制，然后移动指定的位数
            // 右移零位会将非number数据强制转换成number
            navName: navName,
            navId:navId,
            gedanList:[]
        })
        // 显示正在加载
        wx.showLoading({
          title: '正在加载',
        })
        //动态获取当前导航对饮的歌单数据
        this.getgedanSquareList(this.data.navName)
    },
    // 获取导航列表数据
    getgedanSquareList(navName){
        wx.request({
          url: 'http://localhost:3000/top/playlist',
          data:{
            cat:navName,
            limit:33
          },
          
          success:(res)=>{
            console.log(res)
            this.setData({
            gedanList:res.data.playlists
            })
          }
        }),
        wx.hideLoading()
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