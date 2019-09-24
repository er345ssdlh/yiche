// pages/alphabetList/alphabetlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    src:''
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
  map:function(){
    var that =this
    wx.chooseLocation({
      success: function (w) {
        console.log(w)
        that.setData({
          name:w.name
        })
      }
    })
  },
  maps:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          success:function(w){
            console.log(w)
          }
        })
      }
    })
  },
  // 拍照
  takePhoto:function(w){
    console.log(w)
    wx.createCameraContext({
    }).takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })

  },
  // 录像
  takevideo:function(){
    wx.createCameraContext({}).startRecord({
      success:function(w){
        console.log(w)
      }
    })
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