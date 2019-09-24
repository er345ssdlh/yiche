// pages/wecatApi/wecatApi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cameraHeight:'',
    cameraWidth:'',
    // 控制屏幕到哪个位置 初始和cameraHeight值一样
    jumpcameraHeight:'',
    animationMiddleHeaderItem:"",
    animationMiddle:'',
    mileage: [
      { s: 0 },
      { s: 100, tit:''},
      { s: 200, tit: '100代金券'},
      { s: 300, tit: ''},
      { s: 400, tit: ''},
      { s: 500, tit: '恭喜保温杯' },
      { s: 600, tit: ''},
      { s: 700, tit: ''},
      { s: 800, tit: ''},
      { s: 900, tit: '100加油卡代金券'},
      { s: 1000, tit: '如意湖一日游门票' },
      { s: 1100, tit: ''},
      { s: 1200, tit: '' },
      { s: 1300, tit: '免费体检一次'},
      { s: 1400, tit: ''},
      { s: 1500, tit: '' },
      { s: 1600, tit: ''},
      { s: 1700, tit: '200元加油卡'},
      { s: 1800, tit: ''},
      { s: 1900, tit: ''},
      { s: 2100, tit: '你太棒了'},
      { s: 2200, tit: ''},
      { s: 2300, tit: ''},
      { s: 2400, tit: '奖励一个飞机'},
      { s: 2500, tit: ''},
      { s: 2600, tit: ''},
    ],
    jump:0,
    // rpx和px的比例
    x:null,
    // 距离底部多远
    bottomX:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 如果之前有保存的步数就从之前的步数开始
    wx.getStorageSync('jump')?that.setData({
      jump: wx.getStorageSync('jump')
    }):null
    that.setData({
      bottomX: wx.getStorageSync('bottomX')
    })
   var res = wx.getSystemInfoSync()
   console.log(res) //获取设备宽高 设置背景图
    // 先计算rpx和px的比例
    that.setData({
      x: 750/res.windowWidth,
      cameraHeight: res.windowHeight,
      cameraWidth: res.windowWidth,
      jumpcameraHeight: res.windowHeight + 2000
    })
    // 提示并且滑到底部
    wx.showModal({
      title: wx.getStorageSync('jump')?'欢迎回来':'欢迎来到汽车人生',
      content: wx.getStorageSync('jump')?'继续你的汽车之旅吧！':'点击确定开始游戏',
      showCancel:false,
      success: function (res) {
        // 初始化滑动到s背景图总长-跳的距离
        wx.pageScrollTo({ 
          // 初始化到小汽车的位置
          // scrollTop: that.data.jumpcameraHeight - that.data.cameraHeight,
          scrollTop: that.data.jumpcameraHeight - wx.getStorageSync('bottomX') - that.data.cameraHeight || that.data.jumpcameraHeight - that.data.cameraHeight,
          duration: 2000
        })
      }
    })
    that.dh();
  },
  // 心脏跳动动画
  dh:function(){
    var circleCount = 0;
    this.animationMiddleHeaderItem = wx.createAnimation({
      duration: 1000,    // 以毫秒为单位  
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: '50% 50%',
      success: function (res) {
      }
    });
    setInterval(function () {
      if (circleCount % 2 == 0) {
        this.animationMiddleHeaderItem.scale(0.7).step();
      } else {
        this.animationMiddleHeaderItem.scale(0.8).step();
      }
      this.setData({
        animationMiddleHeaderItem: this.animationMiddleHeaderItem.export()  //输出动画
      });

      circleCount++;
      if (circleCount == 1000) {
        circleCount = 0;
      }
    }.bind(this), 1100);
  },
  jumps:function(){
    var that =this
    // 如果到底就结束
    console.log(that.data.jump)
    if (that.data.mileage[that.data.jump].s + 210 / that.data.x + 150 / that.data.x >= that.data.cameraHeight+2000) return wx.showToast({
      title: '恭喜你到达目的地',
    })
    // 往上跳
    that.setData({
      jump:that.data.jump+1
    })
    // 本地存储距离底部的距离，方便下次来的时候在原来的位置
    wx.setStorage({
      key: 'bottomX',
      data: that.data.mileage[that.data.jump].s + 150 / that.data.x
    })
    wx.setStorage({
      key: 'jump',
      data: that.data.jump
    })
    // 如果跳的距离跳出一个屏幕
    // 取余
    console.log(that.data.mileage[that.data.jump].s)
    var num = that.data.mileage[that.data.jump].s % (that.data.cameraHeight - 150 / that.data.x)
    // 取绝对值
    var jumpHeigh = Math.abs(num)
    console.log(jumpHeigh)
    // 如果跳的距离将要超出一个屏幕占得高
    // 跳跃高度+初始距离底部距离+自身高度
    if (jumpHeigh + 150 / that.data.x + 200 / that.data.x >= that.data.cameraHeight){
      console.log('该换屏幕拉')
      that.setData({
        // 设置位置为原来的高度-跳的高度-初始距离底部的距离（）
        jumpcameraHeight: that.data.jumpcameraHeight - jumpHeigh - 150 / that.data.x
      }, function () {
        console.log(that.data.jumpcameraHeight)
        wx.pageScrollTo({
          scrollTop: that.data.jumpcameraHeight - that.data.cameraHeight,
          duration: 2000
        })
      })
    }
    // 跳跃动画
    this.animationMiddle = wx.createAnimation({
      duration: 100,    // 以毫秒为单位  
      timingFunction: 'ease-in',
      transformOrigin: '50% 50%',
      success: function (res) {
        console.log(res)
      }
    });
    this.animationMiddle.bottom(that.data.mileage[that.data.jump].s + 70).step()
    this.animationMiddle.bottom(that.data.mileage[that.data.jump].s + 50).step()
    this.animationMiddle.bottom(that.data.mileage[that.data.jump].s + 120).step()
    this.animationMiddle.bottom(that.data.mileage[that.data.jump].s + 100).step()
    this.setData({
      animationMiddle: this.animationMiddle.export()  //输出动画
    });
    // 相应里程如果有奖励就显示奖励内容
    that.data.mileage[that.data.jump].tit !== '' ? wx.showToast({
      title: that.data.mileage[that.data.jump].tit,
    }) : null
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