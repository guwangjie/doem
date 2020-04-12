<template>
  <div class="title_bar">
    <slot class="title"></slot>
    <div class="tool_btn">
      <svg-icon iconClass="mini" class="icon" id="minimize" />
      <svg-icon
        :iconClass="max ? 'maxi_re' : 'maxi'"
        class="icon"
        id="maximize"
      />
      <svg-icon iconClass="close" class="icon" id="winclose" />
    </div>
    <div class="title_line"></div>
  </div>
</template>

<script>
const { remote } = require('electron')
export default {
  name: 'TitleBar',
  data() {
    return {
      max: false
    }
  },
  mounted() {
    const { ipcRenderer } = require('electron')
    let that = this
    // 关闭
    var close = document.getElementById('winclose')
    close.addEventListener('click', function() {
      ipcRenderer.send('win-close', '')
    })
    // 最大化
    var maximize = document.getElementById('maximize')
    maximize.addEventListener('click', function() {
      that.max = !that.max
      ipcRenderer.send('win-max', '')
    })
    // 最小化
    var minimize = document.getElementById('minimize')
    minimize.addEventListener('click', function() {
      ipcRenderer.send('win-min', '')
    })
  }
}
</script>

<style lang="less">
.title_bar {
  width: calc(100% - 10px);
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99999999;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  color: #ffffff;
  .tool_btn {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      -webkit-app-region: no-drag;
      font-size: 1em;
      height: 100%;
      font-weight: bold;
      padding: 0 16px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .title_line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    -webkit-app-region: no-drag;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    -webkit-app-region: no-drag;
  }
}
</style>
