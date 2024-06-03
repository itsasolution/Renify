// var express = require('express');
// const passport = require('passport');
// var router = express.Router();
// const userModel = require('../models/user.model')
// const localStrategy = require('passport-local');

// passport.use(new localStrategy(userModel.authenticate()));
// // serialize the user's unique identifier (like user ID) into the session, allowing Passport to later retrieve the user details when needed.
// passport.serializeUser(usersModel.serializeUser())

// // The counterpart to serializeUser is deserializeUser, which allows you to retrieve the full user object based on the serialized data stored in the session.
// passport.deserializeUser(usersModel.deserializeUser())
// // register route
// router.post('/sign-up', (req, res) => {

//     // getting data from FORM name="username"
//     const { username, email, name } = req.body
//     const userdata = new userModel({
//         username: username,
//         name: name,
//         email: email,
//     })

//     // Hashing the password and registering the user
//     userModel.register(userdata, req.body.password, (err, registerUser) => {
//         if (err) {
//             // Check if error is because the user already exists
//             if (err.name === 'UserExistsError') {
//                 return res.status(400).json({ message: 'User already exists' });
//             }
//             // Other errors
//             return res.status(500).json({ message: 'An error occurred during registration', error: err });
//         }

//         passport.authenticate("local")(req, res, async function () {
//             // Fetching user details
//             let user = await userModel.findOne({ email: email });
//             res.status(200).json({
//                 message: "Registration successful!",
//                 userdata: user
//             });
//         });
//     });
// });

// {
//     // login page
//     // router.get('/login', function (req, res) {
//     //   // req.flash("error") don't use more than 1 time
//     //   // array like structure
//     // res.render("login.ejs")
//     // });


//     // auth middleware
//     // router.post('/login', passport.authenticate("local", {
//     //   successRedirect: "/",
//     //   failureRedirect: "/login", // will get extra parameter in login page due to flash
//     //   // failureFlash: true

//     // }),(// next execute it
//     //   async function (req, res) { //Main work
//     //     let user = await userModel.findOne({ email: req.body.email })
//     //     res.status(200).json({
//     //       message: "login successfull!",
//     //       userdata: {
//     //         name: user.name,
//     //         email: user.email,
//     //       }
//     //     })
//     //   })
//     // );
// }

// // authenticate
// router.post('/login', (req, res) => {

//     passport.authenticate("local")(req, res, async function () {
//         // Fetching user details

//         // if(res.){
//         //   if(err.name==="Unauthorized")
//         //     res.status(401).json({})
//         // }
//         try {
//             let user = await userModel.findOne({ username: req.body.username });
//             res.status(200).json({
//                 message: "Login Success",
//                 userdata: user
//             });
//         }
//         catch (err) {
//             res.status(400).json({ message: "Username or Password is incorrect" })
//         }

//     })
// })

// // logout
// router.get('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) return next(err);
//         res.status(200).json({ message: "logout Successfull" })
//     })
// })

// function isLoggedIn(req, res, next) {
//     // if user succ logged in -> next
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     // res.redirect("/");

// }
// module.exports = router