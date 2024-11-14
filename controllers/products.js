const Product = require('../models/product')

class productController {
    
    async getAllProdcuts(req, res) {
        const products = await Product.findAll()
        console.log(products)
        res.status(201).json({
            products: products
        })
    }
    async getProductById(req, res) {
        try {
            const productId = req.params.id; 
            const product = await Product.findByPk(productId);
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } 
}  

module.exports = new productController()