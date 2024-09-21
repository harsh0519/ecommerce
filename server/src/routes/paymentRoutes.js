import express from 'express'
import auth from '../helper/auth.js'
import paymentController from '../controller/paymentController.js'

const router = express.Router()

router.post('/order/:id', auth.authenticate, paymentController.order)
router.post('/order/validate/:id',auth.authenticate, paymentController.validateOrder)

export default router