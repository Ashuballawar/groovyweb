const mongoose=require('mongoose')
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  city: {
    type: String,
    required: true,
  }, 
 
  Price:{
    type:Number,
    required:true

  },
 

 hotelAdmin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
isAvailbale:{
    type:Boolean,
    default:true
},
 
 
});

module.exports=mongoose.model("hotel", hotelSchema)