import request from '@/utils/request'

export function getDashBordIndex() {
  return request({
    url: '/dashboard/index',
    method: 'get'
  })
}
