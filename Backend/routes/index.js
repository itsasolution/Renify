var express = require('express');
var router = express.Router();
var vehilclesRouter = require('./vehilclesRouter');
var providerRouter = require('./providerRouter');
var userRouter = require('./userRouter');
var addVehicle = require('./addVehicle');
var addVehicles = require('./ADDVEHICLES');


const { default: mongoose } = require('mongoose');

try {
    mongoose.connect("mongodb://127.0.0.1:27017/Renify")
} catch (err) {
    alert("dataBase error" + err)
}

// first it will check isloggedin middelware
// router.get('/profile', isLoggedIn, function (req, res) {
//   res.render('profile');
// });

router.use("/user", userRouter)
router.use('/vehicles', vehilclesRouter);
router.use('/provider', providerRouter);
router.use('/addvehicle', addVehicle);
router.use('/ADDVEHICLES', addVehicles);


router.get("/", (req, res) => {
    res.cookie("name", "Piyush") 
    res.send("cookie tutorial Press 'i' on left of localhost:4000\nused to end small piece of data to server ")
})

module.exports = router;



