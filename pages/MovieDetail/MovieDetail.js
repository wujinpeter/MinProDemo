// pages/MovieDetail/MovieDetail.js
var API_URL = "https://api.douban.com/v2/movie/subject/"

Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    wx.request({
      url: API_URL + options.id,
      data: {},
      header: {
        'content-type': 'json'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        console.log(res.data);
        that.setData({
          movie: res.data
        })
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