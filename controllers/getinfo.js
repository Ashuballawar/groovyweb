const room=require('../models/room')
const booking=require('../models/booking')
const Hotel=require('../models/hotel')
const mongoose=require('mongoose')
exports.getinfo=(async (req,res)=>{
     
    try{


           

         let hotelinfo=await Hotel.find({isAvailbale:true})
         console.log('hotel info',hotelinfo)
        res.status(200).json({hotel:hotelinfo})
    
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
})
exports.getroom=(async(req,res)=>{
try{
    let resdata=await room.find({isAvailbale:true},{hotelName:new mongoose.Types.ObjectId(req.params.id)}).select("_id roomType pricePerDay")
       res.status(200).json({resdata})
}
catch(err){
    console.log(err)
    res.status(500)
}
})



exports.mybooking=(async(req,res)=>{
    console.log(req.user)
   try{ let mybooking=await booking.find({userID:req.user._id}).populate('roomID').populate('hotelID')
  console.log(mybooking)
   res.status(200).json(mybooking)
   }
   catch(err){
    console.log(err)
    res.status(500).json({err:err})
   }
})


exports.cancelbookin=(async(req,res)=>{
try{console.log(req.body)
         await booking.findOneAndDelete({_id:req.body.id})
         await Hotel.updateOne({_id:req.body.hotelid},{$set:{isAvailable:true}})
         await room.updateOne({_id:req.body.roomid},{$set:{isAvailable:true}})
         res.status(200).json({msg:'booking cancel'})
}
catch(err){
    console.log(err)
    res.status(500).json({err:err})
}



})


exports.getfilter=(async (req,res)=>{
try{
   console.log(req.body)
          let hotel=await Hotel.find({name:req.query.Name})
    let roomlist=await room.find({isAvailbale:true,hotelName:hotel._id,price:{ $gt:req.query.lower, $lt:req.query.greater},})
    let availableroom=[]
    roomlist.forEach(e => {
        availableroom=e.bookedDates.filter(x=>{
            return (x!=req.query.startdate||x!=req.query.enddate)
        })
     });
    res.staus(200).json(availableroom)
}
catch(err){
    console.log(err)
    res.status(500)
}

})