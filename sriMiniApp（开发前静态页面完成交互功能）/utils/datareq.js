var app = getApp();
function datapost(url, data, callback, callbackfail) {
  wx.request({
    url: app.userService + url,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    data: data,
    success: function(res) {
      callback(res.data);
    },
    fail : function(res) {
      if (callbackfail != null) {
        callbackfail();
      }
    }
  })
}

function dataget(url,data,callback,callbackfail){
  wx.request({
    url: 'http://localhost:8080/demo/mini/list',
    header: {
      "Content-Type": "application/json"
    },
    data: data,
    success: function (res) {
      callback(res.data);
    },
    fail : function(res){
      if(callbackfail != null){
        callbackfail();
      }
    }
  })
}
module.exports = {
  datapost : datapost,
  dataget : dataget
}