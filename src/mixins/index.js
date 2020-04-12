/**
 * Created by 86431 on 2018/5/29 0029.
 */
let PUBLIC = {
  data() {
    return {}
  },
  methods: {
    /**
     * 转换成h:i:s 时间格式
     * @param {new Date()} date
     */
    transformToDate(date) {
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let minute = date.getMinutes()
      let second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return h + ':' + minute + ':' + second
    },

    /**
     * 替换指定开始到结束的字符串
     * @param {原始字符串}} text
     * @param {开始位置} start
     * @param {结束位置} stop
     * @param {替换的字符串} replacetext
     */
    replacepos(text, start, stop, replacetext) {
      let mystr = text.substring(0, start) + replacetext + text.substring(stop)
      return mystr
    }
  }
}
export { PUBLIC }
