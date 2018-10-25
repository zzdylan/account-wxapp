// pages/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    year:"",
    month:"",
    income:0,
    expend:0,
    accountData:[]
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var dateStr = e.detail.value;
    // 转换日期格式
    dateStr = dateStr.replace(/-/g, '/');
    // 创建日期对象
    var date = new Date(dateStr);
    this.setData({
      date: e.detail.value,
      year: date.getFullYear(),
      month: date.getMonth()+1
    })
  },
  addAccount:function(){
    wx.navigateTo({
      url: '/pages/addAccount/index'
    })
  },
  queryAccount:function(){
    const that = this;
    app.request('/account/index', {}, function (data, ret) {
      that.setData({
        income: data.income,
        expend: data.expend,
        accountData:data.data
      });
    }, function (data, ret) { });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();
    that.setData({
      year: nowYear,
      month:nowMonth+1,
      date: nowYear+"-"+nowMonth
    });
    this.queryAccount();
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
    const that = this;
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();
    that.setData({
      year: nowYear,
      month: nowMonth + 1,
      date: nowYear + "-" + nowMonth
    });
    this.queryAccount();
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