import { Router } from 'express';
import { getAllCategoriesGender, getSpecificCategory, getAllSubCategories, getProductsFromSpecificCategory } from '../controllers/categoryController.mjs';

const router = Router();

router.get('/category', async (req, res) => {
    let data = {
        title: 'Kategorier',
        title1: 'Damkläder',
        title2: 'Herrkläder'
    };
    data.categoriesFemale = await getAllCategoriesGender(0);
    data.categoriesMale = await getAllCategoriesGender(1);

    res.render('category/categories', data);
});

router.post('/category', (req, res) => {
    res.send('This is the category route (POST)');
});

// Requests
router.get('/category/:parentId', async (req, res) => {
    // Shows all the subcategories within a product category for a gender
    let data = {
        title: 'Kategori'
    };
    data.category = await getSpecificCategory(parseInt(req.params.parentId)) ? [] : 0;
    data.categories = await getAllSubCategories(parseInt(req.params.parentId));

    res.render('category/specificCategory', data);
});

router.get('/category/category/:categoryId', async (req, res) => {
    // Shows all the products with in a subcategory for a gender
    let data = {
        title: ''
    };
    data.title = req.params.categoryName;
    data.products = await getProductsFromSpecificCategory(parseInt(req.params.categoryId));

    res.render('category/productsInCategory', data);
});

export default router;
