// pages/detail/detail.js
import {
  reqFun
} from '../../utils/util.js'
const apiConfig = require("../../apiConfig/apiConfig.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 视频详情
      vid:"",
      tit:"",
      user:"",
      time:"",
      newsId:"",
      imageUrl:"",
      type:null,
    // 评论列表
    speakText:[],
    speakTexts:"",
    height:"",
    currentPage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 设置评论高
    var scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: scrollHeight
    });
    var that=this;
    that.setData({
      vid: options.vid,
      tit: options.tit,
      user: options.user,
      time: options.time,
      newsId: options.newsId,
      imageUrl: options.imageUrl,
      type: options.type
    })
    // 视频详情接口不用调用
    // wx.request({
    //   url: 'https://mapi.yiche.com/wx_carmodel/api/v1/news/get_video_detail',
    //   method: "GET",
    //   data: {
    //     "cid": "300",
    //     "uid": "",
    //     "ver": "7.0.4",
    //     "param": {
    //       // 视频ID
    //       "videoId": "1",
    //       // 视频来源ID
    //       "sourceType": "10"
    //     }
    //   },
    //   success: function (e) {
    //     // 推荐接口调用成功复制给itemList
    //     // that.setData({
    //     // })
    //   }
    // })
    // 评论列表
    reqFun({
      url: apiConfig.newsSpeak,
      data: {
          // 当前页
          "currentPage": that.data.currentPage,
          // 每页数量
          "pageSize": 10,
          // 新闻ID
          "newsId": that.data.newsId,
          // 文章类型
        "type": that.data.type,
          // 是否热门
      },
      success: function (e) {
        // 评论列表
        that.setData({
          speakText: e.data!==null?e.data.list:[]
        })
        console.log(that.data.speakText,"评论内容")
      }
    })
  },
  // 输入事件
  expInput:function(e){
    this.setData({
      speakTexts: e.detail.value
    })
  },
  lower: function () {
    var that = this;
    that.setData({
      currentPage: that.data.currentPage+1
    });
    // 滚动加载更多
    reqFun({
      url: apiConfig.newsSpeak,
      data: {
        // 当前页
        "currentPage": that.data.currentPage,
        // 每页数量
        "pageSize": 10,
        // 新闻ID
        "newsId": that.data.newsId,
        // 文章类型
        "type": that.data.type,
        // 是否热门
      },
      success: function (e) {
        // 评论列表
        // 最新数据
        var speakTextss = that.data.speakText
        speakTextss.push(...e.data.list)
        that.setData({
          speakText: speakTextss
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