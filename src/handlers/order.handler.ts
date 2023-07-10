import { Request, Response } from 'express'
import { OrderModel } from '../models/order.model'
import { OrderedProductModel } from '../models/orderdProduct.model'
import { Order } from '../types/OrderType'

const orderModel = new OrderModel()
const orderedProductModel = new OrderedProductModel()
// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      order_status: req.body.order_status as string,
      user_id: req.body.user_id as string
    }

    if (!order.user_id || !order.order_status) {
      res.status(400).json({ error: 'Missing required fields: user_id, order_status' })
      return
    }

    const createdOrder = await orderModel.create(order)
    res.status(200).json(createdOrder)
  } catch (error) {
    res.status(500).json({ error: 'Error while creating order' })
  }
}

// Get an order by its ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order_id = req.params.order_id as string

    const order = await orderModel.getById(order_id)
    if (!order) {
      res.status(404).json({ error: 'Order not found' })
      return
    }

    const orderedProducts = await orderedProductModel.getOrderedProductsByOrderId(order_id)

    const orderWithProducts = {
      ...order,
      ordered_products: orderedProducts
    }

    res.status(200).json(orderWithProducts)
  } catch (error) {
    res.status(500).json({ error: 'Error while retrieving order' })
  }
}

// Get all orders
export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders: Order[] = await orderModel.getAll()
    if (!orders.length) {
      res.status(404).json({ message: 'No Orders To Retrieve!' })
      return
    }
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Error while retrieving orders' })
  }
}

// Update an existing order
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      order_id: req.params.order_id as string,
      order_status: req.body.order_status as string,
      user_id: req.body.user_id as string
    }

    if (!order.user_id || !order.order_status) {
      res.status(400).json({ error: 'Missing required fields: user_id, order_status' })
      return
    }

    const updatedOrder = await orderModel.update(order)
    if (!updatedOrder) {
      res.status(404).json({ error: 'Order not found' })
      return
    }

    res.status(200).json({ OrderUpdated: updatedOrder })
  } catch (error) {
    res.status(500).json({ error: 'Error while updating order' })
  }
}

// Delete an order by its ID
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order_id = req.params.order_id as string

    const deletedOrder = await orderModel.delete(order_id)
    if (!deletedOrder) {
      res.status(404).json({ error: 'Order not found' })
      return
    }

    res.status(200).json({ DeletedOrder: deletedOrder })
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting order' })
  }
}
