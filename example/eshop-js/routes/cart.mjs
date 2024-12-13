import { Router } from 'express';
import { createOrder, createOrderItem, updateOrder } from "./../controllers/cartController.mjs";
import { getUserData } from "./../controllers/userController.mjs";
import { getShippingCost } from '../controllers/orderController.mjs';

const router = Router();

router.get('/cart', async (req, res) => {
    let data = {
        title: 'Kundvagn',
        message: ''
    };
    
    data.cartItems = (req.session.items) ? req.session.items : [];
    data.amountOfItems = data.cartItems.length;

    res.render('cart/cart', data);
});

router.post('/set-session-items', (req, res) => {
    const { items } = req.body;

    if (items && Array.isArray(items)) {
        req.session.items = items;
        res.status(200).send('Session items set successfully');
    } else {
        res.status(400).send('Invalid request payload');
    }
});

router.post('/cart/removeFromCart', (req, res) => {
    let cartItems = req.session.items;
    const itemId = parseInt(req.body.productId);

    cartItems.splice(cartItems.findIndex(item => item.productID === itemId), 1);
    req.session.items = cartItems;
    
    req.session.save();
    
    res.redirect(`/cart`);
});

router.post('/cart/removeAllFromCart', (req, res) => {
    req.session.items = [];
    req.session.save();
    
    res.redirect(`/cart`);
});

router.post('/cart/plusProduct', (req, res) => {
    let cartItems = req.session.items;
    const itemId = parseInt(req.body.productId);

    const index = cartItems.findIndex(item => item.productID === itemId);
    cartItems[index].amount +=1;
    req.session.items = cartItems;
    
    req.session.save();
    
    res.redirect(`/cart`);
});

router.post('/cart/minusProduct', (req, res) => {
    let cartItems = req.session.items;
    const itemId = parseInt(req.body.productId);

    const index = cartItems.findIndex(item => item.productID === itemId);
    cartItems[index].amount -=1;
    req.session.items = cartItems;
    
    req.session.save();
    
    res.redirect(`/cart`);
});

router.post('/cart/checkout', async (req, res) => {
    let data = {
        title: 'Kassa',
        message: ''
    };
    let weight = 0;
    
    data.cartItems = (req.session.items) ? req.session.items : [];
    data.amountOfItems = data.cartItems.length;

    for (let i = 0; i < data.amountOfItems; i++) {
        weight += data.cartItems[i].amount * data.cartItems[i].productWeight;
    }
    data.shipping = getShippingCost(weight);

    res.render('cart/checkout', data);
});

router.post('/cart/order', async (req, res) => {
    let sum = 0;
    let userId;
    let user;
    let weight = 0;
    const userResult = await getUserData(req.session.user);

    if (userResult && userResult.length > 0) {
        user = userResult[0];
        userId = user.userID;

        let order = await createOrder(userId, 1);
        const orderId = order[0][0].orderId;

        let data = {
            title: 'Ordernummer: ' + orderId,
            message: 'Thanks for your order!'
        };

        data.cartItems = (req.session.items) ? req.session.items : [];
        data.amountOfItems = data.cartItems.length;

        //create order items, update order
        try {
            for (let i = 0; i < data.amountOfItems; i++) {
                sum = sum + (data.cartItems[i].amount * data.cartItems[i].productSellPrize);
                weight += data.cartItems[i].amount * data.cartItems[i].weight;
                await createOrderItem(orderId, data.cartItems[i].productID, data.cartItems[i].amount);
            }
            data.shipping = getShippingCost(weight);
            const totalSum = sum + data.shipping;

            await updateOrder(orderId, totalSum, "Accepted");

        } catch (error) {
            console.log("Something went wrong: ", error);
        }

        data.userName = user.userFirstName + ' ' + user.userSurName;
        data.userAddress = user.userAddress + ', ' + user.userPostcode + ' ' + user.userCity;
        data.userMail = user.userMail;
        data.userPhone = user.userPhone;

        req.session.items = [];
        req.session.save();

        res.render('cart/order', data);
    } else {
        console.log("User not found or an error occurred.");
        res.redirect('/');
    }
});

export default router;
