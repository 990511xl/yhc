

//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null
  },
  // http://47.105.96.139:8081/index.php?s=/api/  index/page&wxapp_id=10001&token=8f7480921b1083b0df0554063b6d62b4
  api:{
    baseUrl:"http://47.105.96.139:8081/index.php?s=/api",
    city:'https://elm.cangdu.org/v1/cities',

  }
})