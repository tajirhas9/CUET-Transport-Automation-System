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
