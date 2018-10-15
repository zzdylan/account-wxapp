// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    year:"",
    month:"",
    income:100,
    expend:100
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
    this.setData({
      year: nowYear,
      month:nowMonth+1,
      date: nowYear+"-"+nowMonth
    })
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