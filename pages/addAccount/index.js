// pages/addAccount/index.js
import WxValidate from '../../assets/libs/wx-validate/WxValidate';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryType: 1,
    expendCategories: [],
    incomeCategories: [],
    categoryIndex:0,
    categories:[],
    date:'',
    radioItems:[
      {name:'支出',value:1,checked:true},
      {name:'收入',value:2}
    ]
  },
  initValidate:function(){
    // 验证字段的规则
    const rules = {
      money: {
        required: true
      },
      date: {
        required: true
      },
      categoryType: {
        required: true
      }
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      money: {
        required: '请输入金额'
      },
      categoryType: {
        required: '请选择类型'
      },
      date: {
        required: '请选择日期'
      }
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages);
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindCategoryChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      categoryIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;
    const day = nowDate.getDate(); 
    this.setData({
      date: nowYear + "-" + nowMonth + "-" + day
    })
    this.requestCategory();
  },
  radioChecked(e) {
    var radioItems = this.data.radioItems;
    var categoryType = e.detail.value;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems,
      categoryType: categoryType
    });
    this.requestCategory();
  },
  requestCategory: function () {
    const that = this;
    app.request('/category/index', { "type": that.data.categoryType }, function (data, ret) {
      switch (that.data.categoryType) {
        case 1:
          that.setData({
            expendCategories: data
          });
          break;
        case 2:
          that.setData({
            incomeCategories: data
          });
          break;
      }
      that.setData({
        categories: data
      });
      console.log(that.data.categories);
    }, function (data, ret) {
      //console.log(data);
    });
  },
  formSubmit(event){
    const json = event.detail.value;
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(json)) {
      const error = this.WxValidate.errorList[0];
      app.info(error.msg);
      return false;
    }
    json.categoryId = this.data.categories[json.categoryIndex].id;
    app.request('/account/save',json,function(data,ret){
      wx.switchTab({
        url: '/pages/detail/index',
        success: function (e) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        } 
      })
    },function(data,ret){});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})