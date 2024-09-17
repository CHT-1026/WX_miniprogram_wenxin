// pages/privacy.js
/* 默认头像图标显示 */
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const defaultnickname = '登录/注册'
//获取全局变量
const app = getApp();
Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: defaultnickname,
  },
  onShow() {
    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      nickname: app.globalData.nickname,
    }); 
},
  register_page(e){
    wx.navigateTo({
      url: '/pages/privacy/register/register',
    })
  },

  change_imf(e){
    wx.navigateTo({
      url: '/pages/privacy/change/change',
    })
  },
  about(e){
    wx.navigateTo({
      url: '/pages/privacy/about/about',
    })
  }

})