var app = getApp()
var sourceType = [['camera'], ['album']]
var voice = "";
Page({
  onLoad: function() {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {
    items: null,
    //相册或者拍照
    tempFilePaths: '',

    imageList: [],
    sourceType: ['拍照', '相册']
  },

  /**
   * 上报当前隐患
   */
  login: function() {
    var that = this
    wx.login({
      success: function(res) {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.update()
      }
    })
    wx.showModal({
      title: "提示",
      content: '确定提交吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: "../../basics/homePage/homePage",
          })
        }
      }
    })
  },
  opention: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['洛斯达', '中水电', '蓝宇汇通'],
      success: function(e) {
        console.log(e.tapIndex)
        if (e.tapIndex == 0) {
          that.setData({
            items: "洛斯达"
          })
        } else if (e.tapIndex == 1) {
          that.setData({
            items: "中水电"
          })
        } else {
          that.setData({
            items: "蓝宇汇通"
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
        if (that.data.imageList.length == 0){
          that.setData({
            imageList: res.tempFilePaths
          })
        // 当前有照片并小于9张时
        } else if (that.data.imageList.length < 9){
          console.log(res.tempFilePaths.toString());
          //var list = that.data.imageList.push(res.tempFilePaths.toString())
          // 判断上传的图片总量是否超过9张
          if (that.data.imageList.length + res.tempFilePaths.length >9){
            wx.showToast({
              title: '最多上传九张图',
              icon: 'loading',
              duration: 3000
            });
          }else{
            that.setData({
              imageList: that.data.imageList.concat(res.tempFilePaths)
            })
          }
          
        console.log(that.data.imageList);
        }else{
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
  deleteImage:function(e){
    var imgs = this.data.imageList;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imageList: imgs
    });
  },
  // 上传选择的图片
  uploadImages:function(e){
    var tempFilePaths = e.tempFilePaths;
    wx:wx.uploadFile({
      url: app.userService + 'miniUser/uploadImages',
      filePath: tempFilePaths[0],
      name: 'file',
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  /**
   * 录音功能
   */
  play: function() {
    //播放声音文件    
    wx.playVoice({
      filePath: voice
    })
  },
  start: function() {
    //开始录音    
    wx.startRecord({
      success: function(e) {
        voice = e.tempFilePath
      }
    })
  },
  stop: function() {
    //结束录音    
    wx.stopRecord();
  },
  
  
})