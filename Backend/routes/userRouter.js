const express = require('express');
const { login, signup, DeleteUser, updateUser } = require('../Controllers/user.controller');
const upload = require('../utils/multer');
const router = express.Router();


router.route('/id/:uid').get((req, res) => {
    console.log("get request")
    res.send("get user")

})
    .delete(DeleteUser)// cant send headers so use params
    .patch(upload.single('avatar'), updateUser)// update user/ middleare for file


// Middleware to handle user registration
router.post('/sign-up', signup);

// Middleware to handle user login
router.post("/login", login);

// Middleware to handle user logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
