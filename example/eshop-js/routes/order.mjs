import { Router } from 'express';
import { getUserData } from '../controllers/userController.mjs';
import { getUserOrders, getOneOrder, getShippingCost } from '../controllers/orderController.mjs';
import { showSpecificProduct } from '../controllers/productController.mjs';

const router = Router();

router.get('/orders', async (req, res) => {
    let data = {
        title: 'Dina ordrar',
        message: '',
        orderItems: []
    };
    
    try {
        const userEmail = req.session.user;
        const userResult = await getUserData(userEmail);
        
        if (userResult && userResult.length > 0) {
            const userId = userResult[0].userID;
            const orders = await getUserOrders(userId);
            data.orderItems = orders;
        } else {
            data.message = "User not found or an error occurred. Log in and try again!";
        }

        res.render('order/orders', data);
    } catch (error) {
        console.error('Error fetching orders:', error);
        data.message = "An error occurred while fetching your orders.";
        res.render('order/orders', data);
    }
});

router.get('/order/:id', async (req, res) => {
    let data = {
        title: "Ordernummer " + req.params.id,
        products: [],
        message: ''
    };
    let weight = 0;

    try {
        const userEmail = req.session.user;
        const userResult = await getUserData(userEmail);
        
        if (userResult && userResult.length > 0) {
            const order = await getOneOrder(parseInt(req.params.id));
            data.orderItems = order;

            for (const item of data.orderItems) {
                const productInOrder = await showSpecificProduct(item.productID);
                data.products.push(productInOrder);
                weight += item.productAmount * productInOrder.productWeight;
            }
            data.weight = weight;
            data.shipping = getShippingCost(weight);
            data.loggedIn = (req.session.user) ? true : false;
        } else {
            data.message = "User not found or an error occurred. Log in and try again!";
            data.orderItems = [];
        }

        res.render('order/orderInfo', data);
    } catch (error) {
        console.error('Error fetching order:', error);
        data.message = "An error occurred while fetching your order.";
        data.orderItems = [];
        res.render('order/orderInfo', data);
    }
});

export default router;
