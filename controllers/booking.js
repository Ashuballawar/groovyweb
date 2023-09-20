const Booking=require('../models/booking')
const Room=require('../models/room')
const Hotel=require('../models/hotel')
  const mongoose=require('mongoose')




exports.bookroom=(async (req,res)=>{


    try{
     
if(req.body.startDate>req.body.endDate||new Date(req.body.startDate)<new Date()){
  return res.status(400).json({error:'Invalid Input'})
}

  console.log(req.body)
  const existingBooking = await Booking.findOne({$or:[{
    hotelID:new mongoose.Types.ObjectId(req.body.hotelID),
    roomID:new mongoose.Types.ObjectId(req.body.roomID),
     startDate: { $lte: req.body.startDate },
    endDate: { $gte: req.body.startDate },
    },{hotelID:new mongoose.Types.ObjectId(req.body.hotelID),
    roomID:new mongoose.Types.ObjectId(req.body.roomID),
     startDate: { $lte: req.body.endDate },
    endDate: { $gte: req.body.endDate }}]});

  if (existingBooking) {
    return res.status(404).json({ available: false, message: 'Room not available for selected dates.' });
  }
console.log((new Date(req.body.endDate)-new Date(req.body.startDate))/(1000 * 60 * 60 * 24))
    const newBooking = new Booking({
         hotelID:new mongoose.Types.ObjectId(req.body.hotelID),
         roomID:new mongoose.Types.ObjectId(req.body.roomID),
         userID:req.user._id,        
         startDate:req.body.startDate,
         endDate:req.body.endDate,
         TotalCost:(new Date(req.body.endDate)-new Date(req.body.startDate))/(1000 * 60 * 60 * 24)*Number(req.body.price)
    });
    let bookeddates=await Room.findOne({_id:new mongoose.Types.ObjectId(req.body.roomID),isAvailbale:true})
    
    
    let arr=bookeddates.bookedDates
   let date1=new Date(req.body.startDate)
   let date2=new Date(req.body.endDate)
    while (date1 <= date2) {
      arr.push(new Date(date1));
    
      date1.setDate(date1.getDate() + 1);
    }


     await Room.updateOne({_id:new mongoose.Types.ObjectId(req.body.roomID)},{$set:{bookedDates:arr}})
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
     