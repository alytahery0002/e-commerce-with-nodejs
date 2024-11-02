const express = require('express');

const barberController=require('../controller/BarberController')


const router = express.Router();
// router.use(barberController.setBarber)

router.get('/:id',barberController.oneBarber)
router.post('/:id/getTime',barberController.getTime)

module.exports=router
