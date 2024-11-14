const Product = require('../models/product')
const Cart = require('../models/cart')

class shopController {

    async getAllProducts(req, res) {
        const products = await Product.findAll()
        console.log(products)
        res.status(201).json({
            products: products
        })
    }
    
    async getCart(req, res) {
        const userCart = await req.user.getCart()
        console.log(userCart)
        const cartProducts = await userCart.getProducts()
        res.status(201).json({
            product: cartProducts
        })
    }
    async addProductToCart(req, res) {
        const userCart = await req.user.getCart();
        const productId = req.body.productId;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItems = await userCart.getProducts({ where: { id: productId } });
        let cartItem;

        if (cartItems.length > 0) {
            cartItem = cartItems[0];
            cartItem.cartItem.quantity += 1; 
            await cartItem.cartItem.save();
            return res.status(200).json({ message: 'Product quantity updated', cartItem });
        } else {
            cartItem = await userCart.addProduct(product, { through: { quantity: 1 } });
        }

        res.status(201).json({ message: 'Product added to cart', cartItem });
    }

    async removeProductFromCart(req, res) {
        const userCart = await req.user.getCart();
        const productId = req.body.productId;
        const cartItems = await userCart.getProducts({ where: { id: productId } });

        if (cartItems.length > 0) {
            const cartItem = cartItems[0];
            await cartItem.cartItem.destroy();
            res.status(200).json({ message: 'Product removed from cart' });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    }  
} 

module.exports = new shopController()