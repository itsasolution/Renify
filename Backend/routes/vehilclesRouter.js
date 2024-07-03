const express = require('express');
const router = express.Router();

const { findvehicle, getAllVehicles } = require("../Controllers/vehicle.controller");
const { bookVehicle } = require('../Controllers/booking.controller');


router.get("/", getAllVehicles)

router.post("/findvehicle", findvehicle)

// BOOKING Vehicles
router.post("/book", bookVehicle)

module.exports = router;
