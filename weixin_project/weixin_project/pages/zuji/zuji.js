var suffinent = require('function.js');
Page(
  {
    
  onShareAppMessage() {
    return {
      title: 'cover-view',
      path: 'page/component/pages/cover-view/cover-view'
       
    }
  },

  onLoad:function(options){
    // 检查 MarkersTable 是否存在于本地存储中，否则设置初始化数据
    wx.getStorage({
      key: 'MarkersTable',
      success: function(res) {
        if (res.data) {
          console.log('获取本地存储数据成功');
        } else {
          // 初始化 MarkersTable 数据为空数组
          wx.setStorage({
            key: 'MarkersTable',
            data: []
          });
          console.log('初始化 MarkersTable 数据为空数组');
        }
      },
      fail: function(err) {
        console.error('从本地存储获取数据失败', err);
        // 如果获取失败，也可以考虑重新设置初始数据
        wx.setStorage({
          key: 'MarkersTable',
          data: []
        });
      }
    });
    suffinent.loadMarkers();
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
    markers_num:0,
    
    
  }, 
  test_function: function() {
    const that = this;
    const marker_im = that.data.location;
    const markers_num = that.data.markers_num;

    suffinent.storeMarkers(markers_num, marker_im.latitude, marker_im.longitude, marker_im.name);
    suffinent.loadMarkers();
    this.setData(
      {markers_num:markers_num+1}
    )
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
  },
  clear_markers:function () {
    suffinent.clear_markers();
    this.setData({
      markers_num:0
    })
  }
})