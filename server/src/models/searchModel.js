const express = require('express');
const router = express.Router();

const { searchProducts } = require('./productModel'); 

// Search endpoint
router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const results = await searchProducts(query); 
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
