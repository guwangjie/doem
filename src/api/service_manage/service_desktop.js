import request from '@/utils/request'

export function serviceDesktopIndexBindClientId(data) {
  return request({
    url: '/service_manage/serviceDesktopIndexBindClientId',
    method: 'post',
    data: data
  })
}

export function serviceDesktopIndexGetVisitorInfo(data) {
  return request({
    url: '/service_manage/serviceDesktopIndexGetVisitorInfo',
    method: 'post',
    data: data
  })
}

export function serviceDesktopIndexAddServiceRecord(data) {
  return request({
    url: '/service_manage/serviceDesktopIndexAddServiceRecord',
    method: 'post',
    data: data
  })
}

export function serviceDesktopIndexCloseChat(data) {
  return request({
    url: '/service_manage/serviceDesktopIndexCloseChat',
    method: 'post',
    data: data
  })
}

export function getEmoji() {
  return request({
    url: '/emoji/getEmoji',
    method: 'get'
  })
}

export function handleUploadChatImage(form_data) {
  return request({
    url: '/upload/uploadImage',
    method: 'post',
    data: form_data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function serviceDesktopIndexGetRecordForWeek() {
  return request({
    url: '/service_manage/serviceDesktopIndexGetRecordForWeek',
    method: 'get'
  })
}

export function serviceDesktopIndexGetOnlineServiceList() {
  return request({
    url: '/service_manage/serviceDesktopIndexGetOnlineServiceList',
    method: 'get'
  })
}
export function serviceDesktopIndexPatchToVisitor(data) {
  return request({
    url: '/service_manage/serviceDesktopIndexPatchToVisitor',
    method: 'post',
    data: data
  })
}
