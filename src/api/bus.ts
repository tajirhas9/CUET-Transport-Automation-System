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

export const addNewBus = (data: {
    name: string
    status: boolean
  }) =>
  request({
    url: '/buses',
    method: 'post',
    data
  })

export const addBusSchedule = (data: {
  bus: number
  driver: number
  route: number
  datetime: string
}) =>
  request({
    url: '/schedule',
    method: 'post',
    data
  })

export const updateBusSchedule = (data: {
    id: number
    bus: number
    driver: number
    route: number
    datetime: string
  }) =>
  request({
    url: '/schedule',
    method: 'put',
    data
  })

export const updateBus = (data: {
    id: number
    name: string
    status: boolean
  }) =>
  request({
    url: '/buses',
    method: 'put',
    data
  })
