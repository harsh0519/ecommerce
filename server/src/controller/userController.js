import UserAuthModel from "../models/userAuthModel.js";
import ProductModel from "../models/productModel.js";

// Contact Function
const contact = async (req, res) => {
  try {
    const { userName, email, mobile, description } = req.body;
    res.status(200).send({
      message: "Thanks for contacting us, we will get back to you shortly!",
    });
    await adminToEmpEmailService(userName, email, mobile, description);
    await userToAdminEmailService(email);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in sending your query",
    });
  }
};

// Get All Users
const allUsers = async (req, res) => {
  try {
    const usersList = await UserAuthModel.find();
    res.status(200).send({
      usersList,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching user data",
    });
  }
};

// Current User Data
const currentUserData = async (req, res) => {
  try {
    const currentUser = await UserAuthModel.findById(req.params.id);
    res.status(200).send({
      currentUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching user data",
    });
  }
};

// User Profile Update
const userprofileUpdate = async (req, res) => {
  try {
    const updatedProfile = await UserAuthModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({
      updatedProfile,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in updating profile",
    });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const productsData = await ProductModel.findById(req.params.id);
    res.status(200).send({
      productsData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching product",
    });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const productsList = await ProductModel.find();
    res.status(200).send({
      productsList,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching products",
    });
  }
};

// Search All Products
const searchAllProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const productsList = await ProductModel.find({
      productTitle: { $regex: query, $options: "i" }, // Case-insensitive search
    });
    res.status(200).send({
      productsList,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in searching products",
    });
  }
};

// Get Products by Category
const getProductsByCategory = async (req, res) => {
  try {
    const productsList = await ProductModel.find({
      productCategory: req.params.id,
    });
    res.status(200).send({
      productsList,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching products by category",
    });
  }
};

// Add Product to Cart
const addCartList = async (req, res) => {
  try {
    const user = await UserAuthModel.findById(req.params.id);
    if (user) {
      if (!user.cartList.includes(req.params.productId)) {
        const addToCart = await UserAuthModel.findByIdAndUpdate(
          req.params.id,
          { $push: { cartList: { productId: req.params.productId } } }
        );

        await ProductModel.findByIdAndUpdate(
          req.params.productId,
          { $set: { productQuantity: 1 } },
          { new: true }
        );

        res.status(200).send({
          addToCart,
        });
      }
    } else {
      res.status(400).send({
        message: "Failed to add product to cart",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in adding product to cart",
    });
  }
};

// Remove Product from Cart
const removeCartList = async (req, res) => {
  try {
    const user = await UserAuthModel.findById(req.params.id);
    if (user) {
      const removeFromCart = await UserAuthModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { cartList: { productId: req.params.productId } } }
      );

      await ProductModel.findByIdAndUpdate(
        req.params.productId,
        { $set: { productQuantity: 0 } },
        { new: true }
      );

      res.status(200).send({
        removeFromCart,
      });
    } else {
      res.status(400).send({
        message: "Failed to remove product from cart",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in removing product from cart",
    });
  }
};

// Clear Cart Items
const clearCartItems = async (req, res) => {
  try {
    const clearCart = await UserAuthModel.findByIdAndUpdate(
      req.params.id,
      { $set: { cartList: [] } }
    );
    res.status(200).send({
      clearCart,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in clearing cart",
    });
  }
};

// Cart Items List
const cartItemsList = async (req, res) => {
  try {
    const user = await UserAuthModel.findById(req.params.id);
    if (user) {
      const cartItems = await Promise.all(
        user.cartList.map((e) => ProductModel.findById(e.productId))
      );

      res.status(200).send({
        cartItems,
      });
    } else {
      res.status(400).send({
        message: "No items in the cart",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching cart items",
    });
  }
};

// Update Quantity
const updateQuantity = async (req, res) => {
  try {
    const { value } = req.body;
    const product = await ProductModel.findById(req.params.productId);
    if (product) {
      const quantity = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        { $set: { productQuantity: product.productQuantity + value } },
        { new: true }
      );

      res.status(200).send({
        quantity,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in updating quantity",
    });
  }
};

export default {
  contact,
  allUsers,
  currentUserData,
  userprofileUpdate,
  getAllProducts,
  addCartList,
  removeCartList,
  clearCartItems,
  getProductById,
  cartItemsList,
  updateQuantity,
  getProductsByCategory,
  searchAllProducts,
};
