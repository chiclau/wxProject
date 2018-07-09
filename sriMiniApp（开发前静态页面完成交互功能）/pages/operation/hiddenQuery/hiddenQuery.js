// pages/operation/HiddenQuery/HiddenQuery.js
var app = getApp();
var datareq = require("../../../utils/datareq.js");
var navtab = require("../../../utils/hiddentable.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 隐患展示属性
    list:"",
    // 导航栏属性
    navData: [
      {
        // 根据此属性跳转正常详情，审核，整改页面
        hiddenType:0,
        name: "隐患统计",  //文本
        current: 1,    //是否是当前页，0不是  1是
        ico: 'tongji-yinhuantongji-xuanzhe@2x.png',  //不同图标
        icoo: 'tongji-yinhuantongji@2x.png',
        fn: 'reportCount'   //对应处理函数
      }, {
        name: "隐患审核",
        current: 0,
        ico: 'shenhe-shenhetubiao-xuanzhe@2x.png',
        icoo: 'shenhe-shenhetubiao@2x.png',
        fn: 'reportAudit'
      }, {
        name: "隐患复查",
        current: 0,
        ico: 'fucha-zhenggaifucha-xuanzhe@2x.png',
        icoo: 'fucha-zhenggaifucha@2x.png',
        fn: 'reportReqair'
      }, {
        name: "隐患查询",
        current: 0,
        ico: 'shenhe-yinhuanshenhe-xuanzhe@2x.png',
        icoo: 'shenhe-yinhuanshenhe@2x.png',
        fn: 'reportSelect'
      }, {
        name: "隐患上报",
        current: 0,
        ico: 'shangbao-wodeshangbao-xuanzhe.png',
        icoo: 'shangbao-yinhuanshangbao@2x.png',
        fn: 'reportUp'
      }
    ],
    navDataIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用公共get方法获取后台数据
    datareq.dataget(null, null, this.callback, null);
  },
  // 数据获取成功时执行
  callback: function (res) {
    this.setData({
      list: res.list
    })
  },
  // 底部tab切换js
  reportCount:function(res){
    var nav = this.data.navData;
    var count = 0;
    navtab.nav(nav, count);
    this.setData({
      navData:nav,
      navDataIndex:0,
      hiddenType:0
    })
  },
  reportAudit: function (res) {
    var nav = this.data.navData;
    var count = 1;
    navtab.nav(nav, count);
    this.setData({
      navData: nav,
      navDataIndex: 1,
      hiddenType: 1
    })
  },
  reportReqair:function(){
    var nav = this.data.navData;
    var count = 2;
    navtab.nav(nav, count);
    this.setData({
      navData: nav,
      navDataIndex: 2,
      hiddenType: 2
    })
  },
  reportSelect: function () {
    var nav = this.data.navData;
    var count = 3;
    navtab.nav(nav, count);
    this.setData({
      navData: nav,
      navDataIndex: 3,
      hiddenType: 0
    })
  },
  reportUp:function () {
    var nav = this.data.navData;
    var count = 4;
    navtab.nav(nav, count);
    this.setData({
      navData: nav,
      navDataIndex: 4,
      hiddenType: 0
    })
  },
 

 
})