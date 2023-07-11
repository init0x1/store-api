/*
import { OrderModel } from '../../models/order.model';
import { Order } from '../../types/OrderType'
import { UserModel } from '../../models/user.model';
import { User } from '../../types/UserType'
import Client from '../../database';

const orderModel = new OrderModel();
const userModel = new UserModel();

describe('Order Model', () => {
  let createdUser: User;
  let createdOrder: Order;

  beforeAll(async () => {
    await Client.connect();

    // Create a user
    const user: User = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
    };
    createdUser = await userModel.create(user);

  });

  afterAll(async () => {
    await orderModel.delete(createdOrder.order_id as string);
    await userModel.delete(createdUser.user_id as string);
    await Client.end();
  });

  it('should create a new order', async () => {
    const order: Order = {
      user_id: createdUser.user_id as string,
      order_status: 'pending',
    };
    createdOrder = await orderModel.create(order);

    expect(createdOrder.user_id).toEqual(order.user_id);
    expect(createdOrder.order_status).toEqual(order.order_status);
    expect(createdOrder.order_id).toBeDefined();
  });

  it('should retrieve an order by ID', async () => {
    const retrievedOrder = await orderModel.getById(createdOrder.order_id as string);

    expect(retrievedOrder).toEqual(createdOrder);
  });

  it('should retrieve all orders', async () => {
    const orders = await orderModel.getAll();

    expect(orders.length).toBeGreaterThan(0);
  });

  it('should update an existing order', async () => {
    const updatedOrder: Order = {
      order_id: createdOrder.order_id,
      user_id: createdOrder.user_id,
      order_status: 'completed',
    };
    const updated = await orderModel.update(updatedOrder);

    expect(updated.order_id).toEqual(updatedOrder.order_id);
    expect(updated.order_status).toEqual(updatedOrder.order_status);
  });

  it('should delete an order', async () => {
    await orderModel.delete(createdOrder.order_id as string);
    const deletedOrder = await orderModel.getById(createdOrder.order_id as string);

    expect(deletedOrder).toBeNull();
  });
})
*/
