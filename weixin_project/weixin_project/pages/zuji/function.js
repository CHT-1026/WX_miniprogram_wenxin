// 新增一个指定的标记并存储到本地
function storeMarkers(id, latitude, longitude, title) {
  const zu_map = wx.createMapContext('zuji-map', this);
  // 添加标记到地图
  zu_map.addMarkers({
    markers: [{
      id: id,
      latitude: latitude,
      longitude: longitude,
      title: title,
      width: 30,
      height: 30
    }],
    success: function (res) {
      console.log('添加标记点成功', res);
    },
    fail: function (err) {
      console.error('添加标记点失败', err);
    }
  });

  // 获取已经存储的数据
  wx.getStorage({
    key: 'MarkersTable',
    success: function(res) {
      const data = res.data || []; 
      // 添加新的数据条目
      data.push({ id: id, latitude: latitude, longitude: longitude, title: title });
      // 保存更新后的数据到本地存储
      wx.setStorage({
        key: 'MarkersTable',
        data: data,
        success: function() {
          console.log('成功保存数据条目到本地存储');
        },
        fail: function(err) {
          console.error('保存数据条目到本地存储失败', err);
        }
      });
    },
    fail: function(err) {
      console.error('从本地存储获取数据表格失败', err);
    }
  });
}

// 从本地存储加载所有标记并添加到地图
function loadMarkers() {
  const zu_map = wx.createMapContext('zuji-map', this);
  wx.getStorage({
    key: 'MarkersTable',
    success: function(res) {
      const markers = res.data || []; 
      markers.forEach(function(marker) {
        zu_map.addMarkers({
          markers: [{
            id: marker.id,
            latitude: marker.latitude,
            longitude: marker.longitude,
            title: marker.title,
            width: 30,
            height: 30
          }],
          success: function (res) {
            console.log('添加标记点成功', res);
          },
          fail: function (err) {
            console.error('添加标记点失败', err);
          }
        });
      });
    },
    fail: function(err) {
      console.error('从本地存储获取数据表格失败', err);
    }
  });
}

function clear_markers() {
  let id_array = [];
  wx.getStorage({
    key: 'MarkersTable',
    success: function(res) {
      const markers = res.data || []; 
      markers.forEach(function(marker) {
        id_array.push(marker.id);
      });

      // 在获取到数据后执行删除操作
      wx.removeStorage({
        key: 'MarkersTable',
        success: function(res) {
          console.log("成功移除列表");
          // 在成功移除后再删除地图上的标记
          const zu_map = wx.createMapContext('zuji-map');
          zu_map.removeMarkers({
            markerIds: id_array,
            success: function(res) {
              console.log('成功移除地图上的标记', res);
              wx.setStorage({
                key: 'MarkersTable',
                data: []
              });
            },
            fail: function(err) {
              console.error('移除地图上的标记失败', err);
            }
          });
        },
        fail: function(res) {
          console.log("移除列表失败", res);
        }
      });
    },
    fail: function(err) {
      console.error('从本地存储获取数据表格失败', err);
    }
  });
}

// 导出函数
module.exports = {
  storeMarkers: storeMarkers,
  loadMarkers: loadMarkers,
  clear_markers:clear_markers
};
 