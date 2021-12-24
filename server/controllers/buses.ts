import { pool } from '../db-conf'
import { Response, Request } from 'express'

export const getBuses = async(req: Request, res: Response) => {
  try {
    const queryString = 'select * from bus'
    console.log(queryString)
    const buses = await pool.query(queryString)
    console.log(JSON.stringify(buses.rows))
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

export const getSchedule = async(req: Request, res: Response) => {
  try {
    const queryString = 'select * from schedule'
    console.log(queryString)
    const data = await pool.query(queryString)
    console.log(JSON.stringify(data.rows))
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
    const { bus, driver, route, datetime, isStandBy } = req.body
    const queryString = `insert into schedule(bus, driver, route, datetime, isStandBy) values(${bus}, ${driver}, ${route}, '${datetime}', ${isStandBy});`
    console.log(queryString)
    const data = await pool.query(queryString)
    console.log(JSON.stringify(data))
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
