import { Router } from 'express';

const router = Router();

router.get('/orders', async (req, res) => {
    let data = {
        title: 'Dina ordrar',
        message: ''
    };
    
    data.orderItems = (req.session.orders) ? req.session.orders : [];

    res.render('order/orders', data);
});

export default router;
