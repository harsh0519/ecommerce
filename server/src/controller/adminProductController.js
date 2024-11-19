import ProductsModel from "../models/productModel.js";

// Add a Product
const addProduct = async (req, res) => {
  try {
    const { title, weight, height, sku, description, category, price, originalPrice } = req.body;

    // `req.files` is used to handle multiple images
    const images = req.files.map((file) => file.path);

    const addproduct = await ProductsModel.create({
      productTitle: title,
      productWeight: weight,
      productHeight: height,
      Sku: sku, 
      productDescription: description,
      productCategory: category,
      productPrice: price,
      productOriginalPrice: originalPrice,
      productImage: images, 
    });

    res.status(200).send({
      addproduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error in adding new product",
    });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const productsList = await ProductsModel.find();
    const productsCount = await ProductsModel.countDocuments();

    res.status(200).send({
      productsList,
      productsCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error in retrieving products",
    });
  }
};

// Update a Product
const updateProduct = async (req, res) => {
  try {
    const { title, weight, height, sku, description, category, price, originalPrice } = req.body;

    const updatedProduct = {};

    Object.entries({
      productTitle: title,
      productWeight: weight,
      productHeight: height,
      Sku: sku, 
      productDescription: description,
      productCategory: category,
      productPrice: price,
      productOriginalPrice: originalPrice,
    }).forEach(([key, value]) => {
      if (value) updatedProduct[key] = value; 
    });

    // Handle updating images if provided
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => file.path);
      updatedProduct.productImage = images;
    }

    const editedProduct = await ProductsModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updatedProduct },
      { new: true }
    );

    res.status(200).send({
      editedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error in editing product",
    });
  }
};

// Remove a Product
const removeProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductsModel.findByIdAndDelete({
      _id: req.params.id,
    });

    res.status(200).send({
      deletedProduct,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error in deleting product",
    });
  }
};

export default {
  addProduct,
  getAllProducts,
  updateProduct,
  removeProduct,
};
