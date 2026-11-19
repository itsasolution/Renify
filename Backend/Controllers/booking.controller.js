const BookingModel = require('../models/bookings.model');

// start ride
const startRide = async (req, res) => {
    const { bookingId } = req.params;
    if (!bookingId) {
        return res.status(400).json({ message: "Booking Id is missing" });
    }

    try {
        const booking = await BookingModel.findById(bookingId).populate('user vehicle');
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "Ongoing";
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// complete Ride
const completeRide = async (req, res) => {
    const { bookingId } = req.params;

    if (!bookingId) {
        return res.status(400).json({ message: "Booking Id is missing" });
    }

    try {
        const booking = await BookingModel.findById(bookingId).populate("vehicle");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "Completed";
        await booking.save();

        // FIX: was "true" (string) — must be boolean true
        booking.vehicle.availability = true;
        await booking.vehicle.save();

        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const recentBooking = async (req, res) => {
    try {
        const booking = await BookingModel.findById(req.params.bookingId).populate("vehicle user provider");
        if (!booking) {
            return res.status(404).json({ message: "No bookings found" });
        }
        res.status(200).json(booking);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// finding ALL Provider Bookings
const findProviderBooking = async (req, res) => {
    const { providerId } = req.params;
    if (!providerId) {
        return res.status(400).json({ message: "Provider Id is missing" });
    }

    try {
        const bookings = await BookingModel.find({ provider: providerId }).populate('user vehicle');
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    findProviderBooking, startRide, completeRide, recentBooking
};
