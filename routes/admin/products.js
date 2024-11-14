const express = require('express')
const router = express.Router()
const productController = require('../../controllers/admin/product')

router.post('/product/add', (req, res) => productController.addProduct(req, res))
router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductForEdit); 
router.post('/product/:id', productController.updateProduct); 
router.delete('/product/:id', productController.deleteProduct);

module.exports = router