// pages/Time_table/Time_table.js
Page({

  data: {
    date:'',
    time:'',
    plan:'cht'
  },

  onLoad(options) {

  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },
  bindTimeChange(e){
    this.setData({
      time: e.detail.value
    });
  },
  bindconfirm:function(e){
    this.setData({
      plan:e.detail.value
    })
  },
  button_store:function(e){
    //点击保存的时候，应该将data中的数据存储到后端
  },
  bindinput:function(e){
    this.setData({
      plan: e.detail.value
    });
    if (e.detail.value === 'cht') {
      // 触发彩蛋
      wx.showModal({
        title: '恭喜你！', 
        content: '你认为这个小程序好吗？', 
        showCancel: true, 
        cancelText: '不好', 
        cancelColor: '#000000', 
        confirmText: '好', 
        confirmColor: '#576B95', 
        success(res) {
          if (res.confirm) {
            console.log('用户点击了确定按钮');
            wx.showToast({
              title: '谢谢！', // 提示内容
              icon: 'success', 
              duration: 2000, 
              mask: false, 
              success(res) {
              },
              fail(err) {
                console.error('提示框展示失败：', err);
              }
            });
          } else if (res.cancel) {
            console.log('用户点击了取消按钮');
            wx.showToast({
              title: '我们会继续改善的！', // 提示内容
              icon: 'success', 
              duration: 2000, 
              mask: false, 
              success(res) {
              },
              fail(err) {
                console.error('提示框展示失败：', err);
              }
            });
          }
        },
        fail(err) {
          console.error('调用 wx.showModal 失败：', err);
        }
      });
    }
  },
  showplan:function(){
    wx.showToast({
      title: this.data.plan, // 提示内容
      icon: 'success', 
      duration: 2000, 
      mask: false, 
      success(res) {
      },
      fail(err) {
        console.error('提示框展示失败：', err);
      }
    });
  }


})