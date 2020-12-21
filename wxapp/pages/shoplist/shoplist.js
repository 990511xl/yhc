// pages/shoplist/shoplist.js

import myfetch from "../../api/fetch"

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischange:true,
    cuurrnum:0,
    currenitemarr:[],
    getmsg:'',
    updown:-1
  },
  changeposi(){
    let rr=!this.data.ischange
    this.setData({
      ischange:rr
    })
  },
  requestf(a,b){
    wx.showToast({
      title: '加载中',
      icon: 'success',
    })
    myfetch({ url: app.api.baseUrl + "/goods/lists&wxapp_id=10001&token=366b987764cb870ad693c18606f91302&page=1&sortType="+a+"&sortPrice="+b+"&category_id=0&search=" +this.data.getmsg,method:"GET"}).then(res=>{
      console.log( res.data.data.list.data);
      this.setData({
        currenitemarr:res.data.data.list.data
       })
       wx.hideToast();
  }).catch(error=>{
    console.log("请求失败")
  })
  },


  changecol(e){
    console.log(e.currentTarget.dataset.biao)
    this.setData({
      cuurrnum:e.currentTarget.dataset.biao
    })
    if(e.currentTarget.dataset.biao==0){
      this.requestf('all',0);
    }else if (e.currentTarget.dataset.biao==1){
      this.requestf('sales',0); 
    }else if(e.currentTarget.dataset.biao==2){
      this.requestf('price',0);
      this.setData({
        updown:0
      })
    }

  

  },
  upprice(){
    console.log(111111111111)
    this.requestf('price',0);
    this.setData({
      updown :0
    })
  },
  downprice(){
    console.log(22222222)
    this.requestf('price',1);
    this.setData({
      updown :1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getmsg:options.search
    })
    this.requestf('all',0);
    console.log(options)
  
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