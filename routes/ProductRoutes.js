const express=require('express')

const product=require('../controller/ProductController')

const router = express.Router();

router.get('/',product.index)
router.get('/create',product.create)
// router.put('/',product.update)
// router.delete('/',product.delete)

module.exports=router