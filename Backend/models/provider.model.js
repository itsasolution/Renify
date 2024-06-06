const mongoose = require('mongoose');
const { Schema } = mongoose
// const plm = require('passport-local-mongoose')


const providerSchema = new Schema({

  username: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    required: true,
  },

  vehicles: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle', // model name
  }],
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

// providerSchema.plugin(plm)
module.exports = mongoose.model('Provider', providerSchema);

