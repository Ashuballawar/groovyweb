const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()

function isinvalid(a){
    if(a==undefined||a.length===0){
       return true;
    }
    return false;
 }

exports.adduserdata=async (req,res,next)=>{
        const Name=req.body.Name
        const Email=req.body.Email
        const Password=req.body.Password
        const isAdmin=req.body.isAdmin
       if(isinvalid(Name)||isinvalid(Email)||isinvalid(Password)){
        return res.status(400).json({err:' Something is missing'})
       }
        try{
            bcrypt.hash(Password,10,async(err,hash)=>{
                console.log(err)
                try{
                data=await User.create({Name:Name,Email:Email,Password:hash, isAdmin:isAdmin})
                res.status(201).json(data)}
                catch(err){
                    console.log('errr===',err.name)
                    if(err.name=="SequelizeUniqueConstraintError"){
                        res.status(403).json({error:'account already exist of this EmailId'})
                    }
                    else{res.status(500).json({error:err})}
                }
            }) 
      
        }
        catch(err){
            
           res.status(500).json({error:err})
        }
}

function generateAccessToken(Id,Name,isAdmin){
   return jwt.sign({userdatumId:Id,Name:Name,isAdmin},process.env.JWT_SECRET)
}

exports.userlogin=async (req,res,next)=>{
    const Email=req.body.Email
    const Password=req.body.Password

    if(isinvalid(Email)||isinvalid(Password)){
        return res.status(400).json({err:' Something is missing'})
       }
   
    try{
       
    let user=await User.find({'Email':Email})
    console.log(user)
    if(user[0]){
        bcrypt.compare(Password,user[0].Password,(err,result)=>{
           if(err){
            throw new Error('Something went wrong')
           }
           
            else if(result===true){
                 
                res.status(201).json({msg:'success',token:generateAccessToken(user[0].id,user[0].Name,user[0].isAdmin)})
            
            
            }
            else{
                res.status(401).json({msg:'Incorrect Password'})
            }
        })
       
    }   
    else{
        res.status(404).json({msg:'Incorrect EmailId'})
    } }

    catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
}
