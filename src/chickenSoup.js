// prettier-ignore
const list = [
  '小心点，你老板在你背后',
  '工作再累，也别忘了摸鱼哦，钱是老板的，命是自己的',
  '我毕生的梦想，就是可以准点下班',
  '你上会班吧，我替你老板求求你了',
  '别划水了，上岸换口气吧',
  '愿你的烦恼，像你的头发一样，越来越少',
]
//随机返回一条鸡汤
export const getChickenSoup = () => {
  let msg = list[Math.floor(Math.random() * list.length)]
  return msg
}
