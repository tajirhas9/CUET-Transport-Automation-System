import request from '@/utils/request'

export const getBuses = (params?: any) =>
  request({
    url: '/buses',
    method: 'get',
    params
  })

export const getBusSchedule = (params?: any) =>
  request({
    url: '/schedule',
    method: 'get',
    params
  })
