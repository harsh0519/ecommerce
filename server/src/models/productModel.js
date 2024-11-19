import mongoose from "./indexModel.js"

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    productWeight: {
        type: String,
        required: true
    },
    Sku: {
        type: String,
        required: true
    },
    productHeight: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productOriginalPrice: {
        type: Number,
        required: true
    },
    productQuantity: {
        default: 0,
        type: Number
    },
    productImage: {
        type: [String],
        required: true
    },
    isStockAvailable: {
        type: Boolean,
        default: true
    },
    productCategory: {
        type: String,
        enum: ["Male", "Female", "Couple", "Anal", "Bondage"],
        required: true
    }
},
    { timestamps: true, strictQuery: true },
    { collection: 'products' })
productSchema.index({ productTitle: "text" })

const ProductsModel = mongoose.model("products", productSchema)

export default ProductsModel