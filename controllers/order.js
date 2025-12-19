const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const OrderItem = require('../models/order-items');

class orderController {
    
    async placeOrder(req, res) {
        try {
            const userCart = await req.user.getCart();
            const cartProducts = await userCart.getProducts();

            if (!cartProducts || cartProducts.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }

            const order = await req.user.createOrder();

            const orderItems = cartProducts.map(product => {
                return {
                    productId: product.id,
                    quantity: product.cartItem.quantity,
                    orderId: order.id
                };
            });

            await OrderItem.bulkCreate(orderItems);

            await userCart.setProducts(null);

            res.status(201).json({ message: 'Order placed successfully', order });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to place order' });
        }
    }

    async getUserOrders(req, res) {
        try {
            const orders = await req.user.getOrders({
                include: [{ model: Product }]
            });

            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: 'No orders found' });
            }

            res.status(200).json({ orders });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve orders' });
        }
    }
}

module.exports = new orderController();