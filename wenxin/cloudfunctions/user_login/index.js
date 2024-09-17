// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const { username, password } = event
  
  try {
    // 查询数据库
    const result = await db.collection('user_log').where({
      username: username,
      password: password
    }).get()

    // 如果找到匹配的记录，则返回验证通过
    if (result.data.length > 0) {
      return { valid: true }
    } else {
      return { valid: false }
    }
  } catch (err) {
    return { error: err }
  }
}