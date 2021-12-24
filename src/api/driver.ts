import request from '@/utils/request'

export const getDrivers = (params?: any) =>
  request({
    url: '/drivers',
    method: 'get',
    params
  })
