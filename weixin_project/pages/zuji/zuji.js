Page({
  onShareAppMessage() {
    return {
      title: 'cover-view',
      path: 'page/component/pages/cover-view/cover-view'
      
    }
  },
  //页面加载时获取地图实例
  onLoad:function(options){
    const zu_map = wx.createMapContext('zuji-map', this);
  },

  data: {
    latitude: 30.749125,
    longitude: 103.931633,
    location: {
      name: '', // 初始化为空
      address: '',
      longitude: 0,
      latitude: 0
    },
    markers: [],
    markers_num:0
    
  },
  test_function:function(){
    const zu_map = wx.createMapContext('zuji-map', this);
    const that = this;
    const {name,address,longitude,latitude} = that.data.location;
    const markers_num = that.data.markers_num;
    zu_map.addMarkers({
      markers: [{
        id: markers_num,
        latitude: latitude,
        longitude: longitude,
        title: name,
        width: 30,
        height: 30
      }],
      success: function (res) {
        
        that.setData({
            markers_num:markers_num+1
        });
        console.log('添加标记点成功', res);
        console.log(that.data.markers_num);
      },
      fail: function (err) {
        console.error('添加标记点失败', err);
      }
    });
  },
  chooseLocation: function () {
    const that = this;
    const zuMap = wx.createMapContext('zuji-map', this);

    wx.chooseLocation({
      success: (res) => {
        console.log(res);

        // 更新页面数据
        that.setData({
          location: {
            name: res.name,
            address: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          }
        });

      },
      fail: (err) => {
        console.error("选择位置失败", err);
      }
    });
  }
})