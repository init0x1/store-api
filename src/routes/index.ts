import express, { Router } from 'express'
import { welcomeMessage, notFound } from '../controllers/'
import { join } from 'path'
import { userRouter } from './api/userRouter'
import productRouter from './api/productRouter'

import { validateTokenMiddleware } from '../middlewares/authenrication.middleware'
import { orderRouter } from './api/orderRouter'
import { orderedProductRouter } from './api/orderdProductRouter'

//Declareing Static Directory for Serving Static Files

const staticDir: string = join(__dirname, '..', '..', 'public')

//Creatring Router instance

const router: Router = express.Router()

// Useing Static Directory for Serving Static Files

router.use('/static', express.static(staticDir))

// Welcome Message With / EndPoint

router.get('/', welcomeMessage)

//using userRouter
router.use('/users', userRouter)

//using productRouter
router.use('/products', productRouter)

//using orderRouter
router.use('/orders', validateTokenMiddleware, orderRouter)

//using orderedProductsRouter
router.use('/orderedProducts', validateTokenMiddleware, orderedProductRouter)

// Response With Not Found for any invalid path

router.all('/*', notFound)

export default router
