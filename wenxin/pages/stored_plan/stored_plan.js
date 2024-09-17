const db = wx.cloud.database();
function daysUntil(targetDate) {
  //当前时间
  const now = new Date();
  // 获取目标日期
  const target = new Date(targetDate);
  // 计算时间差（毫秒）
  const timeDiff = target - now;
  // 将时间差从毫秒转换为天数
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
}
Page({
  data: {
    tableData: [],
  },

  onLoad() {
    this.fetchTableData();
  },
  async fetchTableData() {
    try {
      // 从数据库中获取数据
      const res = await db.collection('future_plan').get();
      // 部分格式化取到的数据
      const formattedData = res.data.map(item => ({
        ...item,
        due: this.formatDate(new Date(item.due)),
        done:this.formatDone(item.done),
        days_until:daysUntil(item.due)
      }));
      this.setData({
        tableData: formattedData
      });
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  },
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  formatDone(done) {
    return done ? '已完成' : '未完成';
  }
});