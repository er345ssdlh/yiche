const md5 = require('./MD5.js')
import {
  reqFun,
  getLoginUserInfo
} from "./util.js";
const apiConfig = require("../apiConfig/apiConfig.js");

//接口参数 app_key、secret、timestamp
let params = {
  app_key: 100091,
  secret: 'b7f05ab4d7324cbb8790866eff48548b',
  timestamp: Number(Date.parse(new Date()).toString().substr(0, 10))
}

let globalData = {
  unionId: '',
  openid: '',
  session_key: '',
  uid: '',
  ticket: '',
  avatarDefault: "http://image.bitautoimg.com/appimage/ui/web/images/webchat_user_default.png",
}

function userAuth(detail, callback) {
  //每次调用时重置timestamp
  params.timestamp = Number(Date.parse(new Date()).toString().substr(0, 10))
  //将用户信息存入本地缓存
  var userInfoObj = {};
  userInfoObj.avatarUrl = detail.detail.userInfo && detail.detail.userInfo.avatarUrl || globalData.avatarDefault;
  userInfoObj.nickName = detail.detail.userInfo.nickName;
  wx.setStorageSync('userInfo', userInfoObj);

  let user = wx.getStorageSync('user') || {};
  if (!user.openid) {
    //获取登录凭证code
    wx.login({
      success(res) {
        if (res && res.code) {
          var code = res.code;
          // console.log("codecodecodecodecodecode-----",code)
          //console.log(code, encryptedData, iv)
          //获取加密数据和加密算法初始向量
          handleParams(code, detail.detail.encryptedData, detail.detail.iv, callback);
        } else {
          console.log('获取code失败')
        }
      }
    })
  } else { //已登录
    if (typeof callback == 'function') {
      callback()
    }
  }
}

/**
 *
 * 授权登录
 * @param {Object} detail 授权的加密数据
 * @param {Function} callback 成功回调方法
 */
function userAuthWithEncryData(detail, callback) {
  //将用户信息存入本地缓存
  var userInfoObj = {};
  userInfoObj.avatarUrl = detail.detail.userInfo.avatarUrl;
  userInfoObj.nickName = detail.detail.userInfo.nickName;
  wx.setStorageSync('userInfo', userInfoObj);

  wx.login({
    success(res) {
      if (res && res.code) {
        let code = res.code;
        reqFun({
          url: apiConfig.encrypt_login,
          data: {
            code: code,
            u_encryData: encodeURIComponent(detail.detail.encryptedData),
            u_iv: encodeURIComponent(detail.detail.iv)
          },
          success: (res) => {
            console.log(res)
            let serverData = res.data
            if (serverData.data && serverData.data.issuccess) {
              //将uid存入本地缓存
              var userIdObj = {};
              userIdObj.uid = serverData.data.uid;
              userIdObj.ticket = serverData.data.ticket;
              wx.setStorageSync('userId', userIdObj);

              if (typeof callback == 'function') {
                callback(userIdObj) //返回登录信息
              }
            }
          }
        })
      } else {
        console.log(`login failed!`)
      }
    }
  })
}

/**
 *
 * 手机号授权登录
 * @param {Object} detail 授权的加密数据
 * @param {Function} callback 成功回调方法
 */
function userAuthWithMobileEncryData(detail, callback) {
  wx.login({
    success(res) {
      if (res && res.code) {
        let code = res.code;
        reqFun({
          url: apiConfig.encrypt_login,
          data: {
            code: code,
            m_encryData: encodeURIComponent(detail.detail.encryptedData),
            m_iv: encodeURIComponent(detail.detail.iv)
          },
          success: (jsonData) => {
            let serverData = jsonData.data
            if (serverData && serverData.issuccess) {
              if (serverData.uid != getLoginUserInfo().uid) { //切换账号时提示
                wx.showToast({
                  title: '检测到您的手机号绑定过其他易车网账号！已为您更换登录：' + serverData.showName,
                  icon: 'none',
                  duration: 2000
                })
              }

              //将uid存入本地缓存
              var userIdObj = {};
              userIdObj.uid = serverData.uid;
              userIdObj.ticket = serverData.ticket;
              userIdObj.mobile = serverData.mobile
              wx.setStorageSync('userId', userIdObj);

              //更新用户头像信息
              getUserInfoAsync((userInfo) => {
                var userInfoObj = {};
                userInfoObj.avatarUrl = userInfo.userAvatar.indexOf('http') > 0 ? userInfo.userAvatar : 'http:' + userInfo.userAvatar;
                userInfoObj.nickName = userInfo.showName;
                userInfoObj.mobile = userInfo.mobile;
                wx.setStorageSync('userInfo', userInfoObj);

                if (typeof callback == 'function') {
                  callback(userIdObj) //返回登录信息
                }
              })
            }
          }
        })
      } else {
        console.log(`login failed!`)
      }
    }
  })
}



function handleParams(code, encryptedData, iv, callback) {

  let sign = params.secret +
    'app_key' + params.app_key +
    'code' + code +
    'encryptedData' + encryptedData +
    'iv' + iv +
    'timestamp' + params.timestamp +
    params.secret;
  sign = md5.hexMD5(sign).toUpperCase();

  let getOpenIdParams = {
    app_key: params.app_key,
    timestamp: params.timestamp,
    code: code,
    sign: sign,
    encryptedData: encodeURIComponent(encryptedData),
    iv: encodeURIComponent(iv)
  };
  getOpenId(getOpenIdParams, callback);
}

//请求openid unionid接口
function getOpenId(getOpenIdParams, callback) {
  console.log(getOpenIdParams);

  reqFun({
    url: apiConfig.get_auth_code,
    data: getOpenIdParams,

    success(jsonData) {
      console.log(jsonData.data,1111)
      var res = jsonData.data;
      // 没有这些请求失败1111111111111111111111111111111111111111111111111111111
      if (res && res.openid && res.session_key && res.unionid) {
        globalData.openid = res.openid;
        globalData.session_key = res.session_key;
        globalData.unionid = res.unionid;
        var userObj = {};
        userObj.openid = res.openid;
        userObj.unionid = res.unionid;
        userObj.session_key = res.session_key;

        //存储openid unionid session_key
        wx.setStorageSync('user', userObj);
        //请求登录接口
        requestLogin(callback);
      } else {
        console.log('请求失败')
      }
    },
    fail(res) {
      console.log(res)
    }
  })
}
//请求登录接口
function requestLogin(callback) {
  //login接口参数sign
  let sign = params.secret +
    'app_key' + params.app_key +
    'authen_code' + globalData.unionid +
    'timestamp' + params.timestamp +
    params.secret;
  sign = md5.hexMD5(sign).toUpperCase();


  //登录接口请求
  reqFun({
    url: apiConfig.login,
    data: {
      app_key: params.app_key,
      sign: sign,
      timestamp: params.timestamp,
      authen_code: globalData.unionid
    },
    success(jsonData) {
      var res = jsonData.data;

      if (res && res.issuccess && res.uid && res.ticket) {
        globalData.uid = res.uid;
        globalData.ticket = res.ticket;
        //将uid存入本地缓存
        var userIdObj = {};
        userIdObj.uid = res.uid;
        userIdObj.ticket = res.ticket;
        userIdObj.createTicketTime = new Date().getTime();//生成ticket的时间
        wx.setStorageSync('userId', userIdObj);

        //登陆成功回调
        if (typeof callback == 'function') {
          callback()
        }

      } else {
        console.log("请求登录接口失败")
      }
    },
    fail(res) {
      console.log(res)
    }
  })
}

/**
 *
 * 判断用户是否登录
 */
function isUserLogin() {
  let user = wx.getStorageSync('user')
  let userId = wx.getStorageSync('userId')
  if (user && userId) { //用户已登录
    return true
  } else {
    return false
  }
}

/**
 *
 * 获取时间戳
 */
function getTimestamp() {
  return Number(Date.parse(new Date()).toString().substr(0, 10))
}

/**
 *
 * 产生授权签名
 */
function getAuthSign(signParams) {
  let sign = ''
  if (!signParams) return sign

  if (!signParams.app_key) {
    signParams.app_key = params.app_key
  }

  let keys = Object.keys(signParams).sort()
  sign = sign + params.secret
  for (let key of keys) {
    let value = signParams[key]
    sign = sign + key + value
  }
  sign = sign + params.secret
  sign = md5.hexMD5(sign).toUpperCase();
  return sign
}

/**
 *
 * 获取用户信息
 */
function getUserInfoAsync(success) {
  let userInfo = {}
  if (!isUserLogin()) {
    if (typeof success == 'function') {
      success(userInfo)
    }
    return
  }

  let loginUserInfo = getLoginUserInfo()
  reqFun({
    url: apiConfig.get_user_info,
    data: {
      "Login-Ticket": loginUserInfo.ticket
    },
    success: (jsonData) => {
      console.log(jsonData)
      if (typeof success == 'function') {
        if (jsonData && jsonData.data) {
          success(jsonData.data)
        } else {
          success(userInfo)
        }
      }
    },
    fail: (err) => {
      console.log(err)
    }
  })
}

/**
 *
 * 带登录信息的Http请求
 * @param {String} url 请求的url
 * @param {String} httpMethod 请求类型'GET' 'POST'
 * @param {Function} successCallBack 成功回调函数
 * @param {Function} errorCallBack 失败回调函数
 * @param {Object} data 请求数据
 */
function requestDataWithLoginTicket(parmas) {
  console.log(parmas)
  if (!isUserLogin()) {
    console.log(`请求url=${parmas.url}失败，用户未登录`)
    return
  }
  console.log(parmas.url)
  let loginUserInfo = getLoginUserInfo();
  reqFun({
    url: parmas.url,
    data: Object.assign({}, {
      "Login-Ticket": (loginUserInfo.ticket + '; ' + 'ycappapi=' + loginUserInfo.ticket)
    }, parmas.data),

    success: (res) => {
      parmas.success && parmas.success(res);
    },
    fail: (err) => {
      parmas.fail && parmas.fail(res);
      console.log(err)
    }
  })
}

//用户手机号授权
function userMobileAuth(iv, encryptedData, callback) {
  wx.login({
    success: (res) => {
      if (res.code) {
        getUserWebChatMobile(res.code, iv, encryptedData, callback)
      }
    }
  })
}
function getUserWebChatMobile(code, iv, encryptedData, callback) {
  reqFun({
    url: apiConfig.decrypt_mobile,
    data: {
      code: encodeURIComponent(code),
      m_encryData: encodeURIComponent(encryptedData),
      m_iv: encodeURIComponent(iv)
    },
    success: jsonData => {
      console.log(jsonData)
      if (jsonData.data && jsonData.data.mobile) {
        wx.setStorageSync('wxAuthMobile', jsonData.data.mobile)
        callback && callback(jsonData.data.mobile)
      } else {
        wx.showToast({
          title: '获取手机号失败',
          icon: 'none',
          duration: 1000
        })
      }
    }
  })
}
module.exports = {
  userAuth: userAuth,
  isUserLogin: isUserLogin,
  getTimestamp: getTimestamp,
  getAuthSign: getAuthSign,
  appKey: params.app_key,
  getUserInfoAsync: getUserInfoAsync,
  requestDataWithLoginTicket: requestDataWithLoginTicket,
  userAuthWithMobileEncryData: userAuthWithMobileEncryData,
  userAuthWithEncryData: userAuthWithEncryData,
  getLoginUserInfo: getLoginUserInfo,
  userMobileAuth: userMobileAuth,

}
