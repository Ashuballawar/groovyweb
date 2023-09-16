const mongoose=require('mongoose')

const roomSchema=new mongoose.Schema({
    hotelName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'hotel',
        required:true
    },
    hotelAdmin:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true
    },
    roomType:{
        type:String,
        required:true

    },
   
    pricePerDay:{
        type:Number,
        required:true
    },
    isAvailbale:{
        type:Boolean,
        required:true
    },



})
module.exports=mongoose.model('Room',roomSchema)