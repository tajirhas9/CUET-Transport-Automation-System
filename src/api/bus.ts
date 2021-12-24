import request from '@/utils/request'

export const getSchedule = (params: any) =>
  request({
    url: '/schedule',
    method: 'get',
    params
  })

export const getBuses = (params?: any) =>
  request({
    url: '/buses',
    method: 'get',
    params
  })
