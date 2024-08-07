const express = require('express');
const router = express.Router();

const { findvehicle, addReview, paginate, filterVehicle, updateVehicle,deleteVehicle } = require("../Controllers/vehicle.controller");
const { bookVehicle, cancelBooking, checkBooking } = require('../Controllers/booking.controller');


router.get("/", paginate, filterVehicle)

router.get("/findvehicle/:vid", findvehicle)
router.post("/addreview/:vid", addReview)

// BOOKING Vehicles
router.post("/checkBooking", checkBooking)
router.post("/book", bookVehicle)
router.post("/cancelBooking", cancelBooking)
router.post("/update/:id", updateVehicle,)
router.delete("/:id", deleteVehicle,)


module.exports = router;
