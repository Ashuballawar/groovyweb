const jwt=require('jsonwebtoken')

const User=require('../models/user')
require('dotenv').config()
const authenticate=async (req,res,next)=>{
      try{
        let token=req.header('Authorization')
        const Token=jwt.verify(token,process.env.JWT_SECRET)
      
        let user =await User.findById(Token.userId)
            console.log('======>',user)
        req.user=user;
        next();
      }
      catch(err){
        console.log(err)
            return res.status(500).json({msg:err})
      } 
}

module.exports=authenticate