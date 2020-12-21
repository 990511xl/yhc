// pages/goods/goods.js
import myfetch from "../../api/fetch"

let app = getApp();
console.log(app.api.baseUrl)


Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailobj: {},
    swiperCurrent: 1,
    value1: 1,
    isshow: true,
    backding: false,
    scrollTop: 0,
    show: false,
    objid: '',
    goucount: 0

  },
  showinfo() {
    let ss = this.data.isshow
    this.setData({
      isshow: !ss
    })
  },
  scroll(e) {
    // console.log(e.detail.scrollTop)
    this.setData({
      backding: e.detail.scrollTop > 500 ? true : false
    })
    // console.log(this.data.backding)
  },
  backf() {
    this.setData({
      scrollTop: 0
    })
  },
  swiperChange(e) {
    let num = 1 + parseInt(e.detail.current)
    // console.log(e.detail.current )
    this.setData({
      swiperCurrent: num  //获取当前轮播图片的下标
    })
  },
  handleChange1({ detail }) {
    this.setData({
      value1: detail.value
    })
  },
  tocart() {
    wx.switchTab({
      url: '../cart/cart'
    })
  
  },

  addcartf() {
   

    this.setData({
      goucount: this.data.goucount + this.data.value1
    })
    console.log(this.data.goucount)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
    })
    myfetch({
      url: app.api.baseUrl + "/cart/add", data: {
        wxapp_id: 10001,
        token: wx.getStorageSync('token'),
        goods_id: this.data.objid,
        goods_num: this.data.value1,
        goods_sku_id: '',
      }, method: "POST"
    }).then(res => {
      wx.hideToast();
      console.log(res);

    }).catch(error => {
      console.log("请求失败")
    })





  },
  dian() {
    let ss = !this.data.show
    this.setData({
      show: ss
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id)
    //http://47.105.96.139:8081//index.php?s=/api/goods/detail&wxapp_id=10001&token=&goods_id=10012
    this.setData({
      objid: options.goods_id
    })
    myfetch({ url: app.api.baseUrl + "/goods/detail&wxapp_id=10001&token=&goods_id=" + options.goods_id, method: "GET" }).then(res => {
      console.log(res.data.data.detail);
      this.setData({
        detailobj: res.data.data.detail,
      })
    }).catch(error => {
      console.log("请求失败")
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