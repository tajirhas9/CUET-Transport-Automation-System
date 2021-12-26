import { pool } from '../db-conf'
import { Response, Request } from 'express'

export const getDrivers = async(req: Request, res: Response) => {
  try {
    const queryString = 'select * from driver'
    console.log(queryString)
    const drivers = await pool.query(queryString)
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
      data: {
        messaege: 'Database Error'
      }
    })
  }
}

export const addDriver = async(req: any, res: Response) => {
  try {
    const { name, address, licenseStatus } = req.body

    const queryString = `insert into driver(name, address, licenseStatus) values('${name}', '${address}', ${licenseStatus});`
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

export const updateDriver = async(req: any, res: Response) => {
  try {
    const { id, name, address, licenseStatus } = req.body
    const queryString = `update driver set name='${name}', address='${address}', licenseStatus=${licenseStatus} where id=${id};`
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
