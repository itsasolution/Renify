const express = require('express');
const { signup, login, myVehicles, updateUser, DeleteUser } = require('../Controllers/provider.controller');
const upload = require('../utils/multer');
const router = express.Router();

router.post('/sign-up', signup)

router.post("/login", login)

// logout
router.get("/logout", async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: 'Logged out successfully' });
})

router.route('/id/:uid').get((req, res) => {
    console.log("get request")
    res.send("get provider")
})
    .delete(DeleteUser)// cant send headers so use params
    .patch(upload.single('avatar'), updateUser)// update user/ middleware for file


router.post("/my-vehicles", myVehicles)

module.exports = router;
