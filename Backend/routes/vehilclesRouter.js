const express = require('express');
const router = express.Router();
const VehicleModel = require("../models/vehicles.model");
const { route } = require('./userRouter');
const bookingModel = require("../models/bookings.model");
const userModel = require('../models/user.model');


router.get("/", async (req, res) => {
    try {
        const vehicles = await VehicleModel.find({});
        res.status(200).json(vehicles)
        // sends list of objescts recieved in frontend by axis
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.post("/findvehicle", async (req, res) => {
    try {
        const vehicle = await VehicleModel.findOne({ _id: req.body.id });
        if (!vehicle)
            res.status(404).json("No such a vehicle available")

        else {
            vehicle.populate()
            res.status(200).json(vehicle) // object
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})

// BOOKING Vehicles
router.post("/book", async (req, res) => {

    const { id, userId, bookingDate, startDate, endDate } = req.body

    try {
        // const vehicle = await VehicleModel.findOne({ _id: id })
        const booking = await bookingModel.create(
            {
                user: userId,
                vehicle: id,
                bookingDate,
                startDate,
                endDate
            }
        )

        const user = userModel.findOne({ _id: userId });
        user.myRides.push(booking._id)
        await user.save();

        const vehicle = VehicleModel.findOne({ _id: id });
        vehicle.bookings.push(booking._id)
        vehicle.availability = false
        await vehicle.save();


        // user.populate("myRides")
        res.send("sdfdf")
        res.status(300).json({ message: "TRUE" })


    } catch (err) {

        res.send(err)
    }


})

module.exports = router;
