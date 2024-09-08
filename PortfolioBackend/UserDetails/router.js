const express=require('express');
const router=express.Router();
const User =require('./User.js')
router.route('/user').post(User.user);
router.route('/example').get(User.example);
module.exports=router;