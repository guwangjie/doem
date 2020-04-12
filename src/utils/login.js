const user_account_key = 'user_account'
//用户登录信息保存
export function getUserAccount() {
  return typeof localStorage.getItem(user_account_key) !== 'undefined'
    ? JSON.parse(localStorage.getItem(user_account_key))
    : false
}
export function setUserAccount(accountString) {
  localStorage.setItem(user_account_key, JSON.stringify(accountString))
}
export function removeUserAccount() {
  return localStorage.removeItem(user_account_key)
}
//用户设置自动登录
const auto_login_key = 'auto_login'
export function getAutoLogin() {
  return typeof localStorage.getItem(auto_login_key) !== 'undefined'
    ? localStorage.getItem(auto_login_key)
    : false
}
export function setAutoLogin(bool) {
  localStorage.setItem(auto_login_key, bool)
}
export function removeAutoLogin() {
  return localStorage.removeItem(auto_login_key)
}
