// pages/day/day.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:[11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11111],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('页面加载',options)
    // console.log(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (w) {
    console.log('页面初次渲染完成',w)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (w) {
    console.log('页面显示',w)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (w) {
    console.log('页面隐藏',w)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (w) {
    console.log('页面卸载',w)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (w) {
    console.log('下拉动作',w)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (w) {
    console.log('触底事件的处理函数',w)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (w) {
    console.log('点击右上角分享',w)
  },
  onPageScroll: function (w) {
    // 页面滚动时执行
    console.log('滚动时执行',w)
  },
  onResize: function (w) {
    // 页面尺寸变化时执行
    console.log('尺寸变化时执行',w)
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // 事件响应函数
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
})