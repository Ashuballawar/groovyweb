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
        let bookinfo=await booking.findByIdAndDelete({_id:req.body.id})
        let bookedroom=await room.find({_id:req.body.roomid})
        let date1=new Date(bookinfo.startDate)
        let date2=new Date(bookinfo.endDate)
        console.log(bookedroom)
    let bookeddate1=bookedroom[0].bookedDates.filter(e=>{
        return e<date1
    })
    let bookeddate2=bookedroom[0].bookedDates.filter(e=>{
        return e>date2
    })
    let bookeddate=[...bookeddate1,...bookeddate2]
    console.log('=====>',bookeddate)
    await room.updateOne({_id:req.body.roomid},{$set:{isAvailable:true}})
        //  await Hotel.updateOne({_id:req.body.hotelid},{$set:{isAvailable:true}})
         await room.updateOne({_id:req.body.roomid},{$set:{bookedDates:bookeddate}})
        
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
    let roomlist=await room.find({isAvailbale:true,hotelName:hotel[0]._id,price:{ $gt:req.query.lower, $lt:req.query.greater},})
   let arr=[]
    let date1=new Date(req.query.startDate)
        let date2=new Date(req.query.endDate)
        while (date1 <= date2) {
            arr.push(new Date(date1));
          
            date1.setDate(date1.getDate() + 1);
          }

   
    roomlist.forEach(e => {
        e.bookedDates.forEach((e,index,arr)=>{
             if(arr.includes(e)){
                let i=arr.indexOf(e)
                arr.splice(i,1)
             }
        })
          
        })
     
    res.staus(200).json({roomlist:roomlist,datesavailable:arr})
}
catch(err){
    console.log(err)
    res.status(500)
}

})


