const express = require('express');
const getDataMiddleware=require('../middleware/auth')
const userController = require('../controllers/user');
const bookingController=require('../controllers/booking')
const getinfocontroller=require('../controllers/getinfo')
const router = express.Router();


router.post('/signup',userController.adduserdata)
router.post('/signin',userController.userlogin)
router.get('/gethotel',getDataMiddleware,getinfocontroller.getinfo)
router.get('/gethotelfilter',getDataMiddleware,getinfocontroller.getfilter)
router.get('/getroom/:id',getDataMiddleware,getinfocontroller.getroom)
// router.post('/bookhotel',getDataMiddleware,bookingController.bookhotel)
router.post('/bookroom',getDataMiddleware,bookingController.bookroom)
router.get('/mybooking',getDataMiddleware,getinfocontroller.mybooking)
router.post('/cancel',getDataMiddleware,getinfocontroller.cancelbookin)
module.exports=router;



