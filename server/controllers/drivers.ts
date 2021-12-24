import { pool } from '../db-conf'
import { Response, Request } from 'express'

export const getDrivers = async(req: Request, res: Response) => {
  try {
    const queryString = 'select * from driver'
    console.log(queryString)
    const drivers = await pool.query(queryString)
    console.log(JSON.stringify(drivers.rows))
    return res.json({
      code: 200,
      data: {
        drivers: drivers.rows
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
