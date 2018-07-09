// pages/operation/hiddenQuery/hiddenAudit/hiddenAudit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //系统高度
    winHeight: 0,
    // 选项卡
    currentTab: 0,
    //进度条信息
    steps: [{
      current: false,
      done: true,
      text: '2018-12-12',
      desc: '张三上报安全隐患'
    },
    {
      current: false,
      done: true,
      text: '2018-12-13',
      desc: '项目管理员下发整改通知'
    },
    {
      done: true,
      current: false,
      text: '2018-12-14',
      desc: '施工安全员下发整改通知'
    },
    {
      done: true,
      current: false,
      text: '2018-12-15',
      desc: '班组长完成隐患整改，并上报'
    },
    {
      done: false,
      current: true,
      text: '2018-12-16',
      desc: '施工安全员复查审核并确认整改内容'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  //滑动切换选项卡
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换选项卡
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})