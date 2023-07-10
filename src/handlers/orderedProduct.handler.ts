import { Request, Response } from 'express'
import { OrderedProductModel } from '../models/orderdProduct.model'
import { OrderedProduct } from '../types/OrderedProduct'

const orderedProductModel = new OrderedProductModel()

export const createOrderedProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderedProduct: OrderedProduct = {
      product_id: req.body.product_id as string,
      order_id: req.body.order_id as string,
      quantity: req.body.quantity as number
    }

    if (!orderedProduct.product_id || !orderedProduct.order_id || !orderedProduct.quantity) {
      res.status(400).json({ error: 'Missing required fields: product_id, order_id, quantity' })
      return
    }

    const createdOrderedProduct = await orderedProductModel.create(orderedProduct)
    res.status(200).json({ createdOrderedProduct: createdOrderedProduct })
  } catch (error) {
    res.status(500).json({ error: 'Error while creating ordered product' })
  }
}

export const getOrderedProductsByOrderId = async (req: Request, res: Response): Promise<void> => {
  try {
    const order_id = req.params.order_id as string

    const orderedProducts = await orderedProductModel.getOrderedProductsByOrderId(order_id)
    if (!orderedProducts.length) {
      res.status(404).json({ message: 'there is no Products in this order!' })
      return
    }
    res.status(200).json({ orderedProducts: orderedProducts })
  } catch (error) {
    res.status(500).json({ error: 'Error while retrieving ordered products' })
  }
}

export const updateOrderedProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderedProduct: OrderedProduct = {
      ordered_products_id: req.params.ordered_products_id as string,
      product_id: req.body.product_id as string,
      order_id: req.body.order_id as string,
      quantity: req.body.quantity as number
    }

    if (!orderedProduct.product_id || !orderedProduct.order_id || !orderedProduct.quantity) {
      res.status(400).json({ error: 'Missing required fields: product_id, order_id, quantity' })
      return
    }

    const updatedOrderedProduct = await orderedProductModel.update(orderedProduct)
    if (updatedOrderedProduct) {
      res.status(200).json({ updatedOrderedProduct: updatedOrderedProduct })
    } else {
      res.status(404).json({ error: 'Ordered product not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error while updating ordered product' })
  }
}

export const deleteOrderedProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const ordered_products_id = req.params.ordered_products_id as string

    const deleted = await orderedProductModel.delete(ordered_products_id)

    if (!deleted) {
        res.status(404).json({ error: 'Ordered product not found' })
        return
    } 
    res.status(200).json({ DeletedorderedProduct: deleted })
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting ordered product' })
  }
}
