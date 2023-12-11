import { Router } from 'express';
import { showProductsTop10Female, showProductsTop10Male } from '../controllers/productController.mjs';
import { showProductsUnder500Female, showProductsUnder500Male } from '../controllers/productController.mjs';

// Local Modules

// Initialization
const router = Router();

// Requests
router.get('/', async (req, res) => {
    // Render the template and pass data
    let data = {
        title: 'dbwebb',
        counter: 0
    };

    req.session.items = (req.session.items) ? req.session.items : [];
    data.female = await showProductsTop10Female();
    data.male = await showProductsTop10Male();
    data.under500female = await showProductsUnder500Female();
    data.under500male = await showProductsUnder500Male();

    res.render('index', data);
});

export default router;
