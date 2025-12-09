const express= require('express');
const {getAllProducts, getFeaturedProducts}=require('../controllers/product.controller');
const router = express.Router();

const {protectRoute,adminRoute}=require('../middleware/auth.middleware');




router.get('/',protectRoute,adminRoute,getAllProducts);
router.get('/featured',getFeaturedProducts);
router.post('/',productRouter,adminRoute,createProduct)




module.exports=router;
