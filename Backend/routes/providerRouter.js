const express = require('express');
const router = express.Router();
const providerModel = require("../models/provider.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// passport.use(new localStrategy(providerModel.authenticate()));

// passport.serializeUser(providerModel.serializeUser());
// passport.deserializeUser(providerModel.deserializeUser());


// register route
// router.post('/sign-up', (req, res) => {

//     const { username, email, name, address } = req.body
//     const userdata = new providerModel({
//         username: username,
//         name: name,
//         email: email,
//         address: address,
//     })

//     // Hashing the password and registering the user
//     providerModel.register(userdata, req.body.password, (err, registerUser) => {
//         if (err) {
//             // Check if error is because the user already exists
//             if (err.name === 'UserExistsError') {
//                 return res.status(400).json({ message: 'Provider already exists' });
//             }
//             // Other errors
//             return res.status(500).json({ message: 'An error occurred during registration', error: err });
//         }

//         passport.authenticate("local")(req, res, async function () {
//             // Fetching user details
//             let provider = await providerModel.findOne({ email: email });
//             res.status(200).json({
//                 message: "Registration successful!",
//                 userdata: provider
//             });
//         });
//     });
// });

// authenticate
// router.post('/login', (req, res) => {

//     // passport.authenticate("local")(req, res, async function () {
//     //     try {
//     //         // Populate add real vehicle data instead of ID
//     //         let provider = await providerModel.findOne({ username: req.body.username }).populate("vehicles");
//     //         res.status(200).json({
//     //             message: "Login Success",
//     //             userdata: provider
//     //         });
//     //     }
//     //     catch (err) {
//     //         res.status(400).json({ message: "Username or Password is incorrect" })
//     //     }

//     // })
//     passport.authenticate('local', async (err, user, info) => {
//         if (err) {
//             return res.status(400).json({ message: 'An error occurred during login', error: err });
//         }
//         if (!user) {
//             return res.status(400).json({ message: 'Username or Password is incorrect' });
//         }
//         req.logIn(user, async (err) => {
//             // if (err) {
//             //     return res.status(400).json({ message: 'An error occurred during login', error: err });
//             // }
//             try {
//                 // Populate add real vehicle data instead of ID

//                 const provider = await providerModel.findOne({ username: req.body.username }).populate('vehicles');
//                 res.status(200).json({
//                     message: 'Login Success',
//                     userdata: provider
//                 });
//             } catch (err) {
//                 res.status(400).json({ message: 'Username or Password is incorrect' });
//             }
//         });
//     })(req, res);
// })

const secret = "astro"
router.post('/sign-up', async (req, res) => {

    const { username, email, name, address, password } = req.body

    if (!username) {
        return res.status(400).send('no data received');
    }

    const userExists = await providerModel.findOne({ username });
    console.log((userExists))
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);//salt=10
        const userdata = await providerModel.create({
            username, name, email, address,
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
    const user = await providerModel.findOne({ username }).populate('vehicles');

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
        res.status(500).json({error:error})
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
