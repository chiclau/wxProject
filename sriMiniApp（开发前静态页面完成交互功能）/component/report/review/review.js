// component/report/abarbeitung/abarbeitung.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    date: "2018-12-12",
    imgalist: [
      'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
      'http://bpic.588ku.com/element_origin_min_pic/16/10/30/54fcef525fa8f6037d180f3c26f3be65.jpg',
      'http://bpic.588ku.com/element_origin_min_pic/16/10/30/62e3ca3a02dddb002eff00482078d194.jpg',
      'http://bpic.588ku.com/element_origin_min_pic/16/10/31/c7167fcfb4ebcd12621c05b0c852e98e.jpg',
      "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片点击放大预览
     */
    previewImage: function(e) {
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: this.data.imgalist // 需要预览的图片http链接列表  
      })
    },
    // 提交审核结果
    submitAudit: function(e) {
      wx.showModal({
        title: "提示",
        content: '确认整改完成吗？',
        confirmText: "确定",
        cancelText: "取消",
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: "../../../basics/homePage/homePage",
            })
          }
        }
      })
    }
  }
})