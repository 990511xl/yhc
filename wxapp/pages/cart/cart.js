// pages/cart/cart.js
import myfetch from "../../api/fetch"

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */

  data: {
    goodlist: [],
    goodsid:'',
    goodsnum:'',
    allmoney:0


  },
 
  requestfu() {
    wx.showLoading({
      title: '加载中',
    })
    let pp = wx.getStorageSync('token')
    myfetch({ url: app.api.baseUrl + "/cart/lists&wxapp_id=10001&token=" + pp, method: "GET" }).then(res => {
      wx.hideLoading()
      console.log(res);
      this.setData({
        goodlist: res.data.data.goods_list,
        allmoney:res.data.data.order_total_price
      })
      // total_num
    }).catch(error => {
      console.log("请求失败")
    })
  },


  handleChange1(e) {
    console.log(e)
    this.setData({
        goodsid:e.currentTarget.dataset.items.goods_id,
        goodsnum:e.currentTarget.dataset.items.total_num
      })
  },
  jia(){
    wx.showLoading({
      title: '加载中',
    })
      console.log("加法")
      myfetch({
        url: app.api.baseUrl + "/cart/add", data: {
          wxapp_id: 10001,
          token: wx.getStorageSync('token'),
          goods_id: this.data.goodsid,
          goods_num:1,
          goods_sku_id: ''
        }, method: "POST"
      }).then(res => {
        console.log(res);
        wx.hideLoading()
        this.requestfu()

      }).catch(error => {
        console.log("请求失败")
      })
     
  },
  jian(){
    wx.showLoading({
      title: '加载中',
    })
    console.log("减法")
    myfetch({
      url: app.api.baseUrl + "/cart/sub", data: {
        wxapp_id: 10001,
        token: wx.getStorageSync('token'),
        goods_id: this.data.goodsid,
   
        goods_sku_id: ''
      }, method: "POST"
    }).then(res => {
      console.log(res);
      wx.hideLoading()
      this.requestfu()
      
    }).catch(error => {
      console.log("请求失败")
    })

  
    
  },
  deleitem(e) {
    // http://47.105.96.139:8081/index.php?s=/api/cart/delete
//     wxapp_id: 10001
// token: c1b85e4b0cf1426a2eb28133807a35e7
// goods_id: 10012
// goods_sku_id: 
// items
myfetch({
  url: app.api.baseUrl + "/cart/sub", data: {
    wxapp_id: 10001,
    token: wx.getStorageSync('token'),
    goods_id: e.currentTarget.dataset.items.goods_id,

    goods_sku_id: ''
  }, method: "POST"
}).then(res => {
  console.log(res);

}).catch(error => {
  console.log("请求失败")
})

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestfu()

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
    this.requestfu()
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