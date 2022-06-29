const express = require('express');
const router = express.Router();
const authrization = require('../config/jwttoken')
const products = require('../controller/products')

router.get('/:number_page', products.product)
router.post('/addproduct', authrization, products.addproduct)

router.put('/edit/:product_id', authrization, products.editproduct)
      .delete('/edit/:product_id', authrization, products.deleteproduct)



module.exports = router