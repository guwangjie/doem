<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger :toggle-click="toggleSideBar"
               :is-active="sidebar.opened"
               class="hamburger-container" />
    <breadcrumb />
    <div class="message-container">消息</div>
    <el-dropdown class="theme-container"
                 trigger="click">
      <div class="theme-wrapper">
        换肤
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown"
                        class="theme-dropdown">
        <el-dropdown-item @click.native="changeTheme(1)">
          <span style="display:block;">皮肤1</span>
        </el-dropdown-item>
        <el-dropdown-item divided
                          @click.native="changeTheme(2)">
          <span style="display:block;">皮肤2</span>
        </el-dropdown-item>
        <el-dropdown-item divided
                          @click.native="changeTheme(3)">
          <span style="display:block;">皮肤3</span>
        </el-dropdown-item>
        <el-dropdown-item divided
                          @click.native="changeTheme(4)">
          <span style="display:block;">皮肤4</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="avatar-container"
                 trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar + '?imageView2/1/w/80/h/80'"
             class="user-avatar" />
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown"
                        class="user-dropdown">
        <router-link class="inlineBlock"
                     to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided
                          @click.native="clear">
          <span style="display:block;">清除缓存</span>
        </el-dropdown-item>
        <el-dropdown-item divided
                          @click.native="logout">
          <span style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { setTheme } from '@/utils/setting'
const { remote } = require('electron')
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  mounted() {
    this.initWebSocket()
  },
  methods: {
    /**
     * 获取所有推送信息
     */
    initWebSocket: function() {
      this.websocket = new WebSocket('wss://lyqq.cn-lianyi.com:8282')
      this.websocket.onopen = function(evt) {
        // console.log('onconnect Message: ' + evt.data)
      }
      this.websocket.onclose = function(evt) {}
      let that = this
      this.websocket.onmessage = function(evt) {
        // console.log('Received Message: ' + evt.data)
        if (typeof evt.data == 'string') {
          try {
            JSON.parse(evt.data)
          } catch (e) {
            that.$message({
              message: evt.data,
              type: 'success',
              onClose: function() {}
            })
            new Notification('收到一条新的推送信息', { body: evt.data })
          }
        }
      }
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        let win = remote.getCurrentWindow()
        win.setSize(600, 800)
        remote.getCurrentWindow().center()
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    changeTheme: function(type) {
      document.body.className = 'theme' + type
      setTheme(type)
    },
    clear: function() {
      localStorage.clear()
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .message-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 150px;
    margin-top: 5px;
    font-size: 14px;
    color: @h2c;
  }
  .theme-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 100px;
    .theme-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
