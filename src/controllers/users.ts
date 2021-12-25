import { Response, Request } from 'express'
import { pool } from '../db-conf'
import { generateToken } from '../security'

export const login = async(req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const queryString = `select * from users where username='${username}' and password='${password}';`
    console.log(queryString)
    const user = await pool.query(queryString)
    if (user.rowCount === 0) {
      return res.status(401).json({
        code: 401,
        messaege: 'Invalid User'
      })
    } else {
      const accessToken = generateToken(user.rows[0].username)
      return res.json({
        code: 200,
        data: {
          user: user.rows[0],
          accessToken: accessToken
        }
      })
    }
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

export const logout = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const getUserInfo = async(req: any, res: Response) => {
  // Mock data based on access token
  const username = req.username
  try {
    const queryString = `select * from users where username='${username}';`
    const user = await pool.query(queryString)
    if (user.rowCount === 0) {
      return res.status(401).json({
        code: 401,
        messaege: 'Invalid User'
      })
    } else {
      return res.json({
        data: {
          user: user.rows[0]
        }
      })
    }
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
