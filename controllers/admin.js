const admin=require('../models/user')
const hotel=require('../models/hotel')
const room=require('../models/room')
const mongoose = require('mongoose');
exports.getHotel=(async(req,res)=>{
 try{
 
  if(req.user.isAdmin){
  
    let hotellist=await hotel.find({hotelAdmin:req.user._id})
    // let roomlist=await hotel.find({hotelAdmin:req.user._id})
    console.log(hotellist)
      res.status(203).json(hotellist)
  
  }}
  catch(err){
    console.log(err)
    res.status(500).json({err:err})
  }
})

exports.getRoom=(async(req,res)=>{
try{
  var id =new mongoose.Types.ObjectId(req.params.id)
  // console.log('req params ',req.params.id)
  let roomslist=await room.find({hotelName:id})
  res.status(203).json(roomslist)
}
catch(err){
  console.log(err)
  res.status(500)
}


})

exports.addHotel=(async (req,res)=>{
   try{
   if(req.user.isAdmin){
    const name=req.body.name     
     const city=req.body.city    
     const Price=req.body.Price    
     const hotelAdmin=req.user._id
    const isAvailbale=true
     
     
    const newHotel = new hotel({
        name:name,   
         city:city, 
         Price:Price,   
         hotelAdmin:hotelAdmin,
        isAvailbale:true});
    await newHotel.save();
    res.status(201).json(newHotel);
   }
   else{
    throw new Error("Access denied for non-admin users." )
   }
   }
   catch(err){
    console.log(err)
    res.status(500).json({error:err})
   }

})


exports.addRoom=(async (req,res)=>{
    try{
    if(req.user.isAdmin){
       
      let hotelinfo=await hotel.find({name:req.body.hotelName})
      console.log(hotelinfo)
      const hotelName=hotelinfo[0]._id
        const hotelAdmin=req.user._id
        const roomType=req.body.roomType       
        const pricePerDay=req.body.pricePerDay
        const isAvailbale=true         
            
        
    
     const newRoom = new room({
      
      
      hotelName:hotelName,
        hotelAdmin:hotelAdmin,
        roomType:roomType ,      
        pricePerDay:pricePerDay,
        isAvailbale:isAvailbale});
     await newRoom.save();
     res.status(201).json(newRoom);
    }
    else{
     throw new Error("Access denied for non-admin users." )
    }
    }
    catch(err){
      console.log(err)
     res.status(500).json({error:err})
    }
 
 })

 exports.removeHotel=(async(req,res)=>{
    try{
      var id =new mongoose.Types.ObjectId(req.params.hotelId)
    
  
    const Hotel = await hotel.findById(id);
    if (!Hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
   
    await hotel.findByIdAndDelete(id) ;
    res.status(204).send();}

   catch (err) {
    console.log(err)
    res.status(400).json({ error: err});
  }
});


exports.removeRoom=(async(req,res)=>{
    try{
      var id =new mongoose.Types.ObjectId(req.params.roomId)
    
  
      const Room = await room.findById(id);
      
        
  
    
    if (!Room) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
   
    await room.findByIdAndDelete(id);
    res.status(204).send();}

   catch (err) {
    res.status(400).json({ error: err});
  }
});




