const BookingModel = require('../models/bookings.model');

// start ride
const startRide = async (req, res) => {
    const { bookingId } = req.params;
    if (!bookingId) {
        res.status(401).send("Booking Id is missing")
    }

    try {
        const booking = await BookingModel.findById(bookingId).populate('user vehicle');
        if (booking) {
            booking.status = "Ongoing";
            await booking.save();
            res.status(200).send(booking);
        }
    } catch (error) {
        res.status(500).send({ err: error.message });
    }
}

// complete Ride
const completeRide = async (req, res) => {

    const { bookingId } = req.params;

    if (!bookingId)
        res.status(401).send("Booking Id is missing")

    try {
        const booking = await BookingModel.findById(bookingId).populate("vehicle");
        if (booking) {
            booking.status = "Completed";
            await booking.save();
            booking.vehicle.availability = "true";
            await booking.vehicle.save();

            res.status(200).send(booking);
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ error, message: error.message });
    }
}


const recentBooking = async (req, res) => {
    try {
        const booking = await BookingModel.findById(req.params.bookingId).populate("vehicle user provider");
        if (!booking) {
            res.status(404).send("No bookings found");
        }
        else
            res.status(200).json(booking);

    } catch (err) {
        res.status(500).send({ err, message: err.message });
    }
};


// finding ALL PRovider Bookings
const findProviderBooking = async (req, res) => {
    const { providerId } = req.params;
    if (!providerId) {
        res.status(401).send("Provider Id is missing")
    }

    try {
        const bookings = await BookingModel.find({ provider: providerId }).populate('user vehicle');
        res.status(200).send(bookings);
    } catch (error) {
        console.error(error)
        res.status(500).send({ err: error.message });
    }
}


module.exports = {
    findProviderBooking, startRide, completeRide, recentBooking
};
