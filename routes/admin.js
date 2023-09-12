const express = require('express');
const getDataMiddleware=require('../middleware/auth')
const adminController = require('../controllers/admin');


const router = express.Router();

router.post('/addHotel',getDataMiddleware,adminController.addHotel)
router.post('/addRoom',getDataMiddleware,adminController.addRoom)
router.delete('/removeHotel',getDataMiddleware,adminController.removeHotel)
router.delete('/removeRoom',getDataMiddleware,adminController.removeRoom)

module.exports=router;
