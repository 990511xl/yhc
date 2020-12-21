// pages/home/home.js
import myfetch from "../../api/fetch"

let app = getApp();
//  console.log(app.api.baseUrl)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgarr:{},
    newestarr:[],
    youlikearr:[]
  },
  
  togoods(e){
    // console.log(e.currentTarget.dataset)
    let item = e.currentTarget.dataset
    wx.navigateTo({
      url: '../goods/goods?goods_id='+item.goodid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * http://47.105.96.139:8081/index.php?s=/api/index/page&wxapp_id=10001&token=8f7480921b1083b0df0554063b6d62b4
   */
  onLoad: function (options) {
    myfetch({url:app.api.baseUrl+"/index/page&wxapp_id=10001",method:"GET"}).then(res=>{
      // console.log(res.data.data.best);
      this.setData({
        imgarr:res.data.data.items.n606196612728596.data,
        newestarr:res.data.data.newest,
        youlikearr:res.data.data.best
      })
      // Api.fetch(111111111)
  }).catch(error=>{
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