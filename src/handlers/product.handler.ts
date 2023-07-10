import { Request, Response } from 'express'
import { ProductModel } from '../models/product.model'
import { Product } from '../types/ProductType'

const productModel = new ProductModel()

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_price, product_name } = req.body
    // Validate required fields
    if (!product_price || !product_name) {
      res.status(400).json({ error: 'Missing required fields: product_price, product_name' })
      return
    }

    const newProduct: Product = {
      product_price,
      product_name
    }

    const createdProduct = await productModel.create(newProduct)
    console.log(createProduct)
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(500).json({ error: 'error while creating product' })
  }
}

// Get a product by its ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product_id = req.params.product_id as string

    const product = await productModel.show(product_id)
    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: 'error while getting product' })
  }
}

// Get all products
export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await productModel.getAll()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: 'error while getting products' })
  }
}

// Update an existing product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product_id = req.params.product_id as string
    const { product_price, product_name } = req.body

    // Validate required fields
    if (!product_price || !product_name) {
      res.status(400).json({ error: 'Missing required fields: product_price, product_name' })
      return
    }

    const updatedProduct: Product = {
      product_id,
      product_price,
      product_name
    }

    const updated = await productModel.update(updatedProduct)
    if (!updated) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    res.status(200).json({ updated: updated })
  } catch (error) {
    res.status(500).json({ error: 'error while updating product' })
  }
}

// Delete a product by its ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product_id = req.params.product_id as string

    const deleted = await productModel.delete(product_id)
    if (!deleted) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    res.status(200).json({ deleted: deleted })
  } catch (error) {
    res.status(500).json({ error: 'error while deleting product' })
  }
}
