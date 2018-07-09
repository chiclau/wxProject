var app = getApp();
var datareq = require("../../../utils/datareq.js");
Page({
  data: {
    list:"1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 调用公共get方法获取后台数据
    datareq.dataget(null,null,this.callback,null);
  },
  // 数据获取成功时执行
  callback: function(res){
    this.setData({
      list:res.list
    })
  }
})