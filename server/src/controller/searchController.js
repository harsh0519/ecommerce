const Product = require('./models/searchModel'); 

// Function to search products in the database
async function searchProducts(query) {
  return Product.find({ name: { $regex: query, $options: 'i' } }); // MongoDB example
  // For SQL, you might use something like:
  // return db.query('SELECT * FROM products WHERE name LIKE ?', [`%${query}%`]);
}

module.exports = { searchProducts };
