import { pool } from '../db-conf'
import { Response, Request } from 'express'
// import { checkDriverAvailability } from '../utils/bus-driver-utils'

// Buses

export const getBuses = async(req: Request, res: Response) => {
  try {
    const queryString = 'select * from bus'
    console.log(queryString)
    const buses = await pool.query(queryString)
    return res.json({
      code: 200,
      data: {
        buses: buses.rows
      }
    })
  } catch (e: any) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      messaege: 'Database Error'
    })
  }
}

export const addBus = async(req: any, res: Response) => {
  try {
    const { name, status } = req.body

    const queryString = `insert into bus(name, status) values(${name}, ${status});`
    console.log(queryString)
    const data = await pool.query(queryString)
    return res.json({
      code: 200,
      data: {
        schedule: data.rows
      }
    })
  } catch (e: any) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      data: {
        messaege: 'Database Error'
      }
    })
  }
}

export const updateBus = async(req: any, res: Response) => {
  try {
    const { id, name, status } = req.body
    const queryString = `update bus set name=${name}, status=${status} where id=${id};`
    console.log(queryString)
    const data = await pool.query(queryString)
    return res.json({
      code: 200,
      data: {
        schedule: data.rows
      }
    })
  } catch (e: any) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      data: {
        messaege: 'Database Error'
      }
    })
  }
}

// Schedule

export const getSchedule = async(req: Request, res: Response) => {
  try {
    const queryString = 'select * from schedule'
    console.log(queryString)
    const data = await pool.query(queryString)
    return res.json({
      code: 200,
      data: {
        schedule: data.rows
      }
    })
  } catch (e: any) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      messaege: 'Database Error'
    })
  }
}

export const addSchedule = async(req: any, res: Response) => {
  try {
    const { bus, driver, busRoute, datetime } = req.body
    const driverAvailable = true // await checkDriverAvailability(new Date(datetime), driver)
    if (!driverAvailable) {
      res.status(409).json({
        code: 409,
        message: 'Driver already assigned to another bus'
      })
    }
    const queryString = `insert into schedule(bus, driver, route, datetime) values(${bus}, ${driver}, ${busRoute}, '${datetime}');`
    console.log(queryString)
    const data = await pool.query(queryString)
    return res.json({
      code: 200,
      data: {
        schedule: data.rows
      }
    })
  } catch (e: any) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      data: {
        messaege: 'Database Error'
      }
    })
  }
}

export const updateSchedule = async(req: any, res: Response) => {
  try {
    const { id, bus, driver, route, datetime } = req.body
    const driverAvailable = true // await checkDriverAvailability(new Date(datetime), driver, id)
    if (!driverAvailable) {
      res.status(409).json({
        code: 409,
        data: {
          message: 'Driver already assigned to another bus'
        }
      })
    }
    const queryString = `update schedule set bus=${bus}, driver=${driver}, route=${route}, datetime='${datetime}' where id=${id};`
    console.log(queryString)
    const data = await pool.query(queryString)
    return res.json({
      code: 200,
      data: {
        schedule: data.rows
      }
    })
  } catch (e: any) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      data: {
        messaege: 'Database Error'
      }
    })
  }
}
