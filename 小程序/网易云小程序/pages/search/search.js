// pages/search/search.js
const APP = getApp()
let isSend = false ;//函数节流使用
Page({

    /**
     * 页面的初始数据
     */
    data: {
      inputValue:'',//用户输入的表单项数据
      searchList:[], //关键字模糊匹配的数据
      historyList:[],
      topSearchList:[]
    },
    
    // 表单项内容发生改变的回调
    handleInputChange(e){
      console.log(e)
      // 更新inputValue的状态数据
      this.setData({
        inputValue:e.detail.value.trim()
      })
      if(isSend){
        return 
      }
      isSend = true
      console.log(isSend)
      this.getSearchList()
      setTimeout(()=>{
        isSend = false
        console.log(isSend)
      },300)
    },
    
    // 获取搜索数据的功能函数
    getSearchList(){
      if(!this.data.inputValue){
        this.setData({
          searchList:[]
        })
      }
      //发请求获取关键字模糊匹配数据 
      let that = this
      wx.request({
        url: 'http://localhost:3000/search',
        data:{
            keywords:this.data.inputValue,
            limit:10
        },
        success(res){
          // console.log(11111)
          // console.log(res.data.result.songs)
          that.setData({
            searchList:res.data.result.songs
          })
        }     
     })
    },

    search(){
      // 判断输入的值是否为空，如果为空，则不进行操作
      if(!this.data.inputValue.trim()){
        return
      }
      APP.globalData.keywords = this.data.inputValue
      wx.navigateTo({
        url: '../playList/playList',
      })
      this.setData({
        searchList:[]
      })
     
      // 通过includes方法判断一个数是否在数组中存在，如果参数中指定的元素包含在数组中，则返回true;如果未包含，则返回false
      // 如果不存在，则把输入的值添加给搜索历史数组
      let isIn = this.data.historyList.includes(this.data.inputValue)
      if(!isIn){
        // 向数组histoList添加数据，通过push方法添加
        // this.data.historyList.push(this.data.inputValue)

        // 第二种方法实时添加数据到数组中，拷贝一份数据到一个新数组中，通过新数组使用push添加数据，然后用this.setData把数据给historyList
        let arr = this.data.historyList
        arr.push(this.data.inputValue)
        this.setData({
          historyList:arr
        })
        wx.setStorageSync('historyList',arr)
      }

       // 清空搜索框
       this.setData({
        inputValue:''
      })
      
    },
    // 清除全部
    clearAll(){
      this.setData({
        historyList:[]
      })
      wx.removeStorageSync('historyList')
    },
    changeInputValue(e){
      console.log(e.target.dataset.text)
      if(e.target.dataset.text){
        this.setData({
          inputValue:e.target.dataset.text
        })
      }
    },
    // 获取热搜词
    gettopSearch(){
      var that = this
      wx.request({
        url: 'http://localhost:3000/search/hot',
        method:'GET',
        success(res){
          console.log(res.data.result.hots)
          that.setData({
            topSearchList:res.data.result.hots
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(){
      this.gettopSearch()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      let arr = wx.getStorageSync('historyList')||[]
      // console.log(arr)
      this.setData({
        historyList:arr
      })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})