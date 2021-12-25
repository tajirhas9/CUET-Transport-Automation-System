import { Pool, PoolConfig } from 'pg'

export const DBCredentials = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_USER_PASSWORD,
  port: 5432
} as PoolConfig

export const pool = process.env.NODE_ENV === 'production'
  ? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
  : new Pool(DBCredentials)
