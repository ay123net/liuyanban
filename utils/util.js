const hostURL = 'https://zsss.ay123.net/';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const wxGetDatas = obj => {
  wx.request({
    url: hostURL + 't.php', 
    data: obj,
    header: {
      'content-type': 'application/jsonl' // GET方式请求
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
}



module.exports = {
  formatTime: formatTime
}
