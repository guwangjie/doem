import request from '@/utils/request'

export function scanCodeLst(params) {
  return request({
    url: '/company/scanCodeLst',
    method: 'get',
    params: params
  })
}
export function scanCodeLstAll() {
  return request({
    url: '/company/scanCodeLstAll',
    method: 'get'
  })
}
export function scanCodeDetail(params) {
  return request({
    url: '/company/scanCodeDetail',
    method: 'get',
    params: params
  })
}
