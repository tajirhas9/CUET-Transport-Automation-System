import { Pool, PoolConfig } from 'pg'

export const DBCredentials = {
  user: 'ctas-admin',
  host: 'localhost',
  database: 'ctas-db',
  password: '#1164093',
  port: 5432
} as PoolConfig

export const pool = new Pool(DBCredentials)
