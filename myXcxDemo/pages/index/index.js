//index.js
import {
  reqFun
} from '../../utils/util.js'
const apiConfig = require("../../apiConfig/apiConfig.js");
//获取应用实例
const app = getApp()
Page({
  data: {
    status: 0,
    // 推荐列表数组
    itemList:[],
    height:"",
    currentPage:1,
    userInfo:null
  },
  // 页面加载周期函数
  onLoad(w){
    var that = this;
    // scrool-view必须要设置高度 才能到底部触发 下面是我们获取高度的表达式
    var scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: scrollHeight
    });
    reqFun({
      url: apiConfig.newsList,
      data: {
          "currentPage": that.data.currentPage,
          "pageSize": "10"
      },
      success: function (e) {
        // 推荐接口调用成功复制给itemList
        that.setData({
          itemList: e.data
        })
        wx.showToast()
      }
    })
  },
  // 点击事件
  changeStatus:function (e) {
    var that = this;
    // 将id作为状态区分的标记--e.currentTarget是事件函数固有的，里面包含自带和通过data-设置的内容
    var status = e.currentTarget.id;
    that.data.status = status
    // 只有将改变 需要在页面同步变化的属性写在 that.setData 页面才会有同步渲染的效果
    that.setData({
      status: status
    });
    if (that.data.status == 0&&that.data.status==[]){
      reqFun({
        url: apiConfig.newsList,
        data: {
          "currentPage": that.data.currentPage,
          "pageSize": "10"
        },
        success: function (e) {
          // 推荐接口调用成功复制给itemList
          that.setData({
            itemList: e.data
          })
          wx.showToast()
        }
      })
    }
  },
  // 页面跳转
  pageDetail:function(even){
    // 如果是视频
    // 固定语法获取组件内data-的值记住
    var vid = even.currentTarget.dataset.item.url
    var tit = even.currentTarget.dataset.item.title
    var user = even.currentTarget.dataset.item.showName
    var time = even.currentTarget.dataset.item.publishTime
    var newsId = even.currentTarget.dataset.item.newsId
    var cover = even.currentTarget.dataset.item.cover
    var imageUrl = even.currentTarget.dataset.item.imageUrl
    var type = even.currentTarget.dataset.item.type
    // 判断是新闻还是视频
    var myurl = even.currentTarget.dataset.item.type
    if(myurl===1){//新闻
      wx.navigateTo({
        url: `../news/news?cover=${cover[0]}&tit=${tit}&user=${user}&time=${time}&newsId=${newsId}&type=${type}`
      })
    }else{//视频
      wx.navigateTo({
        url: `../detail/detail?vid=${vid}&tit=${tit}&user=${user}&time=${time}&newsId=${newsId}&imageUrl=${imageUrl}&type=${type}`
      })
    }
  },
  // 页面滚动监听
  // onPageScroll: function (e) {
  //   console.log(e);//{scrollTop:99}
  // },
  lower:function(){
    var that=this;
    that.setData({
      currentPage:this.data.currentPage+1,
    });
    // 滚动加载更多
    reqFun({
      url: apiConfig.newsList,
      data: {
        "currentPage": that.data.currentPage,
        "pageSize": "10"
      },
      success: function (e) {
        // 推荐接口调用成功复制给itemList
        var itemLists = that.data.itemList
        itemLists.push(...e.data)
        that.setData({
          itemList:itemLists
        })
      }
    })
  }
})
