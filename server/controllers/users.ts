import faker from 'faker'
import { Response, Request } from 'express'
import { IUserData } from '../../src/api/types'
import { pool } from '../db-conf'
import { generateToken } from '../security'
import { Roles } from '../../src/api/enums'

const userList: IUserData[] = [
  {
    id: 0,
    username: 'admin',
    password: 'any',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    role: Roles.admin
  },
  {
    id: 1,
    username: 'editor',
    password: 'any',
    name: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    role: Roles.staff
  }
]
const userCount = 100

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.random.alphaNumeric(9),
    password: faker.random.alphaNumeric(20),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    role: Roles.student
  })
}

export const register = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const login = async(req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const queryString = `select * from users where username='${username}' and password='${password}';`
    console.log(queryString)
    const user = await pool.query(queryString)
    console.log(JSON.stringify(user.rows))
    if (user.rowCount === 0) {
      return res.status(401).json({
        code: 401,
        messaege: 'Invalid User'
      })
    } else {
      const accessToken = generateToken(user.rows[0].username)
      console.log(`accessToken: ${accessToken}`)
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
      messaege: 'Database Error'
    })
  }
}

export const logout = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const getUsers = (req: Request, res: Response) => {
  const { name } = req.query
  const users = userList.filter(user => {
    const lowerCaseName = user.name.toLowerCase()
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
  })
  return res.json({
    code: 20000,
    data: {
      items: users
    }
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({
    code: 20000,
    data: {
      user: userList[0]
    }
  })
}

export const getUserByName = (req: Request, res: Response) => {
  const { username } = req.params
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const updateUser = (req: Request, res: Response) => {
  const { username } = req.params
  const { user } = req.body
  for (const v of userList) {
    if (v.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const deleteUser = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
