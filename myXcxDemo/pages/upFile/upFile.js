// pages/upFile/upFile.js
import {
  reqFun
} from '../../utils/util.js'
const apiConfig = require("../../apiConfig/apiConfig.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    canvasW: 100, //图片压缩默认宽
    canvasH:null,//图片压缩计算出来的高
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  upload:function(){
    var that = this
    wx.showActionSheet({
      itemList: ['从相册中选择','牌照'],
      itemColor:'#333333',
      success(res){
        console.log(res.tapIndex) //点击的是相册还是牌照
        if(!res.cancel){
          var ctx = wx.createCanvasContext('canvasPic')
          wx.chooseImage({
            count:1,
            sizeType:['compressed'],
            sourceType: [res.tapIndex == 0 ? 'album' :'camera'],
            success: function(res) {
              wx.showToast({
                title: '正在识别...',
                icon:'loading',
                mask:true,
                duration:5000
              });
              wx.getImageInfo({ //获取上传图片的信息
                src: res.tempFilePaths[0],
                success:function(w){
                  console.log(w)
                  var canvasWidth = w.width //图片原始宽
                  var canvasHeight = w.height //图片原始高
                  //宽高比例
                  var cancaswh = canvasWidth / canvasHeight 
                  //如果压缩宽是800 那就能算出高
                  var upPicH = parseInt(that.data.canvasW / cancaswh)
                  console.log(upPicH, "压缩后的高")
                  that.setData({
                    canvasH: upPicH, //压缩后的高
                  })
                  // 然后画布绘制图片 图片 位置 宽高
                  ctx.drawImage(w.path, 0, 0, that.data.canvasW, that.data.canvasH)
                  ctx.draw(false,function(){
                    //把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功
                    wx.canvasToTempFilePath({ 
                      x:40,
                      y:40,
                      width: that.data.canvasW,
                      height:that.data.upPicH,
                      destWidth: that.data.canvasW,
                      destHeight:that.data.upPicH,
                      canvasId:'canvasPic',
                      success(ress){
                        console.log(that.data.canvasW, '上传的宽') //filePath: res.tempFilePath,
                        console.log(upPicH, '上传的高')
                        console.log(ress.tempFilePath, 'tempFilePath')

                        wx.uploadFile({ //把本地路径的图片上传到服务器
                          url: apiConfig.certifiedOwner.get_ocr_info, //ocr识别接口地址
                          // url: apiConfig.faceSelectCar.new_upload_pic, //单独图片接口地址
                          filePath: ress.tempFilePath,
                          // header: { "content-type": 'application/xhtml+xml' },
                          name: 'file',
                          formData: {
                            ticket: wx.getStorageSync('userBigBig').ticket
                          },
                          success: function (resUp) {
                            console.log(resUp)

                            // if (resJson.data !== null) {
                            //   resJson.data.upPicH = parseInt(that.data.canvasW / cancasWh)
                            //   resJson.data.tempfile = tempfile
                            // }

                            // if (resJson.status == 1) {
                            //   resolve(resJson.data)
                            // } else {
                            //   reject(tempfile)
                            //   setTimeout(function () {
                            //     wx.showToast({
                            //       title: "图片识别失败",
                            //       icon: 'none',
                            //       duration: 700
                            //     })
                            //   }, 1000)

                            // }

                          },
                          fail: function (resUp) {

                          }
                        })
                      }

                    })
                  })
                }
              })
            },
          })
        }
      }
    })
    // 自己研究的
    // console.log(wx.getStorageSync('userBigBig').ticket)
    // wx.chooseImage({
    //   count:1, //一张
    //   sourceType: ['album', 'camera'], //相机或者相册
    //   success(res) {
    //     console.log(res.tempFilePaths)
    //     wx.uploadFile({
    //       url: 'http://mapi.yiche.com/wx_carmodel/api/v1/base/new_upload_pic',
    //       filePath: res.tempFilePaths[0],
    //       name: 'file',
    //       // formData: {
    //       //   file: res.tempFilePaths[0],
    //       // },
    //       success(res) {
    //         // 上传成功
    //         console.log(res)
    //         that.setData({
    //           img: JSON.parse(res.data).data.fileUrl
    //         })
    //         reqFun({
    //           url: 'http://mapi.yiche.com/wx_carmodel/api/v1/usercar/get_ocr_info',
    //           data: {
    //             'file': that.data.img,
    //             'ticket': wx.getStorageSync('userBigBig').ticket
    //           },
    //           success: function (res) {
    //             console.log(res)
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
  },
  yesBtn:function(){
    var that= this
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