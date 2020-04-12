const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  name: state => state.user.name,
  roles: state => state.user.roles,
  user_id: state => state.user.user_id,
  addRouters: state => state.permission.addRouters
}
export default getters
