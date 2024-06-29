const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Utility function to remove spaces from a string
const removeSpaces = (str) => str.replace(/\s+/g, '');

// Function to create JWT token
const createToken = (email) => {
    return jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

// Middleware to handle user registration
router.post('/sign-up', async (req, res) => {
    const { username, email, name, password } = req.body;

    if (!username || !email || !name || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const userExists = await userModel.findOne({ username });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userdata = await userModel.create({ username, name, email, password: hashedPassword });

        const token = createToken(email);
        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(200).json({ message: "Registration successful!", userdata });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Middleware to handle user login
router.post("/login", async (req, res) => {
    const { credential, password } = req.body;

    if (!credential || !password) {
        return res.status(400).send('Username/email and password are required');
    }

    try {
        const SearchCredential = removeSpaces(credential);
        let user = await userModel.findOne({ username: SearchCredential }).populate('myRides');

        if (!user) {
            user = await userModel.findOne({ email: new RegExp(`^${SearchCredential}$`, 'i') }).populate('myRides');
            if (!user) {
                return res.status(401).send('Invalid username/email or password');
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username/email or password');
        }

        const token = createToken(user.email);
        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200).json({ message: 'Login successful', userdata: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware to handle user logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
