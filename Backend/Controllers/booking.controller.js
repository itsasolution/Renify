const VehicleModel = require("../models/vehicles.model");
const BookingModel = require("../models/bookings.model");
const UserModel = require('../models/user.model');

const bookVehicle = async (req, res) => {
    const { id, userId, bookingDate, startDate, endDate } = req.body;

    try {
        const vehicle = await VehicleModel.findById(id);
        if (!vehicle) {
            return res.status(404).send("Vehicle not found");
        }
        const booking = await BookingModel.create({
            user: userId,
            vehicle: id,
            provider: vehicle.providerId,
            bookingDate, startDate, endDate

        });

        vehicle.bookings.push(booking._id);
        vehicle.availability = false;
        await vehicle.save();

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.myRides.push(booking._id);
        await user.save();




        booking.provider = vehicle.providerId;
        await booking.save()

        res.status(201).json({ booking });
    } catch (err) {
        res.status(500).send(err);
    }
};


const findProviderBooking = async (req, res) => {
    const { providerId } = req.params;
    if (!providerId) {
        res.status(401).send("Provider Id is missing")
    }

    try {
        const bookings = await BookingModel.find({ provider: providerId }).populate('user vehicle');
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({ error });
    }
}

const cancelBooking = async (req, res) => {
    const { vid, uid } = req.body;
    try {
        const booking = await BookingModel.findOneAndDelete({
            vehicle: vid,
            user: uid
        });

        if (!booking) {
            return res.status(404).send("Booking not found");
        }

        // Remove booking from user's myRides
        const user = await UserModel.findById(uid);
        if (user) {
            user.myRides.pull(booking._id);
            await user.save();
        }

        // Update vehicle's availability
        const vehicle = await VehicleModel.findById(vid);
        if (vehicle) {
            vehicle.bookings.pull(booking._id);
            vehicle.availability = true;
            await vehicle.save();
        }

        res.status(200).send("Booking cancelled");
    } catch (err) {
        res.status(500).send(err);
    }
};
// for users
const checkBooking = async (req, res) => {
    const { uid, vid } = req.body;

    try {
        const booking = await BookingModel.findOne({
            user: uid,
            vehicle: vid
        });
        if (!booking) {
            res.status(404).send("No bookings found");
        }
        else
            res.status(200).json({ booking });

    } catch (err) {
        res.status(500).send(err);
    }
};


module.exports = {
    bookVehicle, cancelBooking, checkBooking, findProviderBooking
};
