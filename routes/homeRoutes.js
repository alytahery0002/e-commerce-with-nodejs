const express = require('express');

const homeController=require('../controller/HomeController')
const barberController=require('../controller/BarberController')


const router = express.Router();

// router.get('/',homeController.index)

router.get('/search',homeController.search)




module.exports = router;
