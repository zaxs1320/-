// pages/movie/movie-more/movie-more.js
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:'',
      movies:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var dataUrl;
      var title = options.title;
      this.setData({
        title:title
      });
      switch(title){
        case '正在热映':
          dataUrl = app.globalData.douban + "/v2/movie/in_theaters";
          break;
        case '即将上映':
          dataUrl = app.globalData.douban + "/v2/movie/coming_soon";
          break;
        case '豆瓣top250':
          dataUrl = app.globalData.douban + "/v2/movie/top250";
          break;
      };
      util.http(dataUrl, this.ProcessDoubanData);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.setNavigationBarTitle({
        title: this.data.title,
      })
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
  
  },

  ProcessDoubanData: function (movieData) {
    console.log(movieData);
    var movies = [];
    for (var index in movieData.subjects) {
      var subjects = movieData.subjects[index];
      var title = subjects.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var averages = util.convertTostarArray(subjects.rating.stars);
      var temp = {
        title: title,
        averages: averages,
        average: subjects.rating.average,
        image: subjects.images.large,
        movieId: subjects.id,
      }
      movies.push(temp);
    }
    this.setData({
      movies:movies
    });
  },
})