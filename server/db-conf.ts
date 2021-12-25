import { Pool, PoolConfig } from 'pg'

export const DBCredentials = {
  user: 'ctas-admin',
  host: 'localhost',
  database: 'ctas-db',
  password: '#1164093',
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
