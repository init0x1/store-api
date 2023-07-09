import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env

const Client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  port: parseInt(POSTGRES_PORT as string),
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
})

const test_db_connection = async (): Promise<void> => {
  try {
    const connection = await Client.connect()
    const sqlQuery = 'select now();'
    const result = await connection.query(sqlQuery)
    console.log(`[+] Connected [+] ${result.rows[0].now}`)
    connection.release()
  } catch (error) {
    console.error(error)
  }
}
test_db_connection()

export default Client
