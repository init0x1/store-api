import { OrderModel } from '../../models/order.model'
import { Order } from '../../types/OrderType'
import { UserModel } from '../../models/user.model'
import { User } from '../../types/UserType'
import Client from '../../database'

const orderModel = new OrderModel()
const userModel = new UserModel()

describe('Order Model Test', () => {
  let createdUser: User
  let createdOrder0: Order
  let createdOrder1: Order

  beforeAll(async () => {
    createdUser = await userModel.create({
      email: 'test@0xabdo.com',
      password: 'letmein',
      first_name: 'Abdo',
      last_name: 'Ali'
    })
  })

  afterAll(async () => {
    const connection = await Client.connect()
    await connection.query(`DELETE FROM orders;`)
    await connection.query(`DELETE FROM users;`)
    connection.release()
  })

  it('should have a getAll method', () => {
    expect(orderModel.getAll).toBeDefined()
  })

  it('should have a getById method', () => {
    expect(orderModel.getById).toBeDefined()
  })

  it('should have a create method', () => {
    expect(orderModel.create).toBeDefined()
  })

  it('should have an update method', () => {
    expect(orderModel.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(orderModel.delete).toBeDefined()
  })

  it('should create a new order', async () => {
    const orderToCreate: Order = {
      order_status: 'not Delivered',
      user_id: createdUser.user_id as string
    }
    createdOrder0 = await orderModel.create(orderToCreate)

    expect(createdOrder0.order_status).toBe(orderToCreate.order_status)
    expect(createdOrder0.user_id).toBe(orderToCreate.user_id)
  })

  it('should retrieve all orders', async () => {
    const orders = await orderModel.getAll()
    expect(orders.length).toBe(1)
    expect(orders[0].order_status).toBe(createdOrder0.order_status)
    expect(orders[0].user_id).toBe(createdOrder0.user_id)
    expect(orders[0].order_id).toBe(createdOrder0.order_id)
  })

  it('should retrieve an order by ID', async () => {
    const order = await orderModel.getById(createdOrder0.order_id as string)
    expect(order.order_id).toBe(createdOrder0.order_id)
    expect(order.user_id).toBe(createdOrder0.user_id)
    expect(order.order_status).toBe(createdOrder0.order_status)
  })

  it('should update an order', async () => {
    const orderToUpdate: Order = {
      order_id: createdOrder0.order_id,
      order_status: 'Delivered',
      user_id: createdUser.user_id as string
    }
    const updatedOrder = await orderModel.update(orderToUpdate)

    expect(updatedOrder.order_status).toBe(orderToUpdate.order_status)
  })

  it('should delete an order', async () => {
    await orderModel.delete(createdOrder0.order_id as string)
    const orders = await orderModel.getAll()
    expect(orders.length).toBe(0)
  })
})
