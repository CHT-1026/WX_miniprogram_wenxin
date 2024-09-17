// app.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const defaultnickname = '登录/注册'
App({
  //全局变量管理
  globalData: {
    login_flag:false,
    avatarUrl: defaultAvatarUrl,
    nickname:defaultnickname,
    user_id:'',
  },
  onLaunch: function () {
    this.resetGlobalData();
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'wenxin1-2grnly1220b7e3a4',
        traceUser: true,
      });
    }
    this.globalData = {};
  },
  resetGlobalData: function () {
    this.globalData.login_flag = false;
    this.globalData.avatarUrl = defaultAvatarUrl;
    this.globalData.nickname = defaultnickname;
    this.globalData.user_id = '';
  },
  onUnload: function () {
    const app = getApp();
    app.globalData.login_flag = false;
  },
  setLoginStatus: function (status) {
    this.globalData.login_flag = status;
  },
  getLoginStatus: function () {
    return this.globalData.login_flag;
  }
})
