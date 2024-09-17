// pages/Plan/Plan.js
const db = wx.cloud.database();

Page({

  data: {
    plan_detail:"",
    plan_ddl:"",
    plan_dayuntil:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  //绑定输入框变化时触发
  onInputChange(event) {
    this.setData({
      plan_detail: event.detail.value
    });
  },
  Dateinput(event){
    this.setData({
      plan_ddl: event.detail.value
    });
  },
  update_database:function(){
    const plan_value = this.data.plan_detail;
    const plan_ddl = this.data.plan_ddl;
    const db = wx.cloud.database();
    db.collection('future_plan').add({
      data: {
        description: plan_value,
        due: new Date(plan_ddl),
        done: false
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: console.error,
      complete: console.log
    }
    )
  },
  stored_plan:function(){
    wx.navigateTo({
      url: '/pages/stored_plan/stored_plan',
    })
  }
})