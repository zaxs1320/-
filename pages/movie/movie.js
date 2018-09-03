var util=require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inmovie: {},
    comingSoon: {},
    movieTop: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var InmovieUrl = app.globalData.douban + "/v2/movie/in_theaters" + "?start=0&count=3";
    var ComingSoonUrl = app.globalData.douban + "/v2/movie/coming_soon" + "?start=0&count=3";
    var movietopUrl = app.globalData.douban + "/v2/movie/top250" + "?start=0&count=3";

    this.GetDoubanData(InmovieUrl, "inmovie", "正在热映");
    this.GetDoubanData(ComingSoonUrl, "comingSoon", "即将上映");
    this.GetDoubanData(movietopUrl, "movieTop", "豆瓣top250");
  },

  GetDoubanData: function (url, settedkey, categorytitle) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        "content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        that.ProcessDoubanData(res.data, settedkey, categorytitle);
      },
      fail: function (error) {
        console.log(error);
      },
    })
  },

  ProcessDoubanData: function (movieData, settedkey, categorytitle) {
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
    var readyData = {};
    readyData[settedkey] = {
      movies: movies,
      categorytitle: categorytitle,
    }
    this.setData(readyData);
  },




  OnMoreTop:function(event){
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'movie-more/movie-more?title='+title,
    })
  }

})
