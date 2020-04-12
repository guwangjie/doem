// const webSocket_Base_Url = 'ws://192.168.0.15:8282'
const webSocket_Base_Url =
  process.env.NODE_ENV === 'production'
    ? 'ws://192.168.0.105:8282'
    : // ? 'wss://lyqq.cn-lianyi.com:8282'
    'ws://192.168.0.105:8282'
// 'wss://lyqq.cn-lianyi.com:8282'

const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $config: {
      get() {
        return {
          webSocket_Base_Url: webSocket_Base_Url
        }
      }
    }
  })
}

export default {
  install
}
