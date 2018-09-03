//index.js
//获取应用实例
// var postsdata=require('../../data/post-data.js')
const app = getApp()
Page({
  data: {
    post_key: [],
  },
  onLoad: function () {
    wx.showLoading({
      title: '...正在加载',
    })   
    //从服务器获取数据
    let tableID = app.globalData.tableID;
    let MyTableObject = new wx.BaaS.TableObject(tableID);
    MyTableObject.find().then(res => {
      this.setData({
        post_key: res.data.objects
      });
    })

    // this.setData({
    //   post_key: postsdata.postlist
    // });
    wx.hideLoading();
  },

  onposttap:function(event){
    var postId=event.currentTarget.dataset.postid;
    //console.log("on post is "+postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  }

  // OnSwiper:function(event){
  //   var postId=event.target.dataset.postid;
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id='+postId,
  //   })
  // }
})
