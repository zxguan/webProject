// pages/play/play.js
const APP = getApp()
let IAC = wx.createInnerAudioContext()
import { formatTime } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isplay: false,
    songid: '',
    songDetail: {},
    // 歌曲总长度
    allTime: 0,
    // 歌曲当前所在时间
    currentTime: 0,
    // 歌词
    lyricArr:[],
    // 歌词区域向上滚动的距离
    scrolltop:0,
    // 当前歌词的下标
    lyricIndex:0,
    //歌曲下标
    currentIndex:0,
    songList:[]
  },
  /**点击播放列表中的歌曲函数 */
 
  
  /**上一曲函数 */
  // playUp(){
  //   this.playButton()
  //   //判断其在一列中所在的位置是否大于零
  //   if(this.data.currentIndex[1]>0){
  //     var index = this.data.currentIndex[1]
  //        index--
  //         this.data.currentIndex.splice(1,1,index)
  //         // this.data.currentIndex.push(index)
  //         console.log(this.data.currentIndex) 
  //   }else
  //   //判断其在一列中所在的位置是否等于零
  //   //if(this.data.currentIndex[1]==0)
  //   {
  //     //判断其在哪一列中所在的位置是否大于零
  //     if(this.data.currentIndex[0]>0){
  //       var index = this.data.currentIndex[0] 
  //       index--
  //       this.data.currentIndex.splice(0,1,index)
  //       this.data.currentIndex.splice(1,1,this.data.songList[index].length-1)
  //         console.log(this.data.currentIndex) 

  //     }else
  //      //判断其在哪一列中所在的位置是否等于零
  //     //if(this.data.currentIndex[0]===0)
  //     {
  //       console.log(this.data.songList.length)
  //       var index =this.data.songList.length
  //       index--
  //       this.data.currentIndex.splice(0,1,index)
  //       var vae = this.data.songList[index].length
  //       vae--
  //       // console.log(this.data.songList[index].length)
  //       this.data.currentIndex.splice(1,1,vae)
  //       console.log(this.data.currentIndex)
  //     }
  //   }
  //     //找到上一首歌
  //     const index_1 = this.data.currentIndex[0]
  //     const index_2 = this.data.currentIndex[1]
  //     const sid = this.data.songList[index_1][index_2].id
  //     console.log(this.data.songList[index_1][index_2]) 
  //     this.setData({
  //       songid:sid
  //     })
  //     APP.globalData.songid = this.data.songList[index_1][index_2]
  //     // 调用方法，拿到url
      
  //     this.getSongUrl()
  //     // 拿到歌曲详情
  //     this.getSongDetail()
  //     // 拿到歌词
  //     this.getLyric()
  //     this.setData({
  //       currentIndex:[]
  //       // lyricIndex:0,
  //       // scrolltop:0,
  //       // currentTime:0
  //     })
  //     setTimeout(() => {
  //       console.log(IAC.paused)
  //     }, 1000)
  //     // this.timeLycri()
   
  //     // IAC.play()
  // },
  // /**下一曲函数 */
  // playNext(){
  //   this.playButton()
  //   var a = this.data.currentIndex[0]
  //   var re = this.data.songList[a].length-1
  //   var ae = this.data.songList.length-1
  //   if(this.data.currentIndex[1]<re){
  //     var index = this.data.currentIndex[1]
  //        index++
  //         this.data.currentIndex.splice(1,1,index)
  //         // this.data.currentIndex.push(index)
  //         console.log(this.data.currentIndex) 
  //   }else
  //   //判断其在一列中所在的位置是否等于零
  //   //if(this.data.currentIndex[1]==re)
  //   {
  //     //判断其在哪一列中所在的位置是否大于零
  //     if(this.data.currentIndex[0]<ae){
  //       var index = this.data.currentIndex[0] 
  //       index++
  //       this.data.currentIndex.splice(0,1,index)
  //       this.data.currentIndex.splice(1,1,0)
  //         console.log(this.data.currentIndex) 

  //     }else
  //      //判断其在哪一列中所在的位置是否等于零
  //     //if(this.data.currentIndex[0]===0)
  //     {
     
  //       // console.log(this.data.songList[index].length)
  //       this.data.currentIndex.splice(0,1,0)
  //       this.data.currentIndex.splice(1,1,0)
  //       console.log(this.data.currentIndex)
  //     }
  //   }
  //     //找到下一首歌
  //     const index_1 = this.data.currentIndex[0]
  //     const index_2 = this.data.currentIndex[1]
  //     const sid = this.data.songList[index_1][index_2].id
  //     console.log(this.data.songList[index_1][index_2]) 
  //     this.setData({
  //       songid:sid
  //       // lyricIndex:0,
  //       // scrolltop:0,
  //       // currentTime:0
  //     })
  //     APP.globalData.songid = this.data.songList[index_1][index_2]
  //     // 调用方法，拿到url
  //     this.getSongUrl()
  //     // 拿到歌曲详情
  //     this.getSongDetail()
  //     // 拿到歌词
  //     this.getLyric()
  //     this.setData({
  //       currentIndex:[]
  //     })
      
  //     // this.timeLycri()
  //     setTimeout(() => {
  //       console.log(IAC.paused)
  //     }, 1000)
  //     // this.setData({
  //     //   currentTime:0,
  //     // })
  //     // this.timeLycri()
  //     // IAC.play()

  // },
  // timeLycri(){
  //   IAC.onTimeUpdate(() => {
  //     // console.log('进度更新了')
  //     // console.log(IAC.currentTime)//单位为s
  //     this.setData({
  //       currentTime: IAC.currentTime
  //     })
  //     // hh：mm：ss
  //     let nowtime = formatTime(IAC.currentTime)
  //     // console.log(nowtime)
  //     // 根据lyricIndex计算出向上滚出去的距离
  //     if(this.data.lyricIndex>5){
  //       this.setData({
  //         scrolltop:(this.data.lyricIndex-5)*40
  //       })
  //       // this.data.scrollHeight = 
  //     }
  //     let length = this.data.lyricArr.length
  //     // 文稿对应行颜色改变
  //     if (this.data.lyricIndex !== this.data.lyricArr.length - 1) {
  //       // 遍历歌词 判断当前在哪句歌词
  //       var i = 0
  //       for(i=0;i<this.data.lyricArr.length;i++){
  //         if(this.data.lyricIndex === this.data.lyricArr.length-2){
  //           //如果是最后一句歌词只能和最后一句歌词的时间比较
  //           if(nowtime>this.data.lyricArr[length-1].time){
  //             this.setData({
  //               lyricIndex:length-1
  //             })
  //             return
  //           }
  //         }else{
  //           //不是最后一句则和前一句和后一句比较
  //           if(nowtime>this.data.lyricArr[i].time&&nowtime<this.data.lyricArr[i+1].time){
  //             this.setData({
  //               lyricIndex:i
  //             })
  //             return
  //           }
  //         }
  //       }
  //     }

  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.timeLycri()
    // 当音频播放进度更新时，会自动执行回调函数里的代码，我们可以在这里拿到当前播放的时间currenttime
    IAC.onTimeUpdate(() => {
      // console.log('进度更新了')
      // console.log(IAC.currentTime)//单位为s
      this.setData({
        currentTime: IAC.currentTime
      })
      // hh：mm：ss
      let nowtime = formatTime(IAC.currentTime)
      // console.log(nowtime)
      // 根据lyricIndex计算出向上滚出去的距离
      if(this.data.lyricIndex>5){
        this.setData({
          scrolltop:(this.data.lyricIndex-5)*40
        })
        // this.data.scrollHeight = 
      }
      let length = this.data.lyricArr.length
      // 文稿对应行颜色改变
      if (this.data.lyricIndex !== this.data.lyricArr.length - 1) {
        // 遍历歌词 判断当前在哪句歌词
        var i = 0
        for(i=0;i<this.data.lyricArr.length;i++){
          if(this.data.lyricIndex === this.data.lyricArr.length-2){
            //如果是最后一句歌词只能和最后一句歌词的时间比较
            if(nowtime>this.data.lyricArr[length-1].time){
              this.setData({
                lyricIndex:length-1
              })
              return
            }
          }else{
            //不是最后一句则和前一句和后一句比较
            if(nowtime>this.data.lyricArr[i].time&&nowtime<this.data.lyricArr[i+1].time){
              this.setData({
                lyricIndex:i
              })
              return
            }
          }
        }
      }

    })
  
    // this.playList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 获取音乐url的方法
  getSongUrl() {
    let that = this
    if (!this.data.songid) {
      return
    }
    wx.request({
      url: 'http://localhost:3000/song/url',
      data: {
        id: this.data.songid
      },
      success(res) {
        console.log(res)
        console.log(res.data.data[0].url)
        IAC.src = res.data.data[0].url
        // 播放音乐
        that.songPlay()
      }
    })
  },

  // 播放的方法
  songPlay() {
    // 让音频播放
    if (this.data.songid) {
      IAC.play()
      // 切换播放icon
      this.setData({
        isplay: true
      })
    } else {
      wx.showToast({
        title: '暂无音乐可播放',
        icon: 'none'
      })
    }

  },

  // 暂停的方法
  songPause() {
    IAC.pause()
    this.setData({
      isplay: false
    })
  },

  // 获取歌曲的详情
  getSongDetail() {
    if (!this.data.songid) {
      return
    }
    wx.request({
      url: 'http://localhost:3000/song/detail',
      data: {
        ids: this.data.songid
      },
      success: (res) => {
        console.log(res.data.songs[0])
        this.setData({
          songDetail: res.data.songs[0],
          allTime: res.data.songs[0].dt * 0.001
        })
      }
    })
  },

  // 获取歌词的方法
  getLyric() {
    if (!this.data.songid) {
      return
    }
    wx.request({
      url: 'http://localhost:3000/lyric',
      data: {
        id: this.data.songid
      },
      // 'qqqq,wwww,ssss'.split(',')
      success: (res) => {
        console.log(res.data.lrc.lyric)
        let lyricArr =  this.handleLyric(res.data.lrc.lyric)
        this.setData({
          lyricArr
        })
      }
    })
  },

  // 处理歌词的方法
  handleLyric(text) {
    // text 表示传入的需要处理的歌词
    let arr = text.split('\n')
    console.log(arr)
    // 把数组的每一项进行处理：由字符串变成对象{time:"00:00:00.12",text:"我有一只小毛驴"},然后放进新的数组里
    let lyricArr = []
    for (var i = 0; i < arr.length; i++) {
      // ]
      let obj = {}
      if (arr[i]) {
        // 拿到每一句歌词的文本部分，并且把它添加进对象里（text）
        console.log(arr[i].split(']')[1])
        obj.text = arr[i].split(']')[1]
        // arr[i].split(']')[0] 时间【
        // arr[i].split(']')[0].split('[')[1]
        // hh:mm:ss
        obj.time = '00:'+ arr[i].split(']')[0].split('[')[1]
        lyricArr.push(obj)
      }
    }
    // console.log(lyricArr)
    return lyricArr
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 拿到全局变量里的songid
    let songid = APP.globalData.songid
    console.log(songid)
    if (songid !== this.data.songid) {
      this.setData({
        songid
      })
      // 调用方法，拿到url
      this.getSongUrl()
      // 拿到歌曲详情
      this.getSongDetail()
      // 拿到歌词
      this.getLyric()
      // this.timeLycri()
          IAC.onEnded(() => {
              //播放下一首  
              this.playNext
            })
    }
   
    setTimeout(() => {
      console.log(IAC.paused)
    }, 1000)


  },
  playButton(){
    this.setData({
      songList:APP.globalData.songList,
      songid: APP.globalData.songid
      // currentIndex:0
    })
    console.log(this.data.songList)
    console.log(this.data.songList[0])
    //找到歌曲的id，然后找到其所在的位置
    
    for(var i=0;i<this.data.songList.length;i++){
      // console.log(this.data.songList.length)
      console.log(this.data.songList)
      if(this.data.songid===this.data.songList[i].id){
        this.data.currentIndex=i
        console.log(this.data.currentIndex)
        break
      }
     
  }
},
  playUP(){
    this.playButton()
    let a =this.data.currentIndex
    if(a!==0){
      a--
    }else{
      a=this.data.songList.length-1
      console.log(this.data.currentIndex)
    }
    this.setData({
      songid:this.data.songList[a].id,
      
    })
    APP.globalData.songid=this.data.songid
        // 调用方法，拿到url
        this.getSongUrl()
        // 拿到歌曲详情
        this.getSongDetail()
        // 拿到歌词
        this.getLyric()
        setTimeout(() => {
          console.log(IAC.paused)
          
        }, 500)
 },
  // 拖动滑块后触发这个函数

 playNext(){
    this.playButton()
   let a =this.data.currentIndex
    if(a!==this.data.songList.length-1){
      a++
    }else{
      a=0
      console.log(this.data.currentIndex)
    }
    this.setData({
      songid:this.data.songList[a].id,
      
    })
    APP.globalData.songid=this.data.songid
        // 调用方法，拿到url
        this.getSongUrl()
        // 拿到歌曲详情
        this.getSongDetail()
        // 拿到歌词
        this.getLyric()
        setTimeout(() => {
          console.log(IAC.paused)
          
        }, 500)
 },
  // 拖动滑块后触发这个函数
  change(e) {
    // 拿到滑块所处位置对应的值
    console.log(e.detail.value)
    // 音频从这个值（时间）继续播放
    IAC.seek(e.detail.value)
    this.setData({
      currentTime: e.detail.value
    })
    // 为了能正常监听到音频进度更新
    setTimeout(() => {
      console.log(IAC.paused)
      
    }, 500)
  },
 
  // changing(){
  //   IAC.stop()
  // },

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