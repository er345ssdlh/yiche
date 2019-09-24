// pages/carDetailsPage/carDetailsPage.js
import {
  reqFun
} from '../../utils/util.js'
const apiConfig = require("../../apiConfig/apiConfig.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 汽车详情
    carDetail:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 拿到serialId了，可以调用详情了
    // https://mapi.yiche.com/wx_carmodel/api/v1/carmodel/getinfos/v2
    // console.log(options.serialId)
    reqFun({
      url: apiConfig.carLogoListC,
      data: {
          "serialId": options.serialId,
          "cityId": "201"
      },
      success: function (e) {
        that.setData({
          carDetail: e.data
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