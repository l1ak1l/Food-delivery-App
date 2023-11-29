const express = require("express")
const router = express.Router()
const user = require('../Models/User')
const { body , validationResult} = require("express-validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const secret ="AmmarAliKhan";
router.post("/createuser",
body('email').isEmail(),
body('name').isLength({min : 3}),
body('password').isLength({min : 5})
, async(req,res)=>{
 const error = validationResult(req);
 if(!error.isEmpty()) {
  return res.status(400).json({errors: error.array()});
 }

 const salt = await bcrypt.genSalt(10)
 let secpass = await bcrypt.hash(req.body.password,salt) 

 try{
   await user.create({
    name: req.body.name,
    password: secpass,
    email: req.body.email,
    location: req.body.location
   }).then(
   res.json({success:true}))
 }
 catch(err){
   console.log(err)
   res.json({success:false})
 }
})
router.post("/loginuser",[
body('email').isEmail(),
body('password').isLength({min : 5})]
, async(req,res)=>{
 const error = validationResult(req);
 if(!error.isEmpty()) {
  return res.status(400).json({errors: error.array()});
 }
 let Email = req.body.email
 
 try{
    let userData = await user.findOne({email:Email})
    if (!userData) {
      return res.status(400).json({errors : "Invalid Credentials"})
   }
    const passCompare = await bcrypt.compare(req.body.password,userData.password)
   if(!passCompare){
    return res.status(400).json({errors : "Invalid Password Credentials"})
   }
   const data = {
    user:{
      id : userData.id
    }
   }
   const authToken = jwt.sign(data,secret)
   return res.json({success:true,authToken:authToken})
 }
 catch(err){
   console.log(err)
   res.json({success:false})
 }
})
module.exports = router