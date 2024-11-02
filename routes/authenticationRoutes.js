const express=require('express')

const authentication=require('../controller/AuthenticationController')

const router=express.Router()

router.post('/register',authentication.register)
router.post('/login',authentication.login)
// router.post('forgetPassword',authentication.forgetPassword)
// router.post('resetPassword',authentication.resetPassword)


module.exports=router