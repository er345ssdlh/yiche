Page({
  data: {
    popup: true
  },
  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /* 显示弹窗 */
  showPopup() {
    this.hidePopup(false);
  },
  onShareAppMessage:function(w){
    console.log(w)
    return{
      title:'我在易车汽车人生领取了我的专属座驾，更有玻璃水，加油卡免费领取',
      path:'/pages/dalog/dalog',
      imageUrl:'http://img3.cache.netease.com/photo/0001/2010-10-14/6IVN5LN300AQ0001.jpg',
      success:function(q){
        console.log(q)
        // 通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息，例如群的标识。现在通过调用 wx.showShareMenu 并且设置 withShareTicket 为 true ，当用户将小程序转发到任一群聊之后，此转发卡片在群聊中被其他用户打开时，可以在 App.onLaunch 或 App.onShow 获取到一个 shareTicket。通过调用 wx.getShareInfo 接口传入此 shareTicket 可以获取到转发信息。
        wx.showShareMenu({
          withShareTicket: true
        })
      }
    }
  }
})