const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  try {
    // 从请求中获取用户名
    const { username } = event
    // 查询数据库
    const result = await db.collection('user_log').where({
      username: username
    }).get()
    // 如果有匹配的记录，返回 true
    if (result.data.length > 0) {
      //将数据库中保存的数据全部赋值下来
      return { exists: true }
    } else {
      return { exists: false }
    }
  } catch (err) {
    return { error: err }
  }
}