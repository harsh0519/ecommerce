import mongoose from "./indexModel.js"

const productSchema = new mongoose.Schema({
    productTitle : {
        type : String,
        required : true
    },
    productWeight : {
        type : String,
        required : true
    },
    productDescription : {
        type : String,
        required : true
    },
    productPrice : {
        type : Number,
        required : true
    },
    productQuantity : {
        default : 0,
        type : Number,
    },
    productImage : {
        type : String,
        required : true
    },
    isStockAvailable : {
        type : Boolean,
        default : true
    },
    productCategory:{
        type:String,
        enum:["Male","Female","Couple", "Anal", "Bondage"],
        required :true
    }
},
{ timestamps : true },
{ collection : 'products'})

const ProductsModel = mongoose.model("products",productSchema)

export default ProductsModel