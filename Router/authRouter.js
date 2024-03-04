const {signup,signin,getUser}=require('../Controllers/userController')
const authMiddle = require('../MiddleWare/authMiddle');
const express= require('express')
const router = express.Router();
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/getuser',authMiddle,getUser)
module.exports=router