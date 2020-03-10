/**
 * @name randomStr
 * @desc 随机字符串
 * @param {Number} len - 字符串长度
 */
function randomStr(len = 16) {
  const string =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const l = string.length
  let str = ''
  for (let i = 0; i < len; i++) {
    const index = Math.floor((Math.random() * 100 * l) % l)
    str += string[index]
  }
  console.log(str)
  return str
}

module.exports = { randomStr }
