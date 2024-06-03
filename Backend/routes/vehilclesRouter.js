const express = require('express');
const router = express.Router();
const VehicleModel = require("../models/vehicles.model")


router.get("/", async (req, res) => {
    try {
        const vehicle = await VehicleModel.find({});
        res.status(200).json(vehicle)
        // sends list of objescts recieved in frontend by axis
    }
    catch {
        res.status(500).send("error")
    }
})

module.exports = router;
