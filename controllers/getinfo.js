const room=require('../models/room')
const booking=require('../models/booking')
const Hotel=require('../models/hotel')
const mongoose=require('mongoose')
exports.getinfo=(async (req,res)=>{
     
    try{


        //if filter apply by user
        
    //   if(req.query.name.length!=0&&req.query.price>0){
    //     let hotelinfo=await Hotel.find(
    //         {isAvailable:true,pricePerDay:{$lt:req.query.price},name:req.query.name})
       
           
    //         return res.status(202).json({data:{hotel:hotelinfo}})
    //     }
    //     else if(req.query.price>0){
    //         let hotelinfo=await Hotel.find({isAvailable:true},{pricePerDay:{$lt:req.query.price}})
    //         let roominfo=await room.find({isAvailable:true},{pricePerDay:{$lt:req.query.price}}).populate('hotelAdmin')
    //         return res.status(202).json({data:{room:roominfo,hotel:hotelinfo}})
    //     }
    //       else if(req.query.name.length!=0){
    //         let hotelinfo=await Hotel.find(
    //             {isAvailable:true,name:req.query.name})
           
             
    //             return res.status(202).json({data:{hotel:hotelinfo}})
    //     }
    

        //  let roominfo=await room.find({isAvailable:true}).populate('hotelAdmin')
         let hotelinfo=await Hotel.find({isAvailbale:true})
         console.log('hotel info',hotelinfo)
        res.status(202).json({hotel:hotelinfo})
    
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
})
exports.getroom=(async(req,res)=>{
try{
    let resdata=await room.find({isAvailbale:true},{hotelName:new mongoose.Types.ObjectId(req.params.id)}).select("_id roomType pricePerDay")
       res.status(202).json({resdata})
}
catch(err){
    console.log(err)
    res.status(500)
}
})



exports.mybooking=(async(req,res)=>{
    console.log(req.user)
   try{ let mybooking=await booking.find({userID:req.user._id}).populate('roomID')
  console.log(mybooking)
   res.status(202).json(mybooking)
   }
   catch(err){
    console.log(err)
    res.status(500).json({err:err})
   }
})


exports.cancelbookin=(async(req,res)=>{
try{
         await booking.findOneAndDelete({$and:[{userID:req.user_id},{hotelID:req.params.id}]})
         await Hotel.updateOne({_id:req.params.id},{$set:{isAvailable:true}})
         res.status(202).json({msg:'booking cancel'})
}
catch(err){
    res.status(500).json({err:err})
}



})