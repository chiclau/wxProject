var app = getApp();
var dataerq = require("../../../utils/datareq.js");
Page({
  data: {
    userInfo: {}
  },
  //页面加载时运行的代码
  onLoad: function() {
    if (app.globalDate.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    }
  },

  // 提交账号和密码到后台
  ubmit: function(e) {
    var that = this
    if (e.detail.value.userAcct.length == 0) {
      wx.showModal({
        title: "提示",
        content: "用户账号不可以为空",
        showCancel: false,
        confirmText: "确定"
      })
    } else if (e.detail.value.userPwd.length == 0) {
      wx.showModal({
        title: '提示',
        content: '用户密码不可以为空',
        showCancel: false,
        confirmText: "确定"
      })
    } else {
      //that.userOpenId();
      var data = {
        userAcct: e.detail.value.userAcct,
        userPwd: e.detail.value.userPwd,
        openId: app.globalDate.userInfo.openId
      }
      dataerq.datapost('miniUser/login', data, this.callback, null);
    }
  },
  // 调用成功后执行
  callback: function(ress) {
    if (ress == "yes") {

      wx.switchTab({
        url: "../homePage/homePage",
      })
    } else if (ress == "no") {
      wx.showModal({
        title: '提示',
        content: '注册失败',
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  userOpenId: function() {
    var that = this;
    wx.login({
      success: function(r) {
        //登陆凭证
        var code = r.code;
        if (code) {
          //调用获取用户信息接口
          wx.getUserInfo({
            success: function(res) {
              var datt = {
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code
              };
              dataerq.datapost('miniUser/decodeUserInfo', datt, that.openidyes, that.openidno);
            },
            fail: function() {
              console.log("获取用户信息失败");
            }
          })
        } else {
          console.log("获取用户登陆状态失败！" + r.errMsg);
        }
      },
      fail: function() {
        console.log("登陆失败");
      }
    })
  },
  // 获取用户信息成功后执行的方法
  openidyes : function(data){
    if (data.status == 1) {
      app.globalDate.userInfo = data.userInfo;
      console.log("openId为" + app.globalDate.userInfo.openId);
    } else {
      console.log('解密失败');
    }
  },
  // 获取用户信息失败后执行的方法
  openidno: function (data) {
    console.log("系统错误");
  },
  
  qwe: function() {
    wx.switchTab({
      url: "../homePage/homePage",
    })
  }
})