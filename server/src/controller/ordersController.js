import OrdersModel from "../models/orderModel.js"

const updateOrderDatas = async(req,res) => {
    try {
        const updateOrderData = await OrdersModel.findByIdAndUpdate({_id : req.body.id},{ $set : { orderId : req.body.orderId, paymentId : req.body.paymentId} })
        res.status(200).send({
            updateOrderData
        })
    } catch (error) {
        //console.log(error)
        res.status(500).send({
            message:"Internal Server Error in Getting all stays"
        })
    }
}

export default {
    updateOrderDatas
}