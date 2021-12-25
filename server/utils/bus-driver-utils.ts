import { pool } from '../db-conf'

export const checkDriverAvailability = async(
  queryDate: Date,
  driver: number,
  id?: number
) => {
  const dateString = `${queryDate.getFullYear()}-${queryDate.getMonth()}-${queryDate.getDate()}`
  console.log(dateString)
  const queryString = `select * from schedule where driver = ${driver} and datetime::date >= date '${dateString}';`
  const data = await pool.query(queryString)

  return id
    ? data.rowCount === 1 && data.rows[0].id !== id
    : data.rowCount === 0
}
