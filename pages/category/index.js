// pages/category/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryType:1,
    expendCategories:[],
    incomeCategories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestCategory();
  },
  tabSelected(event){
    const categoryType = event.detail.index + 1;
    this.setData({
      categoryType: categoryType
    });
    this.requestCategory();
  },
  requestCategory:function(){
    const that = this;
    app.request('/category/index', { "type": that.data.categoryType }, function (data, ret) {
      switch (that.data.categoryType){
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
      
    }, function (data, ret) {
      //console.log(data);
    });
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