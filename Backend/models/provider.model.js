const mongoose = require('mongoose');
const { Schema } = mongoose
const plm = require('passport-local-mongoose')


const providerSchema = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle', // model name
    // required: true,
  },

  vehicles: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
  }],

  name: {
    type: String,
    required: true,
  },
  
  username: String,
  email: String,
  // contactInfo: {
  // phone: {
  //   type: String,
  //    required: true,
  // },
  // },
  address: {
    type: String,
    required: true,
  },
}, { timestamps: true });

providerSchema.plugin(plm)
module.exports = mongoose.model('Provider', providerSchema);

