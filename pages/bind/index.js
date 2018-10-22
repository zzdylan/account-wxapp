// pages/bind/bind.js
import WxValidate from '../../assets/libs/wx-validate/WxValidate';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    code: "",
    sendButton: "发送验证码",
    sendDisabled: false
  },
  // 调用验证方法，传入参数 e 是 form 表单组件中的数据
  submit: function() {
    const that = this;
    wx.login({
      success: function(res) {
        const params = {
          mobile: that.data.mobile,
          sms_code: that.data.code,
          code: res.code,
          user_info: JSON.stringify(getApp().globalData.userInfo),
        };
        // 传入表单数据，调用验证方法
        if (!that.WxValidate.checkForm(params)) {
          console.log(that.WxValidate.errorList);
          const error = that.WxValidate.errorList[0];
          app.info(error.msg);
          return false;
        }
        app.request('/user/bind', params, function (data, ret) {
          app.success(ret.msg);
        }, function (data, ret) {
          app.error(ret.msg);
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate();
  },
  initValidate: function() {
    // 验证字段的规则
    const rules = {
      mobile: {
        required: true,
        tel: true,
      },
      sms_code: {
        required: true
      },
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      mobile: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
      },
      sms_code: {
        required: '请输入验证码'
      },
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages);
  },
  countDown: function(count) {
    if (typeof(this.data.sendButton) == 'number') {
      if (this.data.sendButton == 0) {
        this.setData({
          sendButton: '发送验证码',
          sendDisabled: false
        });
        clearInterval(count);
        return;
      }
      this.setData({
        sendButton: this.data.sendButton - 1
      });
    } else {
      this.setData({
        sendButton: 10
      });
    }
  },
  sendCode: function() {
    // 验证字段的规则
    const rules = {
      mobile: {
        required: true,
        tel: true,
      }
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      mobile: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
    const params = {
      mobile: this.data.mobile
    };
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      console.log(this.WxValidate.errorList);
      const error = this.WxValidate.errorList[0];
      app.info(error.msg);
      return false;
    }
    this.setData({
      sendDisabled: true
    });
    const that = this;
    app.request('/../../../../api/sms/send', {
      mobile: this.data.mobile,
      event: 'bind'
    }, function(data, ret) {
      app.success(ret.msg);
      const count = setInterval(function() {
        that.countDown(count);
      }, 1000);
    }, function(data, ret) {
      app.error(ret.msg);
    });
  },
  mobileInput: function(event) {
    this.setData({
      mobile: event.detail
    })
  },
  codeInput: function(event) {
    this.setData({
      code: event.detail
    })
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