'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
const autoUpdater = require('electron-updater').autoUpdater //引入 autoUpdater
import xlsx from 'xlsx' //引入xlsx

import {
  createProtocol
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 600,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    },
    // eslint-disable-next-line no-undef
    icon: `${__static}/app.ico`
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
  autoUpdater.setFeedURL('http://192.168.0.105/download/') //设置检测更新地址（参数为 软件所在位置）
  autoUpdater.checkForUpdates()
  autoUpdater.on('update-available', (ev, info) => { })
  autoUpdater.on('update-downloaded', function () {
    dialog.showMessageBox(
      {
        type: 'info',
        title: '提示',
        message: '有新版本已经下载完毕，是否立即安装？',
        buttons: ['ok', 'cancel']
      },
      index => {
        if (index == 0) {
          //下载完成后执行 quitAndInstall
          autoUpdater.quitAndInstall() //关闭软件并安装新版本
        } else {
          //关闭应用程序时安装
        }
      }
    )
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow()
})

ipcMain.on('win-close', (event, arg) => {
  BrowserWindow.getFocusedWindow().close()
})

ipcMain.on('win-max', (event, arg) => {
  var win = BrowserWindow.getFocusedWindow()
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
})

ipcMain.on('win-min', (event, arg) => {
  BrowserWindow.getFocusedWindow().minimize()
})

/**
 * 保存文件对话框
 */
ipcMain.on('saveDialog', (event, arg) => {
  let o = dialog.showSaveDialog(
    win,
    {
      // 在 Windows 和 Linux 上, 打开对话框不能同时是文件选择器和目录选择器, 因此如果在这些平台上将 properties 设置为["openFile"、"openDirectory"], 则将显示为目录选择器。
      properties: ['openFile', 'openDirectory'],
      // 默认情况下使用的绝对目录路径、绝对文件路径、文件名
      defaultPath: arg.fileName
      // 点击保存回调
    },
    filePath => {
      if (arg.fileType == 'excel') {
        //保存文件类型是excel
        try {
          xlsx.writeFile(arg.wb, filePath)
          win.webContents.send('succeedDialog', { path: filePath })
        } catch (e) {
          win.webContents.send('errorDialog')
        }
      }
    }
  )
})

// 绑定打开对话框事件

ipcMain.on('open-directory-dialog', function (event, arg) {
  dialog
    .showOpenDialog(win, {
      properties: arg.properties,
      filters: arg.filters
    })
    .then(res => {
      if (!res.canceled) {
        // 如果有选中
        // 发送选择的对象给子进程
        event.sender.send('selectedItem', { filePaths: res.filePaths })
      }
    })
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
