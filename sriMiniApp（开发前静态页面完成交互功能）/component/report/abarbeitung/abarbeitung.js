// component/report/abarbeitung/abarbeitung.js
var app = getApp()
var sourceType = [['camera'], ['album']]
var voice = "";
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
    ],
    hiddentypeList: [],
    hiddentype_name: "未完成",
    items: null,
    //相册或者拍照
    tempFilePaths: '',

    imageList: [],
    sourceType: ['拍照', '相册']
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
    },
  
  /**
   * 照片功能
   */

  sourceTypeChange: function (e) {
    var that = this
    // 判断当前选择的是相机还是相册
    that.setData({
      sourceTypeIndex: e.detail.value
    })
    // 调用图片组件
    wx.chooseImage({
      // 传入刚才判断的结果
      sourceType: sourceType[this.data.sourceTypeIndex],
      // 格式仅压缩
      sizeType: 'compressed',
      // 最多9张图片
      count: 9,
      success: function (res) {
        console.log(res)
        // 当前没有照片时执行
        if (that.data.imageList.length == 0) {
          that.setData({
            imageList: res.tempFilePaths
          })
          // 当前有照片并小于9张时
        } else if (that.data.imageList.length < 9) {
          console.log(res.tempFilePaths.toString());
          //var list = that.data.imageList.push(res.tempFilePaths.toString())
          // 判断上传的图片总量是否超过9张
          if (that.data.imageList.length + res.tempFilePaths.length > 9) {
            wx.showToast({
              title: '最多上传九张图',
              icon: 'loading',
              duration: 3000
            });
          } else {
            that.setData({
              imageList: that.data.imageList.concat(res.tempFilePaths)
            })
          }

          console.log(that.data.imageList);
        } else {
          wx.showToast({
            title: '最多上传九张图',
            icon: 'loading',
            duration: 3000
          });
        }
      }
    })
  }
  ,
  // 展示要上传的照片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // 删除要上传的照片
  deleteImage: function (e) {
    var imgs = this.data.imageList;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imageList: imgs
    });
  },
  // 上传选择的图片
  uploadImages: function (e) {
    var tempFilePaths = e.tempFilePaths;
    wx: wx.uploadFile({
      url: app.userService + 'miniUser/uploadImages',
      filePath: tempFilePaths[0],
      name: 'file',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  }
})