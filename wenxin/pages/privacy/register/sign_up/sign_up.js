// pages/privacy/register/sign_up/sign_up.js
const db = wx.cloud.database();
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    sign_user_name:'',
    password:'',
    repead_password:'',

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
  user_password_input_repead(e)
  {
    this.setData({
      repead_password: e.detail.value
    })
  },
  async register() {
    const { username, password, repead_password } = this.data;
    
    try {
      // 调用云函数检查用户是否存在
      const result = await wx.cloud.callFunction({
        name: 'checkUserExist',
        data: {
          username: username
        }
      });
      
      if (result.result.exists) {
        wx.showToast({
          title: '用户已存在，请重新创建！',
          icon: 'none'
        });
        return; // 用户已存在，终止后续操作
      }
  
      // 检查密码是否一致
      if (password === repead_password) {
        const db = wx.cloud.database(); // 获取数据库实例
        
        // 添加新用户
        db.collection('user_log').add({
          data: {
            username: username,
            password: password,
            nickname:username,
            avatarUrl:defaultAvatarUrl,
            
          },
          success: function(res) {
            console.log('用户注册成功:', res);
            wx.showToast({
              title: '注册成功!',
              icon: 'success',
              duration:2000
            });
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/privacy/change/change',
                success(res) {
                  console.log('页面跳转成功:', res);
                },
                fail(err) {
                  console.error('页面跳转失败:', err);
                }
              });
            }, 2000);// 与提示框的显示时间一致，确保提示框在跳转之前显示完成
          },
          fail: function(err) {
            console.error('用户注册失败:', err);
            wx.showToast({
              title: '注册失败',
              icon: 'error'
            });
          }
        });
      } else {
        wx.showToast({
          title: '两次输入密码不一致！',
          icon: 'none',
        });
      }
    } catch (err) {
      console.error('云函数调用失败:', err);
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      });
    }
  }
})