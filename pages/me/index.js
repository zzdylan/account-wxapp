// pages/me/me.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showAuth: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.login({
    //   success:function(res){
    //     console.log(res);
    //   }
    // });

    //app.login()
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res)
    //         }
    //       })
    //     }
    //   }
    // })
  },
  bindGetUserInfo(e) {
    const that = this;
    getApp().globalData.userInfo = e.detail.userInfo;
    console.log(e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo,
      showAuth: false
    });
    wx.login({
      success: function(loginRes) {
        app.request('/user/login', {
          code: loginRes.code
        }, function(data, ret) {
          app.info(ret.msg);
        }, function(data, ret) {
          app.info(ret.msg);
        });
      }
    });
  },
  bindAccount: function() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权,跳转到绑定页
          wx.navigateTo({
            url: '/pages/bind/index'
          })
        } else {
          app.info('请先登录');
        }
      }
    })
  },
  checkBind: function() {
    const that = this;
    wx.login({
      success: function(res) {
        app.request('/user/checkBind', {
          code: res.code
        }, function(data, ret) {
          if (ret.isBind) {
            that.setData({
              bindTag: '已绑定'
            });
          } else {
            that.setData({
              bindTag: '未绑定'
            });
          }
        }, function(data, ret) {});
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})