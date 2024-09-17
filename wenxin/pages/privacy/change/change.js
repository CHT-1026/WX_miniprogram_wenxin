// pages/privacy/change/change.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname :'',
  },

  onLoad() {
    const storedAvatarUrl = app.globalData.avatarUrl; 
    if (storedAvatarUrl) {
      this.setData({
        avatarUrl: storedAvatarUrl
      });
    } else {
      this.setData({
        avatarUrl: defaultAvatarUrl
      });
    }
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  nickname(e){
    this.setData({
      nickname:e.detail.value,
    })
  },
  
  update_data(e) {
    if (app.globalData.login_flag === true) {
      const collection = db.collection('user_log');
      const { avatarUrl, nickname } = this.data;
      const userId = app.globalData.user_id;
      
      console.log('更新的头像 URL:', avatarUrl); // 输出调试信息
      console.log('更新的昵称:', nickname); // 输出调试信息
      
      collection.doc(userId).update({
        data: {
          avatarUrl: avatarUrl,
          nickname: nickname,
        },
        success: res => {
          console.log('更新成功:', res);
        },
        fail: err => {
          console.error('更新失败:', err);
        }
      });
  
      app.globalData.avatarUrl = this.data.avatarUrl;
      app.globalData.nickname = this.data.nickname;
    } else {
      wx.showToast({
        title: '未登录状态，无法更改！',
        icon: 'none',
      });
    }
  }
})