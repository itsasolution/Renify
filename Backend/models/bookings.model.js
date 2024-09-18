const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    cost:  { type: Number, required: true },
    passCode:  { type: Number, required: true },
    journeyTime:  { type: String, required: true },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },

    bookingDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Booked', 'Completed', "Ongoing"], default: 'Booked'
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
mongoose.models.Booking

module.exports = Booking;
