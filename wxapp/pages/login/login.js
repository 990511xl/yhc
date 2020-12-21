// pages/login/login.js
import Myfetch from "../../api/fetch";
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineInfo: ''
  },
  onNotLogin() {
    wx.navigateBack({
      delta: 1
    })

  },
  getUserInfo11: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    wx.login({
      success: res => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        fetch({
          url: api + 'user/login',
          method: "POST",
          data: {
            wxapp_id: 10001,
            code: res.code,
            user_info: e.detail.rawData,
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv,
            signature: e.detail.signature
          },
        }).then(data => {
          console.log(data);
          wx.setStorage({
            data: data.data.data.token,
            key: 'token',
          })
          wx.setStorage({
            data: data.data.data.user_id,
            key: 'user_id',
          })
          fetch({
            url: api + 'user.index/detail&wxapp_id=10001&token=' + data.data.data.token,
          }).then(data => {
            console.log(data);
            this.setData({
              mineInfo: data.data.data.userInfo,
            })
          })
        })
      }
    })
  },
  // http://47.105.96.139:8081/index.php?s=/api/user.index/detail&wxapp_id=10001&token=fc371b157aa57f885e6b3a295d432825
  getUserInfo(e) {
    console.log(e)
    if (e.detail.errMsg == 'getUserInfo:ok') {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.useratate = true;

      wx.login({
        success: res => {
          // console.log(res)
          Myfetch({
            url: app.api.baseUrl + "/user/login",
            method: "POST",
            data: {
              wxapp_id: 10001,
              code: res.code,
              user_info: e.detail.rawData,
              encrypted_data: e.detail.encryptedData,
              iv: e.detail.iv,
              signature: e.detail.signature
            },
          }).then(res => {
            console.log(res);
            wx.setStorageSync('token', res.data.data.token)
            wx.setStorageSync('user_id', res.data.data.user_id)
            

            Myfetch({
              url: app.api.baseUrl + "/user.index/detail&wxapp_id=10001&token=" + res.data.data.token,
              method: "GET",
            }).then(res => {
              console.log(res);
              this.setData({
                mineInfo: res.data.data.userInfo,
              })
              wx.navigateBack({
                delta: 1
              })
            }).catch(error => {
              console.log("请求失败")
            })

          }).catch(error => {
            console.log("请求失败")
          })
        }
      })

    }
   
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