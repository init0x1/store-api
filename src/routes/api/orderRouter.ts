import express from 'express'
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder
} from '../../handlers/order.handler'

const orderRouter = express.Router()
orderRouter.post('/', createOrder)

orderRouter.get('/:order_id', getOrderById)

orderRouter.get('/', getAllOrders)

orderRouter.put('/:order_id', updateOrder)

orderRouter.delete('/:order_id', deleteOrder)

export { orderRouter }
