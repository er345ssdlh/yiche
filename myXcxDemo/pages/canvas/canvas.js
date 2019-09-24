// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:'',
    height:'',
    text:'aaaaa'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var ctx = wx.createCanvasContext('qrCanvas')
    // ctx 就相当于一个笔
    var res = wx.getSystemInfoSync(); //获取设备信息
    var width = res.windowWidth
    var height = res.windowHeight
    that.setData({
      width : res.windowWidth,
      height : res.windowHeight
    })
          // 添加图
    var url = 'https://sum.kdcer.com/test/sw_shake/0/0 (1).jpg'
    ctx.drawImage(url, 0, 0, 100, 100) //画布上加图
        //添加颜色的盒子
    ctx.setFillStyle('white')//填充白色
    ctx.fillRect(10, 110, 20, 200)//坐标x:0,y:height-60 宽高
        // 添加文字
    ctx.setFillStyle('#5F6FEE')//文字颜色：默认黑色
    ctx.setFontSize(20)//设置字体大小，默认10
    ctx.fillText("LXT", 110, 110)//绘制文本

    ctx.save()//保存当前的绘图上下文。
    ctx.beginPath()//开始创建一个路径
    ctx.arc(50, 50, 50, 0, 2 * Math.PI, false)//画一个圆形裁剪区域
    ctx.clip()//裁剪
    ctx.drawImage(url,0 ,0, 100, 100)//绘制图片
    ctx.restore()//恢复之前保存的绘图上下文
        //调用draw()开始绘制
    ctx.draw()
  },
  copy:function(w){
    console.log(w.target.dataset.text)
    wx.setClipboardData({
      data: w.target.dataset.text,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
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