const VehicleModel = require("../models/vehicles.model");

async function findvehicle(req, res) {
    try {
        const vehicle = await VehicleModel.findOne({ _id: req.body.id });
        if (!vehicle)
            res.status(404).json("No such a vehicle available")

        vehicle.populate()
        res.status(200).json(vehicle) // object
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await VehicleModel.find({});
        res.status(200).json(vehicles)
        // sends list of objescts recieved in frontend by axis
    }
    catch (err) {
        res.status(500).send(err)
    }
}


module.exports = {
    findvehicle, getAllVehicles
}