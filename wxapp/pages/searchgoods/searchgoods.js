// pages/searchgoods/searchgoods.js
import Myfetch from "../../api/fetch"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    histarr: [],
    inputval: ''
  },

  delet() {
    wx.removeStorage({
      key: 'hisarr',
    })
    this.setData({
      histarr: wx.getStorageSync('hisarr')
    })
  },
  itemclick(e) {
    console.log(e.currentTarget.dataset.curritem)
 
    wx.navigateTo({
      url: "../shoplist/shoplist?search="+e.currentTarget.dataset.curritem,
    })
  },
  searchbl() {
    if(this.data.inputval != "" && this.data.inputval != null){
      let uu = [...this.data.histarr, this.data.inputval]
      let items = [...new Set(uu)];
      this.setData({
        histarr: items
      })
      wx.setStorage({
        data: this.data.histarr,
        key: 'hisarr',
      })
      Myfetch({ url: app.api.baseUrl + "/goods/lists&wxapp_id=10001&token=366b987764cb870ad693c18606f91302&page=1&sortType=all&sortPrice=0&category_id=0&search=" + this.data.inputval, method: "GET" }).then(res => {
        // console.log(res.data.data.list);
        this.setData({
          sendmsg:res.data.data.list
        })
  
      }).catch(error => {
        console.log("请求失败")
      })
    } 
    this.setData({
      inputval:''
    })
  },
  getSearchContent(e) {
    // console.log(e)
    this.setData({
      inputval: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      histarr: wx.getStorageSync('hisarr')
    })
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