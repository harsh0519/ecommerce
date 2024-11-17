import Razorpay from 'razorpay'
import crypto from 'crypto'
import OrdersModel from '../models/orderModel.js'

const  order = async(req,res) => {
    try {
        const rp = new Razorpay({
            key_id: process.env.RP_KEY_ID,
            key_secret : process.env.RP_KEY_SECRET
        })
        const order = await rp.orders.create({
            amount: req.body.amount,
            currency: req.body.currency,
            receipt: req.body.receipt,
        })
        if(!order) {
            res.status(400).send({
                message:"Internal Server Error in  payment order"
            }) 
        }else{
            const orderData = await OrdersModel.create({...req.body, amount: req.body.amount/100, currentUserId : req.params.id})
            res.status(200).send({
                order,
                orderData
            })
        }
        
    } catch (error) {
       // console.log(error)
        res.status(500).send({
            message : "Internal server error in creating payment"
        })
    }
}

const validateOrder = async(req,res) => {
    try {
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body
        const sha = crypto.createHmac('sha256',process.env.RP_KEY_SECRET)
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
        const digest = sha.digest('hex')
        if(digest !== razorpay_signature){
            res.status(400).send({
                message:"Transaction is not legit"
            }) 
        }else{
            res.status(200).send({
                message : 'Successful Transaction',
                orderId : razorpay_order_id,
                paymentId : razorpay_payment_id,
            })
        } 
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in validating payment order"
        })
    }
}

export default {
    order,
    validateOrder
}