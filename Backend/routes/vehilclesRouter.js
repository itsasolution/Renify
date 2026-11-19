const express = require('express');
const router = express.Router();

const { findvehicle, addReview, paginate, filterVehicle, updateVehicle, deleteVehicle, getAllVehicles } = require("../Controllers/vehicle.controller");
const { recentBooking } = require('../Controllers/booking.controller');
const { verifyToken } = require('../middleware/auth');

// --- Public routes ---
router.get("/", paginate, filterVehicle);
router.get("/getAllVehicles", getAllVehicles);
router.get("/findvehicle/:vid", findvehicle);
router.get("/recentBooking/:bookingId", recentBooking);

// --- Protected routes ---
router.post("/addreview/:vid", verifyToken, addReview);

// FIX: was POST for update — changed to PATCH (partial update semantics)
router.patch("/update/:id", verifyToken, updateVehicle);
router.delete("/:id", verifyToken, deleteVehicle);

module.exports = router;
