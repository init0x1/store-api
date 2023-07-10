import Client from '../database'
import { OrderedProduct } from '../types/OrderedProduct'

class OrderedProductModel {
  //InsertProductIntoOrder
  async create(orderedProduct: OrderedProduct): Promise<OrderedProduct> {
    try {
      const connection = await Client.connect()
      const sql = `
        INSERT INTO ordered_products (product_id, order_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
      `
      const values = [orderedProduct.product_id, orderedProduct.order_id, orderedProduct.quantity]
      const result = await connection.query(sql, values)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while creating ordered product: ${error}`)
    }
  }

  async getOrderedProductsByOrderId(order_id: string): Promise<OrderedProduct[]> {
    try {
      const connection = await Client.connect()
      const sql = `
        SELECT * FROM ordered_products
        WHERE order_id = $1;
      `
      const result = await connection.query(sql, [order_id])
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error while retrieving ordered products: ${error}`)
    }
  }
  //update OrderedProduct
  async update(orderedProduct: OrderedProduct): Promise<OrderedProduct> {
    try {
      const connection = await Client.connect()
      const sql = `
        UPDATE ordered_products
        SET product_id = $1, order_id = $2, quantity = $3
        WHERE ordered_products_id = $4
        RETURNING *;
      `
      const values = [
        orderedProduct.product_id,
        orderedProduct.order_id,
        orderedProduct.quantity,
        orderedProduct.ordered_products_id
      ]
      const result = await connection.query(sql, values)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while updating ordered product: ${error}`)
    }
  }

  async delete(orderedProduct_id: string): Promise<OrderedProduct> {
    try {
      const connection = await Client.connect()
      const sql = `
        DELETE FROM ordered_products
        WHERE ordered_products_id = $1;
      `
      const result = await connection.query(sql, [orderedProduct_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error while deleting ordered product: ${error}`)
    }
  }
}

export { OrderedProductModel }
