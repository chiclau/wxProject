Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: [],
      value: ''
    },
    types: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 隐患展示信息
    list: "",
    dateleft: '2018-09-01',
    dateright: '2018-09-01',
    typeID: 0,
    isLoading: true,
    loadOver: false,
    timeList: [],
    projList: [{
      key: 1,
      value: "全部"
    }, {
      key: 2,
      value: "亚洲一部",
      proj: ["全部", "印度xxxx水利施工二期项目", "越南xxxxx改造三期项目", "印度xxxx水利施工二期项目", "越南xxxxx改造三期项目", "印度xxxx水利施工二期项目", "越南xxxxx改造三期项目", "印度xxxx水利施工二期项目", "越南xxxxx改造三期项目", "印度xxxx水利施工二期项目", "越南xxxxx改造三期项目", "印度xxxx水利施工二期项目", "越南xxxxx改造三期项目", "印度xxxx水利施工二期项目", "越南xxxxx改造三期项目"]
    }, {
      key: 3,
      value: "非洲一部",
      proj: ["全部", "埃及水利施工二期项目", "南非改造三期项目"]
    }, {
      key: 5,
      value: "北美一部",
      proj: ["全部", "西雅图xxxx水利施工二期项目", "纽约xxxxx改造三期项目"]
    }, {
      key: 6,
      value: "欧洲一部",
      proj: ["全部", "英国xxxx水利施工二期项目", "法国xxxxx改造三期项目"]
    }],
    stateList: [{
      key: 1,
      value: "已整改",
      selected: false
    }, {
      key: 2,
      value: "未整改",
      selected: false
    }],
    timeChioceIcon: "../images/weixuanzheanniu@2x.png",
    projChioceIcon: "../images/weixuanzheanniu@2x.png",
    stateChioceIcon: "../images/weixuanzheanniu@2x.png",
    chioceTime: false,
    chioceProj: false,
    chioceState: false,
    activeProjParentIndex: -1,
    activeProjChildrenIndex: -1,
    activeTimeName: "时间",
    scrollTop: 0,
    scrollIntoView: 0,
    activeProjIndex: -1,
    activeProjName: "工程"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //顶部条件过滤栏js
    onPullDownRefresh: function () {
      this.setData({
        productList: [],
        pageIndex: 1,
        loadOver: false,
        isLoading: true
      })
      //this.getProductList();
      wx.stopPullDownRefresh()
    },
    onReachBottom: function () {
      if (!this.data.loadOver) {
        this.setData({
          pageIndex: this.data.pageIndex + 1,
          isLoading: true,
          loadOver: false
        })
        //this.getProductList();
      }
    },
    //条件选择
    choiceItem: function (e) {
      switch (e.currentTarget.dataset.item) {
        case "1":
          if (this.data.chioceTime) {
            this.setData({
              timeChioceIcon: "../images/weixuanzheanniu@2x.png",
              projChioceIcon: "../images/weixuanzheanniu@2x.png",
              stateChioceIcon: "../images/weixuanzheanniu@2x.png",
              chioceTime: false,
              chioceProj: false,
              chioceState: false,
            });
          } else {
            this.setData({
              timeChioceIcon: "../images/xuanzhonganniu@2x.png",
              projChioceIcon: "../images/weixuanzheanniu@2x.png",
              stateChioceIcon: "../images/weixuanzheanniu@2x.png",
              chioceTime: true,
              chioceProj: false,
              chioceState: false,
            });
          }
          break;
        case "2":
          if (this.data.chioceProj) {
            this.setData({
              timeChioceIcon: "../images/weixuanzheanniu@2x.png",
              projChioceIcon: "../images/weixuanzheanniu@2x.png",
              stateChioceIcon: "../images/weixuanzheanniu@2x.png",
              chioceTime: false,
              chioceProj: false,
              chioceState: false,
            });
          } else {
            this.setData({
              timeChioceIcon: "../images/weixuanzheanniu@2x.png",
              projChioceIcon: "../images/xuanzhonganniu@2x.png",
              stateChioceIcon: "../images/weixuanzheanniu@2x.png",
              chioceTime: false,
              chioceProj: true,
              chioceState: false,
            });
          }
          break;
        case "3":
          if (this.data.chioceState) {
            this.setData({
              timeChioceIcon: "../images/weixuanzheanniu@2x.png",
              projChioceIcon: "../images/weixuanzheanniu@2x.png",
              stateChioceIcon: "../images/weixuanzheanniu@2x.png",
              chioceTime: false,
              chioceProj: false,
              chioceState: false,
            });
          } else {
            this.setData({
              timeChioceIcon: "../images/weixuanzheanniu@2x.png",
              projChioceIcon: "../images/weixuanzheanniu@2x.png",
              stateChioceIcon: "../images/xuanzhonganniu@2x.png",
              chioceTime: false,
              chioceProj: false,
              chioceState: true,
            });
          }
          break;
      }
    },
    hideAllChioce: function () {
      this.setData({
        timeChioceIcon: "../images/weixuanzheanniu@2x.png",
        projChioceIcon: "../images/weixuanzheanniu@2x.png",
        stateChioceIcon: "../images/weixuanzheanniu@2x.png",
        chioceTime: false,
        chioceProj: false,
        chioceState: false,
      });
    },
    // 工程
    /*getTimeList: function () {
      var that = this;
      wx.request({
        url: app.globalData.hostUrl,
        data: {
          message: "20005",
          location_id: that.data.locationID,
          token: md5.hex_md5(app.globalData.token),
          device_source: app.globalData.deviceSource
        },
        success: function (resRequest) {
          if (resRequest.data.error_code == 0) {
            that.setData({
              timeList: resRequest.data.time_list
            })
          }
        }
      })
    },*/
    selectProjParent: function (e) {
      this.setData({
        activeProjParentIndex: e.currentTarget.dataset.index,
        activeProjName: this.data.projList[e.currentTarget.dataset.index].value,
        activeProjChildrenIndex: 0,
        scrollTop: 0,
        scrollIntoView: 0
      })
    },
    selectProjChildren: function (e) {
      var index = e.currentTarget.dataset.index;
      var parentIndex = this.data.activeProjParentIndex == -1 ? 0 : this.data.activeProjParentIndex;
      if (index == 0) {
        this.setData({
          activeProjName: this.data.projList[parentIndex].value
        })
      } else {
        this.setData({
          activeProjName: this.data.projList[parentIndex].proj[index]
        })
      }
      this.setData({
        timeChioceIcon: "../images/weixuanzheanniu@2x.png",
        chioceTime: false,
        activeProjChildrenIndex: index,
        productList: [],
        pageIndex: 1,
        loadOver: false,
        isLoading: true
      })
      //this.getProductList();
    },


    // 状态
    selectState: function (e) {
      var index = e.currentTarget.dataset.index;
      var _stateList = this.data.stateList;
      _stateList[index].selected = !_stateList[index].selected;
      this.setData({
        stateList: _stateList
      })
    },
    // 时间
    resetState: function () {
      this.setData({
        activeTimeName: "时间"
      })
    },
    stateButtonClick: function () {
      this.setData({
        activeTimeName: this.data.dateleft
      })
      //this.getProductList();
    },
    onShareAppMessage: function () {

    },

    // 时间选择器（左）
    bindDateLeft: function (e) {
      this.setData({
        dateleft: e.detail.value
      })
    },
    // 时间选择器（右）
    bindDateRight: function (e) {
      this.setData({
        dateright: e.detail.value
      })
    }
  }
})