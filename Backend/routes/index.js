var express = require('express');
var router = express.Router();
var vehilclesRouter = require('./vehilclesRouter');
var providerRouter = require('./providerRouter');
var addVehicle = require('./addVehicle');

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

router.get("/", (req,res)=>{
})

// router.use("/user", userRouter)
router.use('/vehicles', vehilclesRouter);
router.use('/provider', providerRouter);
router.use('/addvehicle',addVehicle );


module.exports = router;



