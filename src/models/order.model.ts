import Client from '../database'
import { Order } from '../types/OrderType'

class OrderModel {
  // Create a new order
  async create(order: Order): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql = `
        INSERT INTO orders (user_id, order_status)
        VALUES ($1, $2)
        RETURNING *;
      `
      const values = [order.user_id, order.order_status]
      const result = await connection.query(sql, values)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while creating order: ${error}`)
    }
  }

  // Get an order by its ID
  async getById(order_id: string): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql = `
        SELECT * FROM orders
        WHERE order_id = $1;
      `
      const values = [order_id]
      const result = await connection.query(sql, values)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while retrieving order: ${error}`)
    }
  }

  // Get all orders
  async getAll(): Promise<Order[]> {
    try {
      const connection = await Client.connect()
      const sql = `
        SELECT * FROM orders;
      `
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error while retrieving orders: ${error}`)
    }
  }

  // Update an existing order
  async update(order: Order): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql = `
        UPDATE orders
        SET  order_status = $1
        WHERE order_id = $2
        RETURNING *;
      `
      const values = [order.order_status, order.order_id]
      const result = await connection.query(sql, values)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while updating order: ${error}`)
    }
  }

  // Delete an order by its ID
  async delete(order_id: string): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql = `
        DELETE FROM orders
        WHERE order_id = $1
        RETURNING *;
      `
      const result = await connection.query(sql, [order_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while deleting order: ${error}`)
    }
  }
}

export { OrderModel }
