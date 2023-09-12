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
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
},
isAvailbale:{
    type:Boolean,
    default:true
},
 
 
});

export default mongoose.model("hotel", hotelSchema)