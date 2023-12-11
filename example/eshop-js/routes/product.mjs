import { Router } from 'express';
import { showSpecificProduct, searchProducts } from '../controllers/productController.mjs';

const router = Router();

router.get('/product/:id', async (req, res) => {
    let data = {
        title: "Products"
    };
    data.res = await showSpecificProduct(parseInt(req.params.id));
    data.loggedIn = (req.session.user) ? true : false;
    if (req.session.cartMessage) {
        data.cartMessage = req.session.cartMessage;
        req.session.cartMessage = null;
    } else {
        data.cartMessage ="";
    }
    req.session.currentItem = data.res;
    req.session.save();
    if (data.res == undefined) {
        res.redirect('/');
    } else {
        res.render('product/product', data);
    }
});

router.post('/product/:id', (req, res) => {
    let cartItem = req.session.currentItem;

    req.session.currentItem = null;
    if (req.body.addToCart) {
        cartItem.amount = (cartItem.amount) ? cartItem.amount + 1 : 1;
        req.session.items.push(cartItem);
        req.session.cartMessage = "Produkten finns nu i din kundvagn";
        req.session.save();
    }

    res.redirect(`/product/${req.params.id}`);
});

router.post('/search', async (req, res) => {
    let data = {
        title: 'Sökresultat',
        counter: 0
    };
    
    data.searchResult = await searchProducts(req.body.search);
    data.searchResultCount = data.searchResult.length;
    res.render('search/search', data);
});

export default router;
