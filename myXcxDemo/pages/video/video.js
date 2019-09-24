Page({

  /**
   * 页面的初始数据
   */
  data: {
    cameraHeight: '',
    cameraWidth: '',
    image1Src: '',
    videoSrc: '',
    num: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用设置相机大小的方法
    this.setCameraSize();
    this.ctx = wx.createCameraContext();
    // console.log(this)
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

  },
  onPageScroll: function () {
    // 页面滚动时执行
  },
  onResize: function () {
    // 页面尺寸变化时执行
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
  },
  /**
   * 获取系统信息 设置相机的大小适应屏幕
   */
  setCameraSize() {
    //获取设备信息
    const res = wx.getSystemInfoSync();
    //获取屏幕的可使用宽高，设置给相机
    this.setData({
      cameraHeight: res.windowHeight,
      cameraWidth: res.windowWidth
    })
    console.log(res)
  },

  /**
   *拍照的方法 
   */
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          image1Src: res.tempImagePath
        })
      },
      fail() {
        //拍照失败
        console.log("拍照失败");
      }
    })
  },

  /**
   * 开始录像的方法
   */
  startShootVideo() {

    console.log("========= 调用开始录像 ===========")
    this.ctx.startRecord({
      success: (res) => {
        wx.showLoading({
          title: '正在录像',
        })
      },
      fail() {
        console.log("========= 调用开始录像失败 ===========")
      }
    })
  },

  /**
   * 结束录像
   */
  stopShootVideo() {

    console.log("========= 调用结束录像 ===========")
    this.ctx.stopRecord({
      success: (res) => {
        wx.hideLoading();
        this.setData({
          videoSrc: res.tempVideoPath,
        })
      },
      fail() {
        wx.hideLoading();
        console.log("========= 调用结束录像失败 ===========")
      }
    })
  },

  //touch start 手指触摸开始
  handleTouchStart: function (e) {
    this.startTime = e.timeStamp;
    console.log(" startTime = " + e.timeStamp);
    console.log(" 手指触摸开始 ", e);
    console.log(" this ", this);
  },

  //touch end 手指触摸结束
  handleTouchEnd: function (e) {
    this.endTime = e.timeStamp;
    console.log(" endTime = " + e.timeStamp);
    console.log(" 手指触摸结束 ", e);
    //判断是点击还是长按 点击不做任何事件，长按 触发结束录像
    if (this.endTime - this.startTime > 350) {
      //长按操作 调用结束录像方法
      this.stopShootVideo();
    }

  },

  /**
   * 点击按钮 - 拍照
   */
  handleClick: function (e) {
    console.log("endTime - startTime = " + (this.endTime - this.startTime));
    if (this.endTime - this.startTime < 350) {
      console.log("点击");
      //调用拍照方法
      this.takePhoto();
    }
  },

  /**
   * 长按按钮 - 录像
   */
  handleLongPress: function (e) {
    console.log("endTime - startTime = " + (this.endTime - this.startTime));
    console.log("长按");
    // 长按方法触发，调用开始录像方法
    this.startShootVideo();
  },

})