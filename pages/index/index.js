//index.js
//获取应用实例
import Toast from "../../dist/toast/toast";
const util = require('../../utils/util.js')
var msg = {duration:1000,message:'登录成功！'};
const app = getApp()
//var userName = 123
Page({
  data: {
    zanImg:"../../image/zan1.png",
    textareaDefault:'',
    userInfo: {},
    msgList: [],     // [{userName:'', createTime:'', message:'', good:{}, views:'', comments:''}]
  },

  onLoad: function () {
    var self = this
    var data = [];
    wx.request({
      url: 'https://zsss.ay123.net/t.php', //仅为示例，并非真实的接口地址
      data: {
        flag: 'r',
      },
      header: {
        'content-type': 'application/jsonl' // 默认值
      },
      success(res) {
        data = res.data 
        console.log(res.data)

        self.setData({
          msgList: data,
          //userName: app.globelData.nickName
        })
        //var v = JSON.parse(res.data)
        //console.log(res.data.userName)

      },
      fail: function () {
        wx.showToast({
          title: '服务器网络错误!',
          icon: 'loading',
          duration: 1500
        })
      }
    })
    //var data = wx.getStorageSync('msgKey') || []

    this.setData({
      msgList: data,
      //userName: app.globelData.nickName
    })

    if (app.globelData && app.globelData != '') {
      this.setData({
        //userName: app.globelData.userInfo.nickName
      })
      console.log(app.globelData)
    } else {
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo
        })

      }
    }
  }
  ,
  // 处理用户表单提交事件
  onInputSubmit:function(e){
    var obj = {};
    obj.msgString = e.detail.value.textarea;
    obj.msgdate = util.formatTime(new Date());
    obj.nickName = this.data.userInfo.nickName;
    obj.avatarUrl = this.data.userInfo.avatarUrl;
    obj.zanImg = this.data.zanImg;
    obj.isZan = 0;
    obj.zanNum = 0;





    if (obj.msgString == 'clear'){
      wx.clearStorageSync()
      this.setData({
        msgList: '',           // 更新前台数据
        textareaDefault:''
      })
      this.onLoad()
      return
    }

    var _msgList = this.data.msgList;

    _msgList.splice(0, 0, obj)     // 往数组开头插入一条数据

    this.setData({
      msgList: _msgList,           // 更新前台数据
      textareaDefault: ''
    })
    wx.setStorageSync('msgKey', _msgList)

    wx.request({
      url: 'https://zsss.ay123.net/t.php', //仅为示例，并非真实的接口地址
      data: {
        flag:'w',
        userInfo: _msgList
      },
      header: {
        'content-type': 'application/jsonl;charset=utf-8' // 默认值
      },
      success(res) {
        console.log(res.data)
        //var v = JSON.parse(res.data)
        //console.log(res.data.userName)

      },
      fail: function () {
        wx.showToast({
          title: '服务器网络错误!',
          icon: 'loading',
          duration: 1500
        })
      }
    })




  },
  // 点赞处理
  onZanPress:function(e){
    if (!this.data.msgList[e.currentTarget.id].isZan){
      this.data.msgList[e.currentTarget.id].zanImg = "../../image/zan2.png"
        this.data.msgList[e.currentTarget.id].isZan = 1
    }
    else{
      this.data.msgList[e.currentTarget.id].zanImg = "../../image/zan1.png"
      this.data.msgList[e.currentTarget.id].isZan = 0
    }
    var temp = this.data.msgList;

    this.setData({
      msgList:temp
    })
    console.log(e.currentTarget.id)
    console.log(this.data.msgList[e.currentTarget.id].msgString)
    console.log(this.data.msgList[e.currentTarget.id].zanImg)
  },

  // 下拉刷新
  onPullDownRefresh:function(){
      wx.stopPullDownRefresh();
  },
  agreeGetUser: function (e) {
    this.data.userInfo = e.detail.userInfo;
    this.onLoad();
    this.setData({
      userInfo: e.detail.userInfo
    })
  },

})
