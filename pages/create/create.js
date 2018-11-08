//index.js
//获取应用实例
const app = getApp()
//var userName = 123
Page({
  data: {
    userName:678,
    password:''
  },
  useNameInput(e){
    this.setData({
      userName:e.detail
    })
      //console.log("Username: " + this.data.userName)
  },
  passwordInput(e){
    this.setData({
      password:e.detail
    })
    //console.log("Password: " + this.data.password)
  },
  onSubmit(e){
    console.log("Username: " + this.data.userName)
    console.log("Password: " + this.data.password)
  }
})
