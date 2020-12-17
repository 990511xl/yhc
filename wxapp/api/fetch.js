export default  function fetch(options){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: options.url,
      data:options.data,
      dataType:"json",
      method:options.method,
      responseType:'text',
      header:{"Content-Type":"application/x-www-form-urlencoded"},
      success:(res)=>{
          resolve(res)
      },
      fail:reject,
      complete:()=>{
          console.log("接口调用结束的回调函数（调用成功、失败都会执行")
      }
    })
  })
}