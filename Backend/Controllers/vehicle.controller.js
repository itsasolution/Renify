const VehicleModel = require("../models/vehicles.model");

const OverallRating = async (vehicle) => {
    try {
        const reviews = vehicle?.reviews;
        const totalReviews = reviews?.length;

        if (totalReviews === 0) {
            return 0; // No reviews, so overall rating is 0
        }

        let sum = 0;
        reviews.forEach(review => {
            sum += review.rating;
            return sum;
        })
        let overallRating = sum / totalReviews;
        overallRating = overallRating.toFixed(1);

        console.log(overallRating)

        return overallRating;
    } catch (error) {
        console.error('Error calculating overall rating:', error);
    }
}

const addReview = async (req, res) => {

    try {
        const vehicle = await VehicleModel.findById(req.params.vid);

        let overall = await OverallRating(vehicle);
        vehicle.overallRating = overall;
        vehicle.reviews.push(req.body)// arr.push({obj})

        await vehicle.save();
        res.status(201).json(vehicle);

    }
    catch (err) {
        res.send(err)
    }
}

async function findvehicle(req, res) {
    try {
        // console.log(req.params.vid)
        const vehicle = await VehicleModel.findOne({ _id: req.params.vid })?.populate("providerId");
        if (!vehicle)
            res.status(404).json("No such a vehicle available")

        let overallRating = await OverallRating(vehicle)
        vehicle.overallRating = overallRating;

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
    findvehicle, getAllVehicles, addReview
}