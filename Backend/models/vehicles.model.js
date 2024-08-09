const mongoose = require('mongoose');
const { stringify } = require('postcss');

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
    enum: ['car', 'bike'],
  },

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
  },
  city: String,

  overallRating: {
    type: Number, default: 0
  },

  reviews: [
    {
      // user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      user: String,
      date: Date,
      rating: { type: Number, default: 0, min: 1, max: 5 },
      text: String,
    }]
}, { timestamps: true });


module.exports = mongoose.model('Vehicle', vehicleSchema);
