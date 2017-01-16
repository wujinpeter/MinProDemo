// pages/Movie/Movie.js
var API_URL = "https://api.douban.com/v2/movie/top250"
Page({
  data: {
    title:"loading...",
    movies: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })

    wx.request({
      url: API_URL,
      data: {},
      header: {
        'content-type': 'json'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        wx.hideToast();
        console.log(res.data);
        var data = res.data;
        // console.log(data.title);
        that.setData({
          title: data.title,
          movies:data.subjects
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})