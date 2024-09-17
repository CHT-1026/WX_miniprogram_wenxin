// pages/privacy/register/register.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    username: '',
    password: '',
    user_id:'',
  },
  onLoad(){
    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      nickname: app.globalData.nickname,
      username:'',
      password: '',
      user_id:app.globalData.user_id,
    })
  },
  user_name_input(e)
  {
    this.setData({
      username:e.detail.value
    })
  },
  user_password_input(e)
  {
    this.setData({
      password: e.detail.value
    })
  },
  async login() {
    const { username, password } = this.data
    try {
      const result = await wx.cloud.callFunction({
        name: 'user_login',
        data: {
          username: username,
          password: password
        }
      })
      const collection = db.collection('user_log');
      if (result.result.valid) {
        const { username } = this.data;
        collection.where({
          username: username
        }).get({
          success: res => {
            if (res.data.length > 0) {
              // 记录存在
              const userData = res.data[0];
              this.setData({
                user_id: userData._id || '', // 获取属性值，若不存在则设为空字符串
                avatarUrl:userData.avatarUrl|| '',
                nickname:userData.nickname|| '',
              });
              app.globalData.user_id = this.data.user_id;
              app.globalData.avatarUrl= this.data.avatarUrl;
              app.globalData.nickname= this.data.nickname;
              app.setLoginStatus(true);
            } else {
              console.log('未找到匹配的记录');
            }
          },
          fail: err => {
            console.error('查询失败:', err);
          }
        });

        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration:2000,
        }),
        setTimeout(() => {
          wx.switchTab({
              url: '/pages/privacy/privacy',
              success(res) {
                console.log('页面跳转成功:', res);
              },
              fail(err) {
                console.error('页面跳转失败:', err);
              }
          });
      }, 2000);
      } else {
        wx.showToast({
          title: '用户名或密码错误',
          icon: 'none'
        })
        // 处理用户名或密码错误的情况
      }
    } catch (err) {
      console.error('云函数调用失败', err)
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }
  },
  register(e){
    wx.navigateTo({
      url: '/pages/privacy/register/sign_up/sign_up',
    })
  }
})