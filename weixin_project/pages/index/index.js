var realData = {
  name: 'HaoTian',
  version: '1.0.0',
  maker : 'HaoTian'
}

// Register a Page.
var PageObject = {
  data: realData,
  changeName: function(e) {
    wx.showToast({
      title: 'current version is ' + this.data.version ,
      icon: 'none',  // 提示图标，可选值："success", "loading", "none"
      duration: 2000  // 提示显示时间（毫秒），默认值 1500
    });
  },
  onAddToFavorites(res) {
    // webview 页面返回 webViewUrl
    console.log('webViewUrl: ', res.webViewUrl)
    return {
      title: "HaoTian's World" ,
      imageUrl: '/img/DSC_3188.JPG',
      query: 'name=shoucang&age=1',
    }
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: "HaoTian's World"
        })
      }, 2000)
    })
    return {
      title: "HaoTian's World",
      path: '/pages/index',
      imageUrl:'/img/DSC_3188.JPG',
      promise 
    }
  },
  onShareTimeline(){
    return {
      title: "HaoTian's World" ,
      imageUrl: '/img/DSC_3188.JPG',
      query: 'name=shoucang&age=1',
    }
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  zuji_Click:function(){
    wx.navigateTo({
      url: '/pages/zuji/zuji',
    })
  },
  table_Click:function(){
    wx.navigateTo({
      url: '/pages/Time_table/Time_table',
    })
  },
  Plan_Click:function(){
    wx.navigateTo({
      url: '/pages/Plan/Plan',
    })
  }

}
Page(PageObject);

