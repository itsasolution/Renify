const mongoose = require("mongoose");
const plm = require('passport-local-mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
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
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  myRides: [{
    type: Schema.Types.ObjectId,
    ref: 'Ride',
  }],
}, { timestamps: true });


userSchema.plugin(plm)
module.exports = mongoose.model("user", userSchema)
