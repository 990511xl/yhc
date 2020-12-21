// pages/all/all.js
import Myfetch from "../../api/fetch";
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      leftarr:[],
      rightarr:[],
      index1:999
  },
  requestright(){
    Myfetch({url:app.api.baseUrl+"/category/index&wxapp_id=10001",method:"GET"}).then(res=>{
      console.log(res.data.data.categoryList,res.data.data.goodsList.data);
      this.setData({
        leftarr:res.data.data.categoryList,
        rightarr:res.data.data.goodsList.data
      })
 
  }).catch(error=>{
    console.log("请求失败")
  })
  },
  getcategory(e){
      console.log(e)
      let ff = parseInt(e.currentTarget.dataset.cateid)
      this.setData({
        index1:ff
      })
      console.log(this.data.index)
      if(e.currentTarget.dataset.cateid=='999'){
        this.requestright()
      }else{
        Myfetch({url:app.api.baseUrl+"/goods/lists&wxapp_id=10001&token=&page=1&category_id="+e.currentTarget.dataset.cateid,method:"GET"}).then(res=>{
          console.log(res.data.data.list.data);
          this.setData({
            rightarr:res.data.data.list.data
          })
      }).catch(error=>{
        console.log("请求失败")
      })
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // http://47.105.96.139:8081//index.php?s=/api/category/index&wxapp_id=10001&token= 
  onLoad: function (options) {
    this.requestright()
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