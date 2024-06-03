const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const providerModel = require("../models/provider.model")

passport.use(new localStrategy(providerModel.authenticate()));

passport.serializeUser(providerModel.serializeUser());
passport.deserializeUser(providerModel.deserializeUser());

// register route
router.post('/sign-up', (req, res) => {

    // getting data from FORM name="username"
    const { username, email, name, address } = req.body
    const userdata = new providerModel({
        username: username,
        name: name,
        email: email,
        address: address,
    })

    // Hashing the password and registering the user
    providerModel.register(userdata, req.body.password, (err, registerUser) => {
        if (err) {
            // Check if error is because the user already exists
            if (err.name === 'UserExistsError') {
                return res.status(400).json({ message: 'Provider already exists' });
            }
            // Other errors
            return res.status(500).json({ message: 'An error occurred during registration', error: err });
        }

        passport.authenticate("local")(req, res, async function () {
            // Fetching user details
            let provider = await providerModel.findOne({ email: email });
            res.status(200).json({
                message: "Registration successful!",
                userdata: provider
            });
        });
    });
});

// authenticate
router.post('/login', (req, res) => {

    // passport.authenticate("local")(req, res, async function () {
    //     try {
    //         // Populate add real vehicle data instead of ID
    //         let provider = await providerModel.findOne({ username: req.body.username }).populate("vehicles");
    //         res.status(200).json({
    //             message: "Login Success",
    //             userdata: provider
    //         });
    //     }
    //     catch (err) {
    //         res.status(400).json({ message: "Username or Password is incorrect" })
    //     }

    // })
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return res.status(400).json({ message: 'An error occurred during login', error: err });
        }
        if (!user) {
            return res.status(400).json({ message: 'Username or Password is incorrect' });
        }
        req.logIn(user, async (err) => {
            // if (err) {
            //     return res.status(400).json({ message: 'An error occurred during login', error: err });
            // }
            try {
                const provider = await providerModel.findOne({ username: req.body.username }).populate('vehicles');
                res.status(200).json({
                    message: 'Login Success',
                    userdata: provider
                });
            } catch (err) {
                res.status(400).json({ message: 'Username or Password is incorrect' });
            }
        });
    })(req, res);
})



// logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) return next(err);
        res.status(200).json({ message: "logout Successfull" })
    })
})



module.exports = router;
