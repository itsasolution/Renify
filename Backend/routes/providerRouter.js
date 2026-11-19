const express = require('express');
const { signup, login, myVehicles, updateUser, DeleteUser, currentBooking } = require('../Controllers/provider.controller');
const upload = require('../utils/multer');
const { findProviderBooking, startRide, completeRide } = require('../Controllers/booking.controller');
const { cancelBooking } = require('../Controllers/user.controller');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// --- Auth Routes (public) ---
router.post('/sign-up', signup);
router.post("/login", login);
router.get("/logout", async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Logged out successfully' });
});

// --- Provider Profile (protected) ---
router.route('/id/:uid')
    .delete(verifyToken, DeleteUser)
    .patch(verifyToken, upload.single('avatar'), updateUser);

// --- Vehicles (protected) ---
router.post("/my-vehicles", verifyToken, myVehicles);

// --- Bookings (protected) ---
router.get("/find-bookings/:providerId", verifyToken, findProviderBooking);
router.get('/currentBooking/:bookingId', verifyToken, currentBooking);

// FIX: was GET — changed to PATCH (mutates booking status)
router.patch('/complete/:bookingId', verifyToken, completeRide);
router.patch('/currentBooking/start/:bookingId', verifyToken, startRide);

// FIX: was GET — changed to DELETE
router.delete("/cancelBooking/:bookingId", verifyToken, cancelBooking);

module.exports = router;
