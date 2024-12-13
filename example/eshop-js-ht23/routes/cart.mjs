import { Router } from 'express';

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
        message: '',
        shipping: 69
    };
    
    data.cartItems = (req.session.items) ? req.session.items : [];
    data.amountOfItems = data.cartItems.length;

    res.render('cart/checkout', data);
});

router.post('/cart/order', async (req, res) => {
    let data = {
        title: 'Ordernummer ???',
        message: 'Thanks for your order!',
        shipping: 69
    };

    data.cartItems = (req.session.items) ? req.session.items : [];
    data.amountOfItems = data.cartItems.length;
    
    // Create an order for the customer
    // Update title with order number
    // Update data with customer info
    data.userName = "First name" + ' ' + "Last name";
    data.userAddress = "User address" + ', ' + "User post code" + ' ' + "User city";
    data.userMail = "Customer email address";
    data.userPhone = "123456";

    req.session.items = [];
    req.session.save();

    res.render('cart/order', data);
});

export default router;
