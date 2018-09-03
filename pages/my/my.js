// pages/my/my.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      item:[{
        title:'我的收藏',
        url:''
      },
      {
        title:'关于',
        url:''
      },
      {
        title:'你喜欢吗',
        url:''
      }
      ],
      location:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
        title: '...正在加载',
      })
      var userInfo = app.globalData.userInfo;
      this.setData({
        userInfo: userInfo
      })
      wx.hideLoading();

      
     
   
      
  },

  // onItemTap: function(event){
  //     var title = event.currentTarget.dataset.itemtitle;
  //     var url = event.currentTarget.dataset.itemurl;
  //     wx.navigateTo({
  //       url: url+"?title="+title
  //     })

  // }

})