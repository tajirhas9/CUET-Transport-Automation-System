import { pool } from '../db-conf'
import { Response, Request } from 'express'

export const getRoutes = async(req: Request, res: Response) => {
  try {
    const queryString = 'select * from route'
    console.log(queryString)
    const routes = await pool.query(queryString)
    console.log(JSON.stringify(routes.rows))
    return res.json({
      code: 200,
      data: {
        routes: routes.rows
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
