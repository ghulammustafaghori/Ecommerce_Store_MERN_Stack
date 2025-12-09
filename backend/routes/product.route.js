const express= require('express');
const {getAllProducts}=require('../controllers/product.controller');
const router = express.Router();

const {protectRoute,adminRoute}=require('../middleware/auth.middleware');

router.get('/',protectRoute,adminRoute,getAllProducts);

module.exports=router;