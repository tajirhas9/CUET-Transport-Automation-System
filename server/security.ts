import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = '1042e84db1e537f87b017b2c31327a9d4ad0f5c25008d43218e50812a515bbd99c9ae008152104d1766660cf3e1fd7037f91b928a815e115c4f4037039523e50'

export const accessTokenAuth = (req: any, res: Response, next: NextFunction) => {
  const accessToken = req.header('authorization')
  if (accessToken == null) {
    return res.status(403).json({
      code: 403,
      messaege: 'Invalid Access Token'
    })
  }
  jwt.verify(accessToken, TOKEN_SECRET, (err: any, result: any) => {
    console.log(err)

    if (err) {
      return res.status(403).json({
        code: 403,
        messaege: 'Invalid Access Token'
      })
    }
    req.username = result.username

    next()
  })
}

export const generateToken = (username: string) => {
  console.log(username)
  console.log(TOKEN_SECRET)
  const token = jwt.sign({ username }, TOKEN_SECRET, { expiresIn: '1800s' })
  return token
}
