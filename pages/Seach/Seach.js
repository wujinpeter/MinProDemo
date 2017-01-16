// pages/Seach/Seach.js
var API_URL = "https://api.douban.com/v2/movie/search?q=";
Page({
  data:{
    movies:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  search:function(e){
    if(!e.detail.value){
      return;
    }
    wx.showToast({
      title:"loading...",
      icon:"loading",
      duration:10000
    })
    var that = this;
    wx.request({
      url: API_URL + e.detail.value,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'json'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        wx.hideToast();
        that.setData({
          movies:res.data.subjects
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})