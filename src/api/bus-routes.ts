import request from '@/utils/request'

export const getRoutes = (params?: any) =>
  request({
    url: '/bus-routes',
    method: 'get',
    params
  })
