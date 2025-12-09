const express= require('express');
const {getAllProducts, getFeaturedProducts,getProductsByCategory,getRecommendedProducts, createProduct,deleteProduct, toggleFeaturedProduct}=require('../controllers/product.controller');
const router = express.Router();

const {protectRoute,adminRoute}=require('../middleware/auth.middleware');




router.get('/',protectRoute,adminRoute,getAllProducts);
router.get('/featured',getFeaturedProducts);
router.get('/category/:category',getProductsByCategory);
router.get('/recommendations',getRecommendedProducts);
router.post('/',protectRoute,adminRoute,createProduct)
router.patch('/:id',protectRoute,adminRoute,toggleFeaturedProduct);
router.post('/:id',protectRoute,adminRoute,deleteProduct)





module.exports=router;
