import express from 'express'
import auth from '../helper/auth.js'
import ordersController from '../controller/ordersController.js'

const router = express.Router()

// router.get('/myorders/:id', auth.authenticate, ordersController.getMyOrders)
router.put('/updateOrderId', auth.authenticate, ordersController.updateOrderDatas)

export default router