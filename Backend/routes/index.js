var express = require('express');
var router = express.Router();
var vehilclesRouter = require('./vehilclesRouter');
var providerRouter = require('./providerRouter');
var userRouter = require('./userRouter');
var addVehicles = require('./ADDVEHICLES');

const { default: mongoose } = require('mongoose');

let Mongourl = process.env.mongoUrl;

mongoose.connect(Mongourl).then(() =>
    console.log("DB connection success")
).catch(err => {
    console.log("dataBase error" + err)
})


router.use("/user", userRouter)
router.use('/vehicles', vehilclesRouter);
router.use('/provider', providerRouter);
// router.use('/addvehicle', addVehicle);
router.use('/ADDVEHICLES', addVehicles);


router.get("/", (req, res) => {
    res.status(200).send("Everthing is working fine...")
})

module.exports = router;



