const room=require('../models/room')
const booking=require('../models/booking')
const Hotel=require('../models/hotel')
exports.getinfo=(async (req,res)=>{
     
    try{
      if(req.query.name.length!=0&&req.query.price>0){
        let hotelinfo=await Hotel.find(
            {isAvailable:true,pricePerDay:{$lt:req.query.price},name:req.query.name})
       
            let roominfo=await room.find({isAvailable:true,pricePerDay:{$lt:req.query.price}}).populate('hotelAdmin')
            return res.status(202).json({data:{room:roominfo,hotel:hotelinfo}})
        }
        else if(req.query.price>0){
            let hotelinfo=await Hotel.find({an$d:{isAvailable:true},pricePerDay:{$lt:req.query.price}})
            let roominfo=await room.find({$and:{isAvailable:true},pricePerDay:{$lt:req.query.price}}).populate('hotelAdmin')
            return res.status(202).json({data:{room:roominfo,hotel:hotelinfo}})
        }
        let roominfo=await room.find({isAvailable:true}).populate('hotelAdmin')
        let hotelinfo=await Hotel.find({isAvailable:true})
        res.status(202).json({data:{room:roominfo,hotel:hotelinfo}})
    
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

exports.mybooking=(async(req,res)=>{
   try{ let mybooking=await booking.find({userID:req.user_id}) 
   res.status(202).json({data:mybooking})
   }
   catch(err){
    res.status(500).json({err:error})
   }
})


exports.cancelbookin=(async(req,res)=>{
try{
         await booking.findOneAndDelete({$and:[{userID:req.user_id},{hotelID:req.params.id}]})
         await Hotel.updateOne({_id:req.params.id},{$set:{isAvailable:true}})
         res.status(202).json({msg:'booking cancel'})
}
catch(err){
    res.status(500).json({err:error})
}



})