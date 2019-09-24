import {
  reqFun
} from '../../utils/util.js'
const apiConfig = require("../../apiConfig/apiConfig.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 右侧导航
    newcarList:[],
    // 汽车列表数据
    carList:[],
    // 弹出层显示与隐藏
    hiSh: false,
    // tab栏切换
    status:0,
    height:"",
    // 汽车品牌ID
    masterId:null,
    // 汽车品牌的详细列表
    carDetailedList:[],
    ids:"",
    idss:"A",
    animationData:null,
    animationtest:null,
    scrollTop:null,
    resOnetop:null,
    masterIds:null,
    img:"",
    tops:[],
    windowHeight:null,
    ofTo:null, //开始位置巨山过的高度
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.showNavigationBarLoading()
    // 获取屏幕的高度
    // 滚动
    var scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: scrollHeight
    });
    // 汽车列表接口
    reqFun({
      url: apiConfig.carList,
      data: {
          "action": "master",
          "cityId": "201"
      },
      success: function (e) {
        var arr = [];
        for (var key in e.data.charList) {
          e.data.charList[key] !== 0 ? arr.push(key) : ''
        }
        that.setData({
          carList: e.data.msterList,
          newcarList: e.data.charList,
          arr: arr
        })
        var tops = []
        for (var key in that.data.newcarList) {
          if (that.data.newcarList[key]) {
            const query = wx.createSelectorQuery()
            query.select('#' + key).boundingClientRect()
            query.selectViewport().scrollOffset()
            query.exec(function (res) {
              //  console.log("id为：" + res[0].id, "居上：" + res[0].top, "高度："+res[0].height  )
              tops.push({ "id": res[0].id, "top": res[0].top, "h": res[0].height })
              that.setData({
                tops: tops
              })
            })
          }
        }
      }
    })
  },
  // 点击车型显示
  handleshow: function(e){
    var that=this;
    // 先显示弹出层
    that.setData({
      hiSh: !that.data.hiSh,
      masterId: e.currentTarget.dataset.value.masterId
    })
    // 再发送请求
    reqFun({
      url: apiConfig.carLogoList,
      method: "POST",
      data: {
          "masterId": that.data.masterId,
          "cityId": "201"
      },
      success: function (e) {
        // item.picture.replace("{0}", "asd"
        // 拿到品牌汽车详细分类了 分为在售和停售
        // 图片出来了
        var img = e.data[0].serialList[0].picture.replace("{0}", e.data[0].masterId)
        that.setData({
          carDetailedList: e.data,
          masterIds: e.data[0].masterId,
          img: img
        })
      }
    })
    // 再添加弹出动画效果
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      // 动画时长
      duration: 800,
      // 动画效果
      timingFunction: "ease",
      // 延迟
      delay: 0
    }).right(0).step()
    that.setData({
      animationData: animation.export()
    })
    // 再添加淡出动画效果
    var animation2 = wx.createAnimation({
      transformOrigin: "50% 50%",
      // 动画时长
      duration: 2000,
      // 动画效果
      timingFunction: "ease",
      // 延迟
      delay: 0
    }).opacity(1).step()
    that.setData({
      animationtest: animation2.export()
    })
  },
  // 点击关闭隐藏
  handleHidd:function(){
    var that=this;
    that.setData({
      hiSh:false
    })
    // 再添加弹出动画效果
    var animation = wx.createAnimation({
    }).right(-590).step()
    that.setData({
      animationData: animation.export()
    })
    // 再添加淡出动画效果
    var animation2 = wx.createAnimation({
    }).opacity(0).step()
    that.setData({
      animationtest: animation2.export()
    })
  },
  ld:function (w) {
    var that = this
    // 滚动的距离
    that.data.tops.forEach(function (key, value) {
      if (key.top < w.detail.scrollTop && w.detail.scrollTop < key.h + key.top) {
        that.setData({
          idss: key.id,
          ids:""
        })
      }
    })
  },
  // 弹出层TAb效果
  changeStatus:function(){
    var that=this;
    that.data.status===1?that.setData({status:0}):that.setData({status: 1})
  },
  handleCarDetailsPage:function(e){
    // 传一个seriaiId就可以啦
    wx.navigateTo({
      url: `../carDetailsPage/carDetailsPage?serialId=${e.currentTarget.dataset.serialid}`
    })
  },
  // 滑动选择栏儿效果
  handlerAlphaTap(e) {
    var that = this
    let { id } = e.target.dataset;
    that.setData({ ids: id,idss:id});
  },
  handlerMove(e) {
    var that = this
    let { carList } = that.data; //遍历的数据
    let moveY = e.touches[0].clientY; //移动位置居上的的距离
    let rY = moveY;
    if (rY < 0) return
      var num = Math.ceil(rY / 28)
      if (num > 21) return
      var aaa = that.data.arr[num - 1]
       //滑到哪哪就是哪里的数字 正好data数组arr里 减一对应的就是我们要的字母了
      aaa !== that.data.idss?that.setData({ids: aaa,idss: aaa,}):''
  }
})