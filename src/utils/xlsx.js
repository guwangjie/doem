/**
 * excel 插件
 */
import xlsx from 'xlsx'
import { Message } from 'element-ui'
const { ipcRenderer } = require('electron')

const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $xlsx: {
      get() {
        return {
          outputXlsxFile: function(data, header, xlsxName) {
            const ws = xlsx.utils.json_to_sheet(data, header)
            const wb = xlsx.utils.book_new()
            xlsx.utils.book_append_sheet(wb, ws, xlsxName)
            // xlsx.writeFile(wb, 'D://' + xlsxName + '.xlsx')
            ipcRenderer.send('saveDialog', {
              wb: wb,
              fileName: xlsxName + '.xlsx',
              fileType: 'excel'
            })
            // 接收主进程发送回来的下载成功回调
            ipcRenderer.once('succeedDialog', (event, arg) => {
              // 成功回调
              Message({
                showClose: false,
                message: '下载成功,保存路径为' + arg.path,
                type: 'success',
                duration: 2000
              })
            })
            ipcRenderer.once('errorDialog', (event, arg) => {
              // 成功回调
              Message({
                showClose: false,
                message: '保存出错,文件可能被占用',
                type: 'error',
                duration: 2000
              })
            })
          }
        }
      }
    }
  })
}

export default {
  install
}
