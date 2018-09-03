// var postsdata = require('../../../data/post-data.js')
var util = require('../../../utils/util.js');
const app = getApp()

Page({
  data: {
    isPlayMusic:false,
    comment: [],
    focus: false,
    userInfo: {},
  },


  onLoad: function (option) {
    wx.showLoading({
      title: '...正在加载',
    })
    var userInfo = app.globalData.userInfo;
    this.setData({
      userInfo:userInfo
    })
    
    
    let postId=option.id;
    this.data.currentPostId=postId;

    



    let tableID = app.globalData.tableID;
    let MyTableObject = new wx.BaaS.TableObject(tableID);
    MyTableObject.find().then(res => {
      this.setData(res.data.objects[postId]);

      let contentGroupID = this.data.contentGroupID;
      let richTextID = this.data.richTextID;

      let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
      MyContentGroup.getContent(richTextID).then(res => {
        // success
        this.setData(res.data);
        //加载评论
        this.processComment();
        //--------------------------------

      }, err => {
        // err
      })


    })
    // var postData=postsdata.postlist[postId];
    // this.setData(postData);

    var postsCollection = wx.getStorageSync("posts-collection");
    if(postsCollection){
      var postCollection =  postsCollection[postId];
      this.setData({
        collection:postCollection
      })
    }
    else{
      var postsCollection = {};
      postsCollection[postId]=false;
      wx.setStorageSync("posts-collection", postsCollection);
    }


    


    wx.hideLoading();
  },

  

  onReady: function (option){
    // wx.playBackgroundAudio({   //一打开网页自动开始播放  暂时还有bug
    //   dataUrl: this.data.url,
    //   title: this.data.title,
    // })
  },
  
  processComment:function(){
    let query = new wx.BaaS.Query();
    query.compare('userID', '=', this.data.postId);
    let Product = new wx.BaaS.TableObject(app.globalData.tableComment);
    Product.setQuery(query).find().then(res => {
      // success
      this.setData({
        comment: res.data.objects
      })

    }, err => {
      // err
    })
  },

  OncollectionTap: function (event) {
    var postsCollction = wx.getStorageSync("posts-collection");
    var postCollection = postsCollction[this.data.currentPostId];
    postCollection = !postCollection;
    postsCollction[this.data.currentPostId] = postCollection;
    this.showToast(postsCollction, postCollection);
  },

  showToast: function (postsCollction, postCollection){
      wx.setStorageSync("posts-collection", postsCollction);
      this.setData({
        collection: postCollection
      })

      wx.showToast({
        title: postCollection ? '收藏成功' : '取消收藏',
        icon: 'success',
        duration: 1000,
      })
   },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '转发给好友',
      path: '/pages/posts/post-detail/post-detail'
    }
  },

  // OnShareTap: function(event){
  //   var Listdata=['分享到QQ','分享到朋友圈','分享到微信好友','分享到微博','分享给林同学'];
  //   wx.showActionSheet({
  //     itemList: Listdata,
  //   })
  // },

  OnAudioTap: function(event) {
    var postId = this.data.currentPostId;
    var isplayingmusic = this.data.isPlayMusic;
    if (isplayingmusic){
      wx.stopBackgroundAudio();
      this.setData({
        isPlayMusic: false
      })
    }

    else{
      wx.playBackgroundAudio({
        dataUrl: this.data.url,
        title: this.data.title,
      })
      this.setData({
        isPlayMusic: true
      })
    }
    
  },

  bindButtonTap: function () {
    this.setData({
      focus: !this.data.focus
    })
  },

  bindFormSubmit:function(e){
    this.setData({
      focus: !this.data.focus
    })
    var time = util.formatTime(new Date()); 

    let tableID = app.globalData.tableComment;
    let Product = new wx.BaaS.TableObject(tableID);
    let product = Product.create();
    let apple = {
      userID: this.data.postId,
      nickname: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      comment_content: e.detail.value.textarea,
      data: time,
    }

    product.set(apple).save().then(res => {
      // success
      console.log(res.data);
      this.processComment();
    }, err => {
      // err
    })

  

    




  }

 
})