const express = require('express');
const { signup, login, myVehicles } = require('../Controllers/provider.controller');
const router = express.Router();



router.post('/sign-up', signup)

router.post("/login", login)

// logout
router.get("/logout", async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: 'Logged out successfully' });
})


router.post("/my-vehicles", myVehicles)

module.exports = router;
