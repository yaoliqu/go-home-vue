/**
 * 根据传入的字符串获取小时和分钟
 * @param {String} time  //'05:40'
 * @returns {Array}  [hour,minute]  // [ 5, 40 ]
 */
export const getHourAndMinute = time => {
  const tmpArr = time.split(':')
  if (tmpArr.length !== 2) return [null, null]
  return [parseInt(tmpArr[0]), parseInt(tmpArr[1])]
}
