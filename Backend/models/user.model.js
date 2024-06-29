const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  myRides: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking',
  }],

  contact: {
    address: String,
    mobileNumber: Number,
  },

  documents: {
    aadharNumber: Number,
    licenseNumber: String
  }

}, { timestamps: true });


module.exports = mongoose.model("user", userSchema)
