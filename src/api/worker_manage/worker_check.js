import request from '@/utils/request'

export function workerCheckLst(params) {
  return request({
    url: '/worker_manage/workerCheckLst',
    method: 'get',
    params: params
  })
}
export function workerCheckLstAll() {
  return request({
    url: '/worker_manage/workerCheckLstAll',
    method: 'get'
  })
}
export function workerCheckDetail(params) {
  return request({
    url: '/worker_manage/workerCheckDetail',
    method: 'get',
    params: params
  })
}
export function workerCheckPass(data) {
  return request({
    url: '/worker_manage/workerCheckPass',
    method: 'post',
    data: data
  })
}
export function workerCheckDisabled(data) {
  return request({
    url: '/worker_manage/workerCheckDisabled',
    method: 'post',
    data: data
  })
}
export function workerCheckNoPass(ruleForm) {
  return request({
    url: '/worker_manage/workerCheckNoPass',
    method: 'post',
    data: ruleForm
  })
}
