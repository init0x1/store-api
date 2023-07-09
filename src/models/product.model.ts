import Client from "../database";
import {Product} from "../types/ProductType";

class ProductModel{

    //create Product
    async create(product:Product):Promise<Product>{
        try {
            const connection = await Client.connect()
            const sql = `INSERT INTO products (product_price, product_name) VALUES ($1, $2) RETURNING *;`;
            const sql_result = await connection.query(sql,[product.product_price,product.product_name])
            connection.release()
            return sql_result.rows[0]
        } catch (error) {
            throw new Error(`Error while creating product: ${error}`);
        }
    }


    //get All Product 
    async getAll(): Promise<Product[]> {
        try {
          const connection = await Client.connect();
          const sql = `SELECT * FROM products;`;
          const result = await connection.query(sql);
          connection.release();
          return result.rows;
        } catch (error) {
          throw new Error(`Error while retrieving products: ${error}`);
        }
    }

    //get product by its ID 
    async show(product_id: string): Promise<Product> {
        try {
          const connection = await Client.connect();
          const sql = `SELECT * FROM products WHERE product_id = $1;`;
          const values = [product_id];
          const result = await connection.query(sql, values);
          connection.release();
          return result.rows[0] ;
        } catch (error) {
          throw new Error(`Error while retrieving product: ${error}`);
        }
      }

    //update Product
    async update(product: Product): Promise<Product> {
        try {
          const connection = await Client.connect();
          const sql = `UPDATE products SET product_price = $1, product_name = $2 WHERE product_id = $3 RETURNING *;`;
          const values = [product.product_price, product.product_name, product.product_id];
          const result = await connection.query(sql, values);
          connection.release();
          return result.rows[0] || null;
        } catch (error) {
          throw new Error(`Error while updating product: ${error}`);
        }
      }
    
    //delete product 
    async delete(product_id: string): Promise<Product> {
        try {
          const connection = await Client.connect();
          const sql = `DELETE FROM products WHERE product_id = $1 RETURNING *;`;
          const values = [product_id];
          const result = await connection.query(sql, values);
          connection.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(`Error while deleting product: ${error}`);
        }
      }

}
export {ProductModel}