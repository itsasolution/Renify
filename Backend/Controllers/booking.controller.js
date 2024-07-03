const VehicleModel = require("../models/vehicles.model");
const bookingModel = require("../models/bookings.model");
const userModel = require('../models/user.model');

const bookVehicle = async (req, res) => {

    const { id, userId, bookingDate, startDate, endDate } = req.body
    
    try {
        // const vehicle = await VehicleModel.findOne({ _id: id })
        const booking = await bookingModel.create(
            {
                user: userId,
                vehicle: id,
                bookingDate, startDate, endDate
            }
        )
        const user = await userModel.findOne({ _id: userId });
        user.myRides.push(booking._id);
        await user.save();
        
        const vehicle = await VehicleModel.findOne({ _id: id });
        vehicle.bookings.push(booking._id)
        vehicle.availability = false
        await vehicle.save();
        
        // user.populate("myRides")
        // res.send("")
        res.status(201).json({ booking })


    } catch (err) {
        res.send(err)
    }
}
module.exports = {
    bookVehicle
}