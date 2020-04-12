<template>
  <div class="login">
    <div class="login_bg"></div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login_form"
      auto-complete="on"
      label-position="left"
    >
      <h3>用户登录</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" class="icon" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" class="icon" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="remenber" class="check_item"
          >记住密码</el-checkbox
        >
        <el-checkbox v-model="auto_login" class="check_item"
          >自动登录</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  getUserAccount,
  setUserAccount,
  removeUserAccount,
  getAutoLogin,
  setAutoLogin,
  removeAutoLogin
} from '@/utils/login'
import { getTheme } from '@/utils/setting'
const { remote } = require('electron')
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      remenber: false,
      auto_login: false
    }
  },
  mounted() {
    //设置主题
    if (getTheme()) document.body.className = 'theme' + getTheme()
    //记住密码
    let user_account = getUserAccount()
    if (user_account) {
      this.loginForm.username = user_account.username
      this.loginForm.password = user_account.password
      this.remenber = true
    }
    if (getAutoLogin()) {
      this.auto_login = true
      this.$message({
        showClose: true,
        message: '自动登录中...',
        type: 'success',
        duration: 2000
      })
      setTimeout(() => {
        this.handleLogin()
      }, 2000)
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.remenber) {
            setUserAccount(this.loginForm)
          } else {
            removeUserAccount()
          }
          if (this.auto_login) {
            setAutoLogin(true)
          } else {
            removeAutoLogin()
          }

          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              let notification = new Notification('联易全保工作台', {
                body: '联易全保工作台欢迎你!'
              })
              remote.getCurrentWindow().maximize()
              this.loading = false
              this.$router.push(
                { path: this.redirect || '/' },
                onComplete => {},
                onAbort => {}
              )
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
.login {
  .login_form {
    .el-form-item__content {
      .el-input {
        .el-input__inner {
          padding-left: 38px !important;
        }
      }
      &:nth-last-child(1) {
        .el-input {
          .el-input__inner {
            padding-right: 38px !important;
            vertical-align: middle;
          }
        }
      }
    }
    .el-form-item {
      margin-top: 30px;
    }
  }
}
</style>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  .login_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('~@/assets/images/login_bg.jpg');
    background-position: center;
    z-index: -1;
    &::before {
      background-color: rgba(0, 0, 0, 0.01);
    }
    &::before,
    &::after {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      display: block;
      left: 0;
      top: 0;
      content: '';
    }
  }
  .login_form {
    position: relative;
    z-index: 2;
    width: 400px;
    max-width: calc(100% - 100px);
    margin: 100px auto;
    padding: 0 50px;
    h3 {
      margin: 20px 0;
      text-align: center;
      color: #ffffff;
    }
    .el-form-item__content {
      position: relative;
      .svg-container {
        position: absolute;
        left: 10px;
        top: 0;
        z-index: 999;
        font-size: 18px;
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 0;
        z-index: 999;
        font-size: 18px;
        &:hover {
          cursor: pointer;
        }
      }
      .check_item {
        color: #ffffff !important;
      }
    }
  }
}
</style>
