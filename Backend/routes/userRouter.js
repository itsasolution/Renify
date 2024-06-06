const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = "astro"
router.post('/sign-up', async (req, res) => {

    const { username, email, name, password } = req.body

    if (!username) {
        return res.status(400).send('no data received');
    }

    const userExists = await userModel.findOne({ username });
    console.log((userExists))
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);//salt=10
        const userdata = await userModel.create({
            username, name, email,
            password: hashedPassword
        })

        // logging-in the user create token 
        // const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' })
        const token = jwt.sign({ email: email }, secret, { expiresIn: '1h' })
        res.cookie("token", token) // sent to server

        res.status(200).json({
            message: "Registration successful!",
            userdata: userdata
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Populate add real vehicle data instead of ID
    const user = await userModel.findOne({ username }).populate('myRides');

    if (!user) {
        return res.status(400).send('Invalid username/email or password');
    }

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }

        // const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({ message: 'Login successful', userdata: user });
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
})

// logout
router.get("/logout", async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: 'Logged out successfully' });
})

// router.get('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) return next(err);
//         res.status(200).json({ message: "logout Successfull" })
//     })
// })

module.exports = router;
