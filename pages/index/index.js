 //index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
  },
  ontap:function(){
     wx.switchTab({
       url: '../posts/post',
     })
  },

  userInfoHandler(data) {
    wx.BaaS.handleUserInfo(data).then(res => {
      // res 包含用户完整信息，详见下方描述
      app.globalData.userInfo = res;
      console.log(app.globalData.userInfo);
      wx.switchTab({
        url: '../posts/post',
      })
    }, res => {
      
    })
    


  }

  
})
