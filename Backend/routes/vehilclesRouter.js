const express = require('express');
const router = express.Router();

const { findvehicle, addReview, paginate, filterVehicle, updateVehicle, deleteVehicle,getAllVehicles } = require("../Controllers/vehicle.controller");
const {  recentBooking } = require('../Controllers/booking.controller');


router.get("/", paginate, filterVehicle)
router.get("/getAllVehicles", getAllVehicles)

router.get("/findvehicle/:vid", findvehicle)
router.post("/addreview/:vid", addReview)

// BOOKING Vehicles
router.post("/update/:id", updateVehicle,)
router.delete("/:id", deleteVehicle,)
router.get("/recentBooking/:bookingId", recentBooking)


module.exports = router;
