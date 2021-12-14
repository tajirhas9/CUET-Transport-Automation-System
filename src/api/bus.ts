import request from '@/utils/request'

export const getSchedule = (params: any) =>
  request({
    url: '/schedule',
    method: 'get',
    params
  })
