const express = require('express');
const { login, signup, DeleteUser, updateUser, myrides, checkUserBooking, cancelBooking, bookVehicle } = require('../Controllers/user.controller');
const upload = require('../utils/multer');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();


// --- Auth Routes (public) ---
router.post('/sign-up', signup);
router.post("/login", login);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Logged out successfully' });
});

// --- User profile (protected) ---
router.route('/id/:uid')
    .get(verifyToken, (req, res) => res.json({ message: "get user endpoint" }))
    .delete(verifyToken, DeleteUser)
    .patch(verifyToken, upload.single('avatar'), updateUser);

// --- Bookings (protected) ---
router.post("/bookVehicle", verifyToken, bookVehicle);
router.post("/checkBooking", verifyToken, checkUserBooking);
router.get("/myrides/:uid", verifyToken, myrides);

// FIX: was GET — changed to DELETE (mutates data, should not be a GET)
router.delete("/cancelBooking/:bookingId", verifyToken, cancelBooking);

module.exports = router;
