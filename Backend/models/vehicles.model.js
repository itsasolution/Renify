const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider', // model name
    required: true,
  },

  bookings: [{ // multiple bookings Array
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
  ,
  images: [String],
  type: {
    type: String,
    required: true,
    enum: ['Car', 'Bike'],
  },
  rating: Number,
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  rentPerDay: {
    type: Number,
    required: true,
  },
  rentPerHour: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    // required: true,
  }
  ,
  bookingInfo: {
    booked: {
      type: Boolean,
      default: false
    },
    bookingTime: {
      type: Date,  //bookingTime: new Date('2024-06-15T10:30:00'), 
    }
  }
}, { timestamps: true });


module.exports = mongoose.model('Vehicle', vehicleSchema);
