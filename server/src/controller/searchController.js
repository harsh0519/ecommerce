const Product = require('./models/searchModel'); 

// Function to search products in the database
async function searchProducts(query) {
  // For SQL, you might use something like:
  return db.query('SELECT * FROM products WHERE name LIKE ?', [`%${query}%`]);
}

module.exports = { searchProducts };
