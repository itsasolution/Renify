const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider', // model name
    required: true,
  },
  images: [String],
  type: {
    type: String,
    required: true,
    enum: ['Car', 'Bike'],
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
}, { timestamps: true });


module.exports = mongoose.model('Vehicle', vehicleSchema);
