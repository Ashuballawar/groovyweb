const mongoose=require('mongoose')
const validator=require('validator')


const Schema=mongoose.Schema;
const userSchema=new Schema({
   
   Name:{
    type:String,
    required:true
   },
   Email:{
         type:String,
         required:true,
         unique:true,
          validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
          }
   },
   Password:{
            type:String,
            required:true
        },
   isAdmin:{
    type:Boolean,
  
   },

  


   


})

module.exports=mongoose.model('User',userSchema)