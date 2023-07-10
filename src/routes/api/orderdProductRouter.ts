import express from 'express'
import {
  createOrderedProduct,
  getOrderedProductsByOrderId,
  deleteOrderedProduct,
  updateOrderedProduct
} from '../../handlers/orderedProduct.handler'

const orderedProductRouter = express.Router()

// Create a new ordered product
orderedProductRouter.post('/', createOrderedProduct)

// Get ordered products by order ID
orderedProductRouter.get('/:order_id', getOrderedProductsByOrderId)

// Delete an ordered product by its ID
orderedProductRouter.delete('/:ordered_products_id', deleteOrderedProduct)

// Update an ordered product by its ID
orderedProductRouter.put('/:ordered_products_id', updateOrderedProduct)

export { orderedProductRouter }
