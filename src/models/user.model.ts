import Client from "../database";
import { User } from "../types/UserType";
import { hashingPassword, isValidPassword } from "../utils/hashing-operations";

class UserModel {
  async create(user: User): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING user_id, email, password, first_name, last_name;`;
      const hashedPassword = hashingPassword(user.password);
      const sql_result = await connection.query(sql, [
        user.email,
        hashedPassword,
        user.first_name,
        user.last_name,
      ]);
      connection.release();
      return sql_result.rows[0];
    } catch (error) {
      throw new Error(`Error While Creating user: ${user.email} ${error}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT user_id, email, first_name, last_name, created_at, updated_at FROM users;`;
      const sql_result = await connection.query(sql);
      connection.release();
      return sql_result.rows;
    } catch (error) {
      throw new Error(`Error While Getting users: ${error}`);
    }
  }

  async show(user_id: string): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT user_id, email, first_name, last_name, created_at, updated_at FROM users WHERE user_id = $1;`;
      const sql_result = await connection.query(sql, [user_id]);
      connection.release();
      return sql_result.rows[0];
    } catch (error) {
      throw new Error(`Error While Getting user ${user_id}: ${error}`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = `UPDATE users SET email=($2), password=($3), first_name=($4), last_name=($5), updated_at=now() WHERE user_id = $1 RETURNING user_id, email, first_name, last_name, updated_at;`;
      const hashedPassword: string = hashingPassword(user.password);
      const sql_result = await connection.query(sql, [
        user.user_id,
        user.email,
        hashedPassword,
        user.first_name,
        user.last_name,
      ]);
      connection.release();
      return sql_result.rows[0];
    } catch (error) {
      throw new Error(`Error While Updating user ${user.user_id}: ${error}`);
    }
  }

  async delete(user_id: string): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql_query = `DELETE FROM users WHERE user_id = $1 RETURNING user_id, email, first_name, last_name, created_at;`;
      const query_result = await connection.query(sql_query, [user_id]);
      connection.release();
      return query_result.rows[0];
    } catch (error) {
      throw new Error(`Error While Deleting user ${user_id} ${error}`);
    }
  }


  //user login 
  async authenticate(email:string,password:string):Promise<string | false>{
    try {
        const connection = await Client.connect()
        const sql_query = 'SELECT password FROM users WHERE email=$1;'
        const query_result = await connection.query(sql_query, [email])
        if(isValidPassword(password,query_result.rows[0].password as string)){
            const result = await connection.query(`SELECT user_id FROM users WHERE email=$1;`,[email])
            connection.release()
            return result.rows[0].user_id
        }
        return false
    } catch (error) {
        throw new Error(`Error While Logging user ${email} ${error}`)

    }
  }

}

export {UserModel}