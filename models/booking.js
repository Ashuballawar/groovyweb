const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hotel',
    required: true,
  },
  roomID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  
});



module.exports = mongoose.model('Booking', bookingSchema);
