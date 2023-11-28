const express = require("express")
const router = express.Router()
const user = require('../Models/User')
const { body , validationResult} = require("express-validator")
router.post("/createuser",
body('email').isEmail(),
body('name').isLength({min : 3}),
body('password').isLength({min : 5})
, async(req,res)=>{
 const error = validationResult(req);
 if(!error.isEmpty()) {
  return res.status(400).json({errors: error.array()});
 }
 try{
   await user.create({
    name: req.body.name,
    password: req.body.password,
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
   if(req.body.password !== userData.password){
    return res.status(400).json({errors : "Invalid Password Credentials"})
   }
   return res.json({success:true})
 }
 catch(err){
   console.log(err)
   res.json({success:false})
 }
})
module.exports = router