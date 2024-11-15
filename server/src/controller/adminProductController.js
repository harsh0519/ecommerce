import ProductsModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { title, weight, description,category, price } = req.body;
    const { filename,path,size } = req.file;
    console.log(path)
    const addproduct = await ProductsModel.create({
      productTitle: title,
      productWeight: weight,
      productDescription: description,
      productCategory: category,
      productPrice: price,
      productImage: path,
    });
    res.status(200).send({
      addproduct,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Internal server error in adding new product",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let productsList = await ProductsModel.find();
    if (productsList) {
      let productsCount = await ProductsModel.countDocuments();
      res.status(200).send({
        productsList,
        productsCount,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in adding new product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, weight, description,category, price } = req.body;
    const updatedProduct = {};
    Object.entries({
      productTitle: title,
      productWeight: weight,
      productDescription: description,
      productcategory: category,
      productPrice: price,
    }).forEach(([key, value]) => {
     //   console.log(key,value)
      if (value) {
        updateProduct[key] = value;
      }
    });
    if (req.file) {
      const { filename } = req.file;
      if (filename) {
        updatedProduct.productImage = filename;
      }
    }
    let editedProduct = await ProductsModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: updatedProduct,
      },
      { new: true }
    );
    res.status(200).send({
      editedProduct,
    });
  } catch (error) {
   // console.log(error);
    res.status(500).send({
      message: "Internal server error in editing product",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    let deletedProduct = await ProductsModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({
      deletedProduct,
    });
  } catch (error) {
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
