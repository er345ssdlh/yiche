const auth = require('../../utils/userAuth.js')
const messageUtil = require('../../utils/message.js')
const md5 = require('../../utils/MD5.js')
const apiConfig = require("../../apiConfig/apiConfig.js");
var amapFile = require('../../libs/amap-wx.js');
var markersData = {
  latitude: '',//纬度
  longitude: '',//经度
  key: "28b6fd1c95cf7fe579d350c320efdb43"//申请的高德地图key
};
import {
  reqFun,
  getLoginUserInfo,
} from "../../utils/util.js";
const app = getApp();
Page({
  data: {
    userLogin:false,
    nickName:"",
    avatarUrl:"",
    openid:"",
    // encryptedData:"",
    // iv:""
  },
  onLoad: function (options) {
    var that=this;
    // 获取经纬度
    wx.getLocation({
      type: "gcj02",
      success: function (w) {
        var latitude = w.latitude //维度
        var longitude = w.longitude //经度
        that.loadCity(latitude, longitude)
      }
    })
    // -------------------------------------------校验登陆态 session_key是否已经过期
    // wx.checkSession({
    //   success:function(e){
    //     // 存在登录态
    //   },
    //   fail:function(w){
    //     // 不存在登录态 重新登录
    //   }
    // })
    // 获取用户的授权情况
    wx.getSetting({
      success:function(w){
        console.log(w) // 是否
        // 获取用户最新的信息 如果没有授权就点击按钮授权
        wx.getUserInfo({
          success:function(q){
            console.log(q) 
            that.setData({
              userLogin: true,
              nickName:q.userInfo.nickName,
              avatarUrl:q.userInfo.avatarUrl
            })
          },
          fail: function (w) {
            console.log(w) //没有授权就获取不了
          }
        })
      }
    })
  },
  aaa: function () {
    wx.navigateTo({
      url:'../canvas/canvas'
    })
  },
  aaab: function () {
    wx.navigateTo({
      url:'../video/video'
    })
  },
  aaac: function () {
    wx.navigateTo({
      url:'../wecatApi/wecatApi'
    })
  },
  aaad: function () {
    wx.navigateTo({
      url:'../wecatApi2.0/wecatApi'
    })
  },
  aaabs: function () {
    wx.navigateTo({
      url:'../number/number'
    })
  },
  aaalog:function(){
    wx.navigateTo({
      url: '../dalog/dalog'
    })
  },
  loadCity: function (latitude, longitude) {
    markersData.latitude = latitude
    markersData.longitude = longitude
    // console.log(markersData.key)
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: markersData.key
    })
    myAmapFun.getRegeo({ //位置信息
      location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
      success: function (data) {
        console.log(data)
        that.setData({
          wz: data
        })
      },
      fail: function (info) {
        console.log(info)
      }
    })
    myAmapFun.getWeather({ // 天气信息
      success: function (data) {
        that.setData({
          weather: data
        })
        console.log(data);
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
  //获取用户信息
  // getUserInfo(typeRZ) {
  //   console.log(typeRZ)
  // },
  //2 是否用户点击了授权  或者拒绝
  userInfoHandler(detail) {
    if (detail.detail.userInfo){
      // 3 如果点击授权就调用wx.login方法
      var that = this
      that.setData({
        nickName: detail.detail.userInfo.nickName,
        avatarUrl: detail.detail.userInfo.avatarUrl,
        encryptedData: detail.detail.encryptedData,
        iv: detail.detail.iv
      })
      var userObj = {};
      userObj.avatarUrl = detail.detail.userInfo && detail.detail.userInfo.avatarUrl;
      userObj.nickName = detail.detail.userInfo && detail.detail.userInfo.nickName;
      userObj.encryptedData = detail.detail.encryptedData;
      userObj.iv = detail.detail.iv;
      // 把这些基本信息存储到本地------------------------------------------------------------
      wx.setStorage({
        key: 'user',
        data: userObj 
      })
      // 获取本地存储
      // wx.getStorage({
      //   key: 'user',
      //   success: function (res) {
      //     console.log(res)
      //   }
      // })
      var user = wx.getStorageSync('user') || {};
      // console.log(user)
      if(!user.openid){ //4---如果没有openid
        wx.login({
          success: function (e) {
            // 4-1 先获取到了code
            if (e.code) {
              // 4-2再发送后台请求
              // 这些参数我也不知道是什么鬼？
              var obj = {
                app_key: 100091,
                secret: 'b7f05ab4d7324cbb8790866eff48548b',
                timestamp: Number(Date.parse(new Date()).toString().substr(0, 10))
              }
              // 接口文档上说
              var str = obj.secret + 
                'app_key' + obj.app_key +
                'code' + e.code +
                'encryptedData' + user.encryptedData +
                'iv' + user.iv +
                'timestamp' + obj.timestamp +
                obj.secret;
              str = md5.hexMD5(str).toUpperCase();

              console.log(str) //加密好了 然后传给paramete.sign

              var parameter = {
                app_key: obj.app_key,
                timestamp: obj.timestamp,
                code: e.code,
                sign: str,
                encryptedData: encodeURIComponent(user.encryptedData), //把字符串编码为 URI 组件。
                iv: encodeURIComponent(user.iv) //把字符串编码为 URI 组件。
              }
              // 开始请求接口获取openID
              reqFun({
                url: apiConfig.get_auth_code, //微信解密用户基本信息授权数据
                // url: 'http://172.20.4.14:8769/wx_carmodel/api/v1/user/get_auth_code', //微信解密用户基本信息授权数据
                data: parameter,
                success:function(w){
                  //卡死到这了 返回数据{errcode: 40029, errmsg: "invalid code, hints: [ req_id: yEEeIfyFe-1iWhSa ]"} 通了  因为使用了自己的APPID
                  // 所以没有权限
                  if (w.data && w.data.openid && w.data.session_key && w.data.unionid){
                    console.log(w)
                    // 如果拿到了openID就可以存储起来了 开始发送登录请求
                    var userObjTwo = {};
                    userObjTwo.openid = w.data.openid;
                    userObjTwo.unionid = w.data.unionid;
                    userObjTwo.session_key = w.data.session_key;
                    wx.setStorage({
                      key: 'userBig',
                      data: userObjTwo
                    })
                    var user = wx.getStorageSync('userBig') || {};
                    console.log(user)
                    // 先拿到login所需参数sign 看文档上
                    var par = obj.secret + 
                    'app_key' + obj.app_key +
                    'authen_code' + user.unionid +
                    'timestamp' + obj.timestamp +
                    obj.secret;
                    par = md5.hexMD5(par).toUpperCase();
                    reqFun({
                      url: apiConfig.login, //登录接口
                      data:{
                        app_key:obj.app_key,
                        sign:par,
                        timestamp:obj.timestamp,
                        authen_code: user.unionid
                      },
                      success:function(w){
                        // 至此登录成功
                        console.log(w)
                        if (w.data && w.data.showName && w.data.ticket && w.data.uid){
                          wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 2000
                          })
                          var userbigbig = {};
                          userbigbig.showName = w.data.showName
                          userbigbig.ticket = w.data.ticket
                          userbigbig.uid = w.data.uid
                          wx.setStorage({
                            key: 'userBigBig',
                            data: userbigbig
                          })
                          that.setData({
                            userLogin:true
                          })
                        }
                      }
                    })
                  }
                }
              })
            } else {
              console.log('code获取失败！' + res.errMsg)
            }
          }
        })
      }
    }
  },
})