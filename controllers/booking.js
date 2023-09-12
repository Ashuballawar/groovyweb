const Booking=require('../models/booking')
const Room=require('../models/room')
const Hotel=require('../models/hotel')
  




exports.bookroom=(async (req,res)=>{


    try{
       const hotelID=req.body.hotelID
       const roomID=req.body.roomID
       const userID=req.body.userID        
       const startDate=req.body.startDate
       const endDate=req.body.endDate
    const bookingData = req.body; 
    const newBooking = new Booking(
         hotelID=req.body.hotelID,
         roomID=req.body.roomID,
         userID=req.body.userID,        
         startDate=req.body.startDate,
         endDate=req.body.endDate
    );
    await Room.updateOne({_id:req.body.roomID},{$set:{isAvailable:false}})
    await newBooking.save();
   
    res.status(201).json(newBooking);
  }
  
  catch (error) {
    res.status(400).json({ error: error.message });
  }

})


  exports.bookhotel=(async (req,res)=>{
    try{
        const hotelID=req.body.hotelID
      
       const userID=req.body.userID        
       const startDate=req.body.startDate
       const endDate=req.body.endDate
    const bookingData = req.body; 
    const newBooking = new Booking(
         hotelID=req.body.hotelID,
       
         userID=req.body.userID,        
         startDate=req.body.startDate,
         endDate=req.body.endDate
    );
    await Hotel.updateOne({_id:req.body.hotelID},{$set:{isAvailable:false}})
    await newBooking.save();
      }
      
      catch (error) {
        res.status(400).json({ error: error.message });
      }})
    