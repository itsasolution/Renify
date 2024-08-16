const express = require('express');
const { signup, login, myVehicles, updateUser, DeleteUser, currentBooking } = require('../Controllers/provider.controller');
const upload = require('../utils/multer');
const { findProviderBooking, startRide, completeRide } = require('../Controllers/booking.controller');
const router = express.Router();

router.post('/sign-up', signup)

router.post("/login", login)

// logout
router.get("/logout", async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: 'Logged out successfully' });
})

router.route('/id/:uid')
    .delete(DeleteUser)// cant send headers so use params
    .patch(upload.single('avatar'), updateUser)// update user/ middleware for file


router.post("/my-vehicles", myVehicles)
router.get("/find-bookings/:providerId", findProviderBooking)
router.get('/currentBooking/:bookingId', currentBooking)
router.get('/complete/:bookingId', completeRide)
router.get('/currentBooking/start/:bookingId', startRide)


module.exports = router;
