const admin=require('../models/user')
const hotel=require('../models/hotel')
const room=require('../models/room')

exports.getHotel=(async(req,res)=>{
 try{
 
  if(req.user.isAdmin){
  
    let hotellist=await hotel.find({hotelAdmin:req.user._id})
    let roomlist=await hotel.find({hotelAdmin:req.user._id})
      res.status(203).json({data:{hotellist:hotellist,roomlist:roomlist}})
  
  }}
  catch(err){
    console.log(err)
    res.status(500).json({err:err})
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
    res.status(500).json({error:err})
   }

})


exports.addRoom=(async (req,res)=>{
    try{
    if(req.user.isAdmin){
        const hotelName=req.body.hotelName
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
     res.status(500).json({error:err})
    }
 
 })

 exports.removeHotel=(async(req,res)=>{
    try{
    
    const hotelId = req.params.hotelId;
  
    const Hotel = await hotel.findById(hotelId);
    if (!Hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
   
    await hotel.deleteById(hotelId) ;
    res.status(204).send();}

   catch (err) {
    res.status(400).json({ error: err});
  }
});


exports.removeRoom=(async(req,res)=>{
    try{
    
        const roomId = req.params.roomId;
  
    const Room = await room.findById(roomId );
    if (!Room) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
   
    await hotel.deleteById(roomId);
    res.status(204).send();}

   catch (err) {
    res.status(400).json({ error: err});
  }
});




