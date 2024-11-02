const express = require('express');

const storeController=require('../controller/StoreController')
const ProductController=require('../controller/ProductController')
const {protect}=require("../controller/AuthenticationController")


const router = express.Router();
// router.use(storeController.setStore)

router.get('/:id',storeController.oneStore)
router.post('/buildStore',storeController.buildStore)
router.post('/addToStore',storeController.addToStore)
router.post('/:id/sendRequestToBarber',storeController.sendRequestToBarber)

router.get('/:id/product',ProductController.index)

router.post('/:id/product/create',ProductController.create)
router.put('/:id/product/update',ProductController.update)
router.delete('/:id/product/delete',ProductController.delete)


module.exports=router