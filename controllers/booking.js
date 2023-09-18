const Booking=require('../models/booking')
const Room=require('../models/room')
const Hotel=require('../models/hotel')
  const mongoose=require('mongoose')




exports.bookroom=(async (req,res)=>{


    try{
     


  console.log(req.body)
  const existingBooking = await Booking.findOne({$or:[{
    hotelID:new mongoose.Types.ObjectId(req.body.hotelID),
    roomID:new mongoose.Types.ObjectId(req.body.roomID),
     startDate: { $lt: req.body.startDate },
    endDate: { $gt: req.body.startDate },
    },{hotelID:new mongoose.Types.ObjectId(req.body.hotelID),
    roomID:new mongoose.Types.ObjectId(req.body.roomID),
     startDate: { $lt: req.body.endDate },
    endDate: { $gt: req.body.endDate }}]});

  if (existingBooking) {
    return res.status(404).json({ available: false, message: 'Room not available for selected dates.' });
  }

    const newBooking = new Booking({
         hotelID:new mongoose.Types.ObjectId(req.body.hotelID),
         roomID:new mongoose.Types.ObjectId(req.body.roomID),
         userID:req.user._id,        
         startDate:req.body.startDate,
         endDate:req.body.endDate
    });
    // await Room.updateOne({_id:new mongoose.Types.ObjectId(req.body.roomID)},{$set:{isAvailbale:false}})
    await newBooking.save();
   
    res.status(201).json(newBooking);
  }
  
  catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }

})


  // exports.bookhotel=(async (req,res)=>{
  //   try{
  //     console.log(req.body)
  //     const existingBooking = await Booking.findOne({
  //       hotelID:new mongoose.Types.ObjectId(req.body.hotelID),
  //       roomID:null,
  //       startDate: { $gt: req.body.startDate },
  //       endDate: { $lt:req.body.startDate },
  //     });
  //     if (existingBooking) {
  //       return res.status(404).json({ available: false, message: 'Hotel not available for selected dates.' });
  //     }
   
  //   const newBooking = new Booking({
      
  //        hotelID:new mongoose.Types.ObjectId(req.body.hotelID),
       
  //        userID:req.user._id,   
  //        startDate:req.body.startDate,
  //        endDate:req.body.endDate
  //    });
     
  //   // console.log(mongoose.Types.ObjectId(req.body.hotelID))
  //   //  let res=await Hotel.findOneAndUpdate({_id:new mongoose.Types.ObjectId(req.body.hotelID)},{isAvailbale:false})
  //   // console.log('res        ',res)
    
  //    await newBooking.save();
  //     }
      
  //     catch(error) {
  //       console.log(error)
  //       res.status(400).json({ error: error });
  //     }})
     