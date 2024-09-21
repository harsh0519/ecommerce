import mongoose from "./indexModel.js"

const ordersSchema = new mongoose.Schema({
    currentUserId : {
        type : String,
        required : true
    },
    product : [
        {
            productId : String,
            productTitle : String,
            productQuantity : Number,
            productPrice : Number,
            productImage : String,
            productWeight : String,
        }
    ],
    amount : {
        type : Number,
        required : true
    },
    receipt : {
        type : String,
        required : true
    },
    currency : {
        type : String,
        required : true
    },
    orderId : {
        type : String,
    },
    paymentId : {
        type : String,
    },
},
{   timestamps : true  },
{   collection : 'orders' })

const OrdersModel = mongoose.model('orders', ordersSchema)

export default OrdersModel