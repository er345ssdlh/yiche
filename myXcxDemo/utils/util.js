const apiConfig = require("../apiConfig/apiConfig.js")

const md5 = require('./MD5.js')

var CryptoJS = require('aes.js'); //引用AES源码js

/**
 * 时间转换
 * @param time {Number} 1970年1月1日时间
 * return {Date} 
 */
function convertTime(time, format = 'yyyy-MM-dd HH:mm:ss') {
  //重新格式化字符串
  var t = new Date(time.replace(/-/g, "/"));
  var tf = function (i) { return (i < 10 ? '0' : '') + i };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}

function formatTime(date, spStr) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join(spStr ? spStr : '/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//比较时间大小
function comparesDate(d1, d2) {
  if (d1.getFullYear() > d2.getFullYear()) {
    return 1;
  } else if (d1.getFullYear() < d2.getFullYear()) {
    return -1;
  }

  if (d1.getMonth() > d2.getMonth()) {
    return 1;
  } else if (d1.getMonth() < d2.getMonth()) {
    return -1;
  }

  if (d1.getDate() > d2.getDate()) {
    return 1;
  } else if (d1.getDate() < d2.getDate()) {
    return -1;
  }

  if (d1.getHours() > d2.getHours()) {
    return 1;
  } else if (d1.getHours() < d2.getHours()) {
    return -1;
  }

  if (d1.getMinutes() > d2.getMinutes()) {
    return 1;
  } else if (d1.getMinutes() < d2.getMinutes()) {
    return -1;
  }

  if (d1.getSecond() > d2.getSecond()) {
    return 1;
  } else if (d1.getSecond() < d2.getSecond()) {
    return -1;
  }

  return 0;
}

//格式化时间（当前时间,格式化字符串）
function pattern(date, fmt) {
  fmt = fmt || "yyyy-MM-dd hh:mm:ss";
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/**
 * 判断目标是否是函数
 * @param {mixed} val
 * @returns {boolean}
 */
function isFunction(val) {
  return typeof val === 'function';
}

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
function requestData(url, successCallback, errorCallback, completeCallback) {
  var app = getApp();
  if (app.debug) {
    console.log('requestData url: ', url);
  }
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      if (app.debug) {
        console.log('response data: ', res);
      }
      isFunction(successCallback) && successCallback(res.data);

    },
    error: () => {
      isFunction(errorCallback) && errorCallback();
    },
    complete: () => {
      isFunction(completeCallback) && completeCallback();
    }
  });
}

/**
 *
 *
 * 显示 版本不支持一样提示
 */
function showNotSupportModal() {
  wx.showModal({
    title: '提示',
    content: '您的微信客户端版本过低，不支持该操作，请升级到最新微信版本。',
    success: (res) => { }
  });
}
/**
 * 返回首页功能
 */
function backToIndex() {
  wx.switchTab({
    url: '/pages/index/homePage/homePage'
  })
}
/*
 *返回顶部功能
 */
function backToTop() {
  wx.pageScrollTo({
    scrollTop: 0
  })
  this.setData({
    topNum: 0
  })
}


/**
 * 限频节流函数
 * @param fn
 * @param delay
 * @param ctx
 * @returns {Function}
 */
function throttle(fn, delay) {
  let isAvail = true
  let count = false
  let movement = null
  return function () {
    //此处this是调用次节流的page页面
    count = true
    let args = arguments
    if (isAvail) {
      fn.apply(this, args)
      isAvail = false
      count = false
      setTimeout(() => {
        isAvail = true
      }, delay)
    }
    //触发最后一次回调
    if (count) {
      clearTimeout(movement)
      movement = setTimeout(() => {
        fn.apply(this, args)
      }, 2 * delay)
    }
  }
}

//参数默认值控制（当前参数,默认值）
function extend(destination, source) {
  if (!destination) return source;
  for (let property in source) {
    if (!destination[property] && destination[property] != 0) {
      destination[property] = source[property];
    }
  }
  return destination;
}


/***
 * 按照显示图片的宽等比例缩放得到显示图片的高
 * @params originalWidth 原始图片的宽
 * @params originalHeight 原始图片的高
 * @params imageWidth  显示图片的宽，如果不传就使用屏幕的宽
 * 返回图片的宽高对象
 ***/
function imageZoomHeight(originalWidth, originalHeight, imageWidth) {
  let imageSize = {};
  if (imageWidth) {
    imageSize.imageWidth = imageWidth;
    imageSize.imageHeight = (imageWidth * originalHeight) / originalWidth;
  } else { //如果没有传imageWidth,使用屏幕的宽
    wx.getSystemInfo({
      success: function (res) {
        imageWidth = res.windowWidth;
        imageSize.imageWidth = imageWidth;
        imageSize.imageHeight = (imageWidth * originalHeight) / originalWidth;
      }
    });
  }
  return imageSize;
}

/***
 * 按照显示图片的高等比例缩放得到显示图片的宽
 * @params originalWidth 原始图片的宽
 * @params originalHeight 原始图片的高
 * @params imageHeight  显示图片的高，如果不传就使用屏幕的高
 * 返回图片的宽高对象
 ***/
function imageZoomWidth(originalWidth, originalHeight, imageHeight) {
  let imageSize = {};
  if (imageHeight) {
    imageSize.imageWidth = (imageHeight * originalWidth) / originalHeight;
    imageSize.imageHeight = imageHeight;
  } else { //如果没有传imageHeight,使用屏幕的高
    wx.getSystemInfo({
      success: function (res) {
        imageHeight = res.windowHeight;
        imageSize.imageWidth = (imageHeight * originalWidth) / originalHeight;
        imageSize.imageHeight = imageHeight;
      }
    });
  }
  return imageSize;
}

//截取文字(文字,最多字数,后缀字符)
function stringStr(str, n, suffix) {
  if (!str) return "";
  suffix = suffix || "";
  if (str.replace(/[\u4e00-\u9fa5]/g, "**").length <= n) {
    return str;
  } else {
    var len = 0;
    var tmpStr = "";
    for (let i = 0; i < str.length; i++) { //遍历字符串
      if (/[\u4e00-\u9fa5]/.test(str[i])) { //中文 长度为两字节
        len += 2;
      } else {
        len += 1;
      }
      if (len > n) {
        break;
      } else {
        tmpStr += str[i];
      }
    }
    return tmpStr + suffix;
  }
}

//分割获取参数(Url地址,键值)
function getParams(url, key, s) {
  s = s || '&';
  if (url.indexOf('?') != -1) {
    url = url.split('?')[1];
  }

  let rows = url.split(s);
  for (let n of rows) {
    if (n && n.indexOf('=') != -1) {
      let v = n.split('=');
      if (v[0] == key) {
        return v[1];
      }
    }
  }
}

//测试版过滤参数
function filterReleaseParams(params) {
  if (config.isRelease) {
    return params;
  }
  for (let property in params) {
    if (property == "page") {
      params[property] = "";
    }
  }
  return params;
}

//将scene值转换成options参数
function sceneSetOptions(options) {
  let scene = decodeURIComponent(options.scene);
  if (!scene) {
    return options;
  }
  let rows = scene.split('$');
  let json = {};
  for (let n of rows) {
    if (n && n.indexOf('=') != -1) {
      let v = n.split('=');
      if (v[1]) {
        json[v[0]] = getParams(scene, v[0], "$");
      }
    }
  }
  return extend(json, options)
}

/**
 *初始化定位数据
 * @param success 成功回调函数参数cityId,cityName
 * @param fail 失败回调函数
 */
function initLocation(success, fail) {
  let cityId, cityName;
  wx.getStorage({
    key: 'locationInfo',
    success: res => {
      cityId = res.data && res.data.userSelectCityId || res.data && res.data.id;
      cityName = res.data && res.data.userSelectCityName || res.data && res.data.name;
      typeof success == 'function' && success(cityId, cityName);
    },
    fail: () => {
      const App = getApp();
      App.getLocation((cityId, cityName) => {
        typeof success == 'function' && success(cityId, cityName);
      }, () => {
        typeof fail == 'function' && fail();
      })
    }
  });
}


/*数字千分符*/
function rendererZhMoney(v, digit) {
  if (isNaN(v)) {
    return v;
  }
  v = (Math.round((v - 0) * 100)) / 100;
  v = (v == Math.floor(v)) ? v + (digit ? ".00" : "") : ((v * 10 == Math.floor(v * 10)) ? v +
    "0" : v);
  v = String(v);
  var ps = v.split('.');
  var whole = ps[0];
  var sub = ps[1] ? '.' + ps[1] : (digit ? ".00" : "");
  var r = /(\d+)(\d{3})/;
  while (r.test(whole)) {
    whole = whole.replace(r, '$1' + ',' + '$2');
  }
  v = whole + sub;
  return v;
}


/*转为以万为单位*/
function rendererZhMoneyWan(v) {
  if (isNaN(v)) {
    return v;
  }
  v = v * 0.0001; //10000;
  v = formatFloat(v, 0); //parseInt(v);
  rendererZhMoney(v);
  return v;
}

/**
 * 获取焦点图
 * @params frames 轮换帧id
 * @params size 原始图片的高
 * @params successCallback {function} 成功回调函数
 */
function getFocusPic(frames, size, successCallback) {
  reqFun({
    url: apiConfig.get_focus,
    data: {
      frames,
      size,
    },
    success: jsonData => {

      if (jsonData && jsonData.status == 1) {
        successCallback(jsonData)
      }
    },
    fail: () => {
      console.log('焦点图接口调用 失败')
    }
  })
}


/**
 * 去除两侧空格
 * @params s 输入字符串
 */
function stringTrim(s) {
  s = this.stringTrimLeft(s);
  return this.stringTrimRight(s)
}

/**
 * 去除左侧空格
 * @params s 输入字符串
 */
function stringTrimLeft(s) {
  return s.replace(/^[\s\n\t]+/g, "");
}

/**
 * 去除右侧空格
 * @params s 输入字符串
 */
function stringTrimRight(s) {
  return s.replace(/[\s\n\t]+$/g, "");
}

/**
 * 字符长度（中文）
 * @params str 输入字符串
 */
function strLen(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

//验证是否是数字
function isNumber(v) {
  let regex = /^[0-9]+.?[0-9]*$/;
  return regex.test(v);
}

/**
 * POST请求接口
 * @param url {string} 请求url
 * @param data 业务参数
 * @param success {function} 成功回调函数
 * @param fail {function} 失败回调函数
 * @param complete {function} 完成回调函数
 */
function reqPost(params) {
  reqFun(params)
}

/**
 * GET请求接口
 * @param url {string} 请求url
 * @param data 业务参数
 * @param success {function} 成功回调函数
 * @param fail {function} 失败回调函数
 * @param complete {function} 完成回调函数
 */
function reqGet(params) {
  params.method = 'GET'
  reqFun(params)
}

/**
 * get请求接口
 * @param url {string} 请求url
 * @param data 业务参数
 * return Promise 结果
 */
function proGet({ url, data }) {
  return new Promise(function (resolve, reject) {
    reqGet({
      url: url,
      data: data,
      success: (res) => {
        if (res.status == 1) {
          //判断是对象还是数组
          let v = res.data && res.data.length ? [...res.data] : { ...res.data }
          resolve(v)
          return;
        }
        resolve([])
      },
      fail: () => {
        resolve([])
      }
    })
  })
}

/**
 * post请求接口
 * @param url {string} 请求url
 * @param data 业务参数
 * return Promise 结果
 */
function proPost({ url, data }) {
  return new Promise(function (resolve, reject) {
    reqPost({
      url: url,
      data: data,
      success: (res) => {
        if (res.status == 1) {
          //判断是对象还是数组
          let v = res.data && res.data.length ? [...res.data] : { ...res.data }
          resolve(v)
          return;
        }
        resolve([])
      },
      fail: () => {
        resolve([])
      }
    })
  })
}

/**
 * 二次封装Promise接口请求方法
 * @param url {string} 请求url
 * @param method 请求方式
 * @param data 业务参数
 *
 */
function reqFunPromise({
  url,
  data
}) {
  return new Promise(function (resolve, reject) {
    reqFun({
      url: url,
      data: data,
      success(res) {
        if (res.status === 1) {
          let v = res.data && res.data.length ? [...res.data] : {
            ...res.data
          }
          resolve(v)
        } else {
          resolve([])
        }
      },
      fail() {
        reject(error)
      }
    })
  })
}

/**
 * promises 封装错误处理
 * @params promises {Promises} 输入
 * return {json} : 错误不通过: status:0,成功通过:status:1
 */
function awaitWarp(promises) {
  return promises.then(function (data) {
    return {
      status: 1,
      message: '请求成功',
      data: data
    }
  }).catch(function (err) {
    return {
      status: 0,
      message: err,
      data: []
    }
  })
}


/**
 * 接口请求方法
 * @param url {string} 请求url
 * @param method 请求方式
 * @param data 业务参数
 * @param success {function} 成功回调函数
 * @param fail {function} 失败回调函数
 * @param complete {function} 完成回调函数
 *
 */
function reqFun(params) {
  if (!params) {
    return;
  }
  wx.request({
    url: params.url ? params.url : '',
    method: params.method ? params.method : 'POST',
    data: params.data ? reqParams(params.data) : reqParams({}),
    header: params.header ? params.header : {
      'Content-Type': 'application/json'
    },
    dataType: params.dataType ? params.dataType : "json",
    success: (res) => {
      if (res && res.data) {
        isFunction(params.success) && params.success(res.data);
      } else {
        console.log('---接口请求成功，地址：', JSON.stringify(params.url || ''))
        console.log('---接口请求成功，业务参数：', JSON.stringify(reqParams(params.data || {})))
        console.log('请求成功响应数据', res)
      }
    },
    fail: (res) => {
      console.log('---接口请求失败，地址：', JSON.stringify(params.url || ''))
      console.log('---接口请求失败，业务参数：', JSON.stringify(reqParams(params.data || {})))
      isFunction(params.fail) && params.fail(res);
    },
    complete: () => {
      isFunction(params.complete) && params.complete();
    }
  });
}


/**
 * 接口请求方法
 * @param url {string} 请求url
 * @param method 请求方式
 * @param data 业务参数
 * @param success {function} 成功回调函数
 * @param fail {function} 失败回调函数
 * @param complete {function} 完成回调函数
 *
 */
function reqFunUseUnionid(params) {
  if (!params) {
    return;
  }

  // console.log('---接口请求，业务参数：', JSON.stringify(reqParams(params.data||{})))

  wx.request({
    url: params.url ? params.url : '',
    method: params.method ? params.method : 'POST',
    data: params.data ? reqParamsUseUnionid(params.data) : reqParamsUseUnionid({}),
    header: params.header ? params.header : {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      isFunction(params.success) && params.success(res.data);
    },
    fail: () => {
      isFunction(params.fail) && params.fail();
    },
    complete: () => {
      isFunction(params.complete) && params.complete();
    }
  });
}
/**
 *
 * 接口请求参数
 * @公共参数 cid 客户端来源标识 100:android 200：ios 300:wechat 400:百度小程序
 * @公共参数 ver 客户端版本号
 * @公共参数 uid 用户标识
 *
 * @业务参数 param
 */
function reqParams(param) {
  let commonParam = {
    cid: '300',
    ver: wx.getSystemInfoSync().version,
    uid: getLoginUserInfo().uid || ''
  }
  // console.log('业务参数=====', commonParam)
  return Object.assign({}, commonParam, {
    param: param
  });
}
/**
 *
 * 接口请求参数
 * @公共参数 cid 客户端来源标识 100:android 200：ios 300:wechat 400:百度小程序
 * @公共参数 ver 客户端版本号
 * @公共参数 uid 用户标识
 *
 * @业务参数 param
 */
function reqParamsUseUnionid(param) {
  let commonParam = {
    cid: '300',
    ver: wx.getSystemInfoSync().version,
    unionid: getLoginUserInfo().unionid || '',
  }
  return Object.assign({}, commonParam, {
    param: param
  });
}


/**
 *
 * 获取登录用户信息
 */
function getLoginUserInfo() {
  let loginUserInfo = {}
  //userId 及 登录票据信息
  let userId = wx.getStorageSync('userId')
  if (userId) {
    loginUserInfo.ticket = userId.ticket
    loginUserInfo.uid = userId.uid
  }
  //openId unionid 信息
  let user = wx.getStorageSync('user')
  if (user) {
    loginUserInfo.openid = user.openid
    loginUserInfo.unionid = user.unionid
    loginUserInfo.session_key = user.session_key
    loginUserInfo.mobile = user.mobile
  }
  //用户昵称 头像信息
  let userInfo = wx.getStorageSync('userInfo')
  if (userInfo) {
    loginUserInfo.avatarUrl = userInfo.avatarUrl
    loginUserInfo.nickName = userInfo.nickName
  }

  return loginUserInfo
}


/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs(flag) {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = "";
  if (flag == 0) { //获取首页
    currentPage = pages[0] //获取首页
  } else if (flag == 1) { //当前页
    currentPage = pages[pages.length - 1] //获取当前页面的对象
  }
  var url = '/' + currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
/**
 *
 * 数据埋点form id
 *
 */
let buriedPoint = (params, e) => {
  if (e && e.detail && e.detail.formId != 'the formId is a mock one') {
    let loginUserInfo = getLoginUserInfo();
    let yc_log = {
      dvid: loginUserInfo.unionid, //腾讯返回的unionid
      open_id: loginUserInfo.openid, //用户的openid
      itime: new Date().getTime(), //设备时间
      form_id: params.formId, //用户的formid
      lg_vl: {
        cid: params.numberCode, //点位编号
      }
    }
    let yc_logString = encodeURI(JSON.stringify(yc_log));
    wx.request({
      url: `${apiConfig.buriedPoint}?appkey=ycxcx&ltype=click&enc=0&yc_log=${yc_logString}`,
      method: 'GET',
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}

/*
* 小程序媒体来源渠道统计
  @params {Object} 参数
  @params[uuid] {String} 设备唯一标示
  @params[cid] {String}  埋点点位编号
  @params[pfrom] {String}  渠道编号
* */
function sourceClueStatistics(params) {
  //需求文档 http://wiki.bitautotech.com/pages/viewpage.action?pageId=9511067
  //demo URL http://log.ycapp.yiche.com/statistics/EventAgent?appkey=ycxcx&ltype=click&enc=0&yc_log={"dvid":"990009263979620","itime":"2016-09-21 16:45:12","open_id":116.474214,"from_id":40.016633,"log_value":{"cid":12,"pfrom":"carmodelpage"}}
  let yc_log = {
    dvid: params.uuid, //设备唯一识别码，取缓存:wxapp_uuid
    open_id: '01', //01为微信主小程序
    itime: new Date().getTime(), //点击的客户端时间
    lg_vl: {
      cid: params.cid, //点位编号（产品需求定义）
      pfrom: params.pfrom,
      cign: params.cign //渠道号（小程序进入附带参数）
    }
  }
  let yc_logString = encodeURI(JSON.stringify(yc_log));
  // console.log('渠道统计点位:', params.cid, ',渠道编号:', params.pfrom, ',UUID:', params.uuid)
  // console.log('渠道统计URL', `${apiConfig.buriedPoint}?appkey=ycxcx&ltype=click&enc=0&yc_log=${JSON.stringify(yc_log)}`)

  // console.log('encode渠道统计URL', `${apiConfig.buriedPoint}?appkey=ycxcx&ltype=click&enc=0&yc_log=${yc_logString}`)

  if (!apiConfig.onLineFlag) {
    return
  }
  wx.request({
    url: `${apiConfig.buriedPoint}?appkey=ycxcx&ltype=click&enc=0&yc_log=${yc_logString}`,
    method: 'GET',
    success: (res) => {
      console.log('大数据统计成功', res)
    },
    fail: (err) => {
      console.log(err)
    }
  })
}

const getFormId = function (e) {
  buriedPoint({ //开启任务
    numberCode: e.detail.target.dataset.status, //点位编号
    formId: e.detail.formId, //formId
  }, e);
}

const deepObjectMerge = function (target, source) { // 深度合并对象
  for (var key in source) {
    target[key] = target[key] && target[key].toString() === "[object Object]" ?
      deepObjectMerge(target[key], source[key]) : target[key] = source[key];
  }
  return target;
}
/***
 *
 * 页面参数处理
 */

function handleOptions(options) {
  let str = "";
  let i = 0;
  for (var n in options) {
    str += (i == 0 ? "?" : "&") + n + "=" + decodeURIComponent(options[n]);
    ++i;
  }
  return str;
}
/***
 *
 * 跳转到其他小程序
 * envVersion
 */

function navigateToApp(params) {

  if (!params) {
    params = {};
  }
  let userInfo = getLoginUserInfo();
  let extraData = {
    uid: userInfo.uid || '',
    appName: params.appName ? params.appName : 'ycApp',
    dvid: userInfo.unionid
  };
  if (params.data) {
    extraData = Object.assign(extraData, params.data);
  }
  wx.navigateToMiniProgram({
    appId: apiConfig.wzAppId,
    path: params.url ? params.url : '',
    extraData,
    envVersion: apiConfig.onLineFlag ? 'release' : 'trial',
    success(res) {
      console.log("跳转成功！");
    },
    fail() {
      console.log("跳转取消！");
    },
    complete() {
      console.log("complete 跳转取消！");
    },
  })
}

/***
 * 2019-02-25
 * 旧票据换取用户新的身份票据
 */
//检查ticket票据是否过期
function checkTicket() {
  let that = this;
  // 检查ticket是否过期
  let userId = wx.getStorageSync('userId');
  // 判断有没有生成时间
  if (userId && userId.createTicketTime) {
    // 有生成时间,如果ticket过期去请求接口更新缓存生成时间和ticket字段
    checkMyTicketLogin();
  } else {
    // 无生成时间，有ticket字段证明是老用户，直接请求接口更新缓存生成时间和ticket字段
    if (userId.ticket) {
      getNewTicket();
    }
  }
}

// 判断ticket是否过期，重新请求登录
function checkMyTicketLogin() {
  let that = this;
  let userLoginMsg = wx.getStorageSync('userId'); //获取本地登录信息
  let createTime = userLoginMsg.createTicketTime; //生成时间
  let currentTime = new Date().getTime(); //当前时间
  let validityTime = 20 * 24 * 60 * 60 * 1000; //20天有效期时间
  // (当前时间-生成时间)>20天的有效期重新请求登录接口
  if ((currentTime - createTime) >= validityTime) {
    //ticket过期，重新获取登录接口ticket
    // 重新请求ticket接口
    getNewTicket();
  }
}

// 重新获取新ticket票据
function getNewTicket() {
  let that = this;
  let uid = getLoginUserInfo().uid;
  let ticket = getLoginUserInfo().ticket;
  // console.log('换取票据的参数===前', ticket);
  //登录接口请求
  reqFun({
    url: apiConfig.get_new_ticket,
    data: {
      uid: uid, //用户id
      ticket: ticket, //旧票据
    },
    success(jsonData) {
      var res = jsonData.data;
      if (res && res.newTicket) {
        //将uid存入本地缓存
        var userIdObj = {};
        userIdObj.uid = uid;
        userIdObj.ticket = res.newTicket;
        userIdObj.createTicketTime = new Date().getTime(); //生成ticket的时间
        wx.setStorageSync('userId', userIdObj);
        // console.log('换取票据响应回来的票据值===后', res.newTicket);
      }
    },
    fail(res) {
      console.log(res)
    }
  })
}


const getUrlParams = function (url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = url.substr(url.indexOf('?') + 1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';

}

/*
 生成UUID
 @para len {Number} 长度
 @para radix {Number} 算法基数
 @return uuid{String} 生成的UUID
 */
function createUUID(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

function changeSceneToOption(s) {
  console.log("has scene");
  var scene = decodeURIComponent(s);
  console.log("scene is ", scene);
  var option = {};
  var arrPara = scene.split("&");
  var arr = [];
  for (var i in arrPara) {
    arr = arrPara[i].split("=");
    // wx.setStorageSync(arr[0], arr[1]);
    option[arr[0]] = arr[1]
    // console.log("setStorageSync:", arr[0], "=", arr[1]);
  }

  return option

}
const debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/**
 * 在登录状态时（有ticket）根据车系ID增加足迹
 *  @para serialid {Number} 车系ID
 */
function addFootToServerBySerierId(serialid) {

  reqFun({
    url: apiConfig.add_carmodel_footprint,
    data: {
      bizId: serialid, //车系ID
      'Login-Ticket': wx.getStorageSync('userId').ticket, //用户票据
    },
    success(res) {
      if (res && '1' == res.status) {
        console.log('服务器保存足迹成功，保存ID', serialid)
      }
    },
    fail(res) {
      console.log(res)
    }
  })
}

/**
 * 非登录状态时根据车系Object增加足迹
 *  @para serialid {String} 车系数据
 */
function addFootToLocalStorageBySerierId(serialid) {
  //规则：最新浏览的车系放在最前，列表不重复
  let tempList = [];
  let watchHistory = wx.getStorageSync('watchHistoryNew') || [];
  let findItem = watchHistory.find((item) => item == serialid)

  if (findItem) {
    let otherList = watchHistory.filter(item => {
      return item != serialid
    });
    tempList = [findItem, ...otherList];
  } else {
    tempList = [serialid, ...watchHistory];
  }
  //本地缓存成功，缓存结果
  console.log('本地缓存成功，缓存结果', tempList.slice(0, 6))
  wx.setStorageSync('watchHistoryNew', tempList.slice(0, 6));
}

/**
 * 添加足迹处理器
 */
function addFootHandler(sid) {
  if (!sid) {
    return
  }

  let serialid = parseInt(sid);
  //登陆过
  if (wx.getStorageSync('user') && wx.getStorageSync('userId')) {
    addFootToServerBySerierId(serialid)
  } else {
    //未登陆
    addFootToLocalStorageBySerierId(serialid)
  }
}

/**
 *
 * 收藏车型
 */
function collectCarStorage(sid) {
  console.log(sid)
  let collectCarData = wx.getStorageSync('collectCar') || [];
  let isCollect = collectCarData.find((carItemSid) => {
    return carItemSid == sid
  })
  if (isCollect) {
    let handleCollectCarData = collectCarData.filter((carItemSid) => {
      return carItemSid != sid
    })
    collectCarData = [sid, ...handleCollectCarData]
  } else {
    collectCarData = [sid, ...collectCarData]
  }
  wx.setStorageSync('collectCar', collectCarData)
}
/**
 * 接口加密签名sign
 * 1.参数按照参数名ASCII码从小到大排序（字典序）,使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串stringA。
注意地方:
1. uid cid ver 以及 业务参数的参数名ASCII码从小到大排序（字典序）
2. 如果参数的值为空不参与签名；
3. 参数名区分大小写;
 */
function getSign(params) {
  if (typeof params == "string") {
    return paramsStrSort(params);
  } else if (typeof params == "object") {
    params = {
      ... {
        appKey: '192006250b4c09247ec02edce69f6a2d',
        cid: '300',
        ver: wx.getSystemInfoSync().version && wx.getSystemInfoSync().version.toString() || '',
        uid: getLoginUserInfo().uid && getLoginUserInfo().uid.toString() || ''
      },
      ...params
    }
    var arr = [];
    for (var i in params) {
      if (params[i] || params[i] === 0) {
        arr.push((i + "=" + params[i]));
      }
    }
    return paramsStrSort(arr.join(("&")));
  }
}

function paramsStrSort(paramsStr) {
  var stringSignTemp = paramsStr.split("&").sort().join("&");
  console.log('md5加密前===', stringSignTemp)
  console.log('md5加密后===', md5.hexMD5(stringSignTemp).toUpperCase())
  return md5.hexMD5(stringSignTemp).toUpperCase();
}

var key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为秘钥

var iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为秘钥偏移量
//加密方法
function encrypt(word) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}
//解密方法
function decrypt(word) {
  var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//图片转base64
function base64({ url, type }) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
      },
      fail: res => reject(res.errMsg)
    })

  })
}
//上传图片请求接口
function chooseWxImage({ type = 0, canvasName = 'canvasPic', url, that }) {
  if (!that) { return }
  return new Promise(function (resolve, reject) {
    let ctx = wx.createCanvasContext(canvasName)
    wx.chooseImage({ //上传图片事件
      count: 1,
      sizeType: ['compressed'],
      sourceType: [type == 0 ? 'album' : 'camera'],
      success: function (photo) {
        //启动上传等待中... 
        wx.showToast({
          title: '正在识别...',
          icon: 'loading',
          mask: true,
          duration: 5000
        });
        wx.getImageInfo({ //获取图片信息
          src: photo.tempFilePaths[0],
          success: function (res) {
            let canvasWidth = res.width //图片原始宽
            let canvasHeight = res.height //图片原始高
            let cancasWh = canvasWidth / canvasHeight //图片宽高比
            let upPicH = parseInt(that.data.canvasW / cancasWh) //压缩后固定宽800，根据宽高比算出压缩后的高

            console.log(upPicH, "压缩后的高")
            that.setData({
              canvasH: upPicH, //压缩后的高
            })

            //----------绘制图形并取出图片路径--------------
            ctx.drawImage(res.path, 0, 0, that.data.canvasW, upPicH) //成功选定第一张。后面的四个值分别是left，top，width，height，来控制画布上的图片的位置和大小
            ctx.draw(false, function () {
              wx.canvasToTempFilePath({ //获取图片的本地路径
                x: 0,
                y: 0,
                width: that.data.canvasW,
                height: upPicH,
                destWidth: that.data.canvasW,
                destHeight: upPicH,
                canvasId: 'canvasPic',
                success(res) {
                  console.log(that.data.canvasW, '上传的宽') //filePath: res.tempFilePath,
                  console.log(upPicH, '上传的高')
                  console.log(res.tempFilePath, 'tempFilePath')
                  let tempfile = res.tempFilePath

                  wx.uploadFile({ //把本地路径的图片上传到服务器
                    url: url, //ocr识别接口地址
                    // url: apiConfig.faceSelectCar.new_upload_pic, //单独图片接口地址
                    filePath: res.tempFilePath,
                    // header: { "content-type": 'application/xhtml+xml' },
                    name: 'file',
                    formData: {
                      ticket: that.data.ticketRz
                    },
                    success: function (resUp) {
                      let resJson = JSON.parse(resUp.data) //由JSON字符串转换为JSON对象   

                      if (resJson.data !== null) {
                        resJson.data.upPicH = parseInt(that.data.canvasW / cancasWh)
                        resJson.data.tempfile = tempfile
                      }

                      if (resJson.status == 1) {
                        resolve(resJson.data)
                      } else {
                        reject(tempfile)
                        setTimeout(function () {
                          wx.showToast({
                            title: "图片识别失败",
                            icon: 'none',
                            duration: 700
                          })
                        }, 1000)

                      }

                    },
                    fail: function (resUp) {

                    }
                  })
                }
              })
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '图片上传失败，请重新上传',
              icon: 'none',
              mask: true,
            })
          },
        })
      }

    })
  })
}
//loadingToat
function loadingToast() {
  wx.showLoading({
    title: '加载中...',
  })
}
module.exports = {
  convertTime,
  formatTime,
  requestData,
  showNotSupportModal,
  backToIndex,
  backToTop,
  throttle,
  extend,
  imageZoomHeight,
  imageZoomWidth,
  comparesDate,
  stringStr,
  getParams,
  sceneSetOptions,
  filterReleaseParams,
  pattern,
  initLocation,
  rendererZhMoney,
  rendererZhMoneyWan,
  getFocusPic,
  stringTrim,
  stringTrimLeft,
  stringTrimRight,
  strLen,
  isNumber,
  reqFun,
  reqPost,
  reqGet,
  reqParams,
  reqFunUseUnionid,
  reqParamsUseUnionid,
  getLoginUserInfo,
  getCurrentPageUrlWithArgs,
  buriedPoint,
  getFormId,
  deepObjectMerge,
  handleOptions,
  navigateToApp,
  checkTicket,
  getNewTicket,
  checkMyTicketLogin,
  getUrlParams,
  createUUID,
  sourceClueStatistics,
  changeSceneToOption,
  debounce,
  changeSceneToOption,
  addFootToServerBySerierId,
  addFootToLocalStorageBySerierId,
  addFootHandler,
  collectCarStorage,
  getSign,
  decrypt,
  encrypt,
  proGet,
  proPost,
  loadingToast,
  base64,
  chooseWxImage
}