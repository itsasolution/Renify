const { now } = require("mongoose");
const vehiclesModel = require("../models/vehicles.model");
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

const filterVehicle = async (req, res) => {
    res.json(res.paginatedResults);
}



// Pagination middleware
const paginate = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filterParams = {}
    try {
        let results;

        if (req.query.type == "all")
            results = await VehicleModel.find().limit(limit).skip(skip).exec();

        else
            results = await VehicleModel.find({ type: req.query.type }).limit(limit).skip(skip).exec();

        const totalDocuments = await VehicleModel.countDocuments().exec();

        const response = {
            results,
            pagination: {
                totalDocuments,
                totalPages: Math.ceil(totalDocuments / limit),
                currentPage: page,
                nextPage: page < Math.ceil(totalDocuments / limit) ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
            }
        };

        res.paginatedResults = response;
        next();

    } catch (e) {
        res.status(500).send(e);
    }

};

const updateVehicle = async (req, res) => {
    if (req.params.id) {
        try {

            const vehicle = await vehiclesModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })?.populate('providerId');
            if (!vehicle) {
                res.status(404).send("Vehicle Not found !")
            }

            res.status(200).json(vehicle);

        } catch (err) {
            res.send(err);
        }
    }
}
const deleteVehicle = async (req, res) => {
    if (req.params.id) {
        try {
            const vehicle = await vehiclesModel.findByIdAndDelete(req.params.id);
            if (!vehicle) {
                res.status(404).send("Vehicle Not found !")
            }

            res.status(200).send("Deleted SuccessFully");

        } catch (err) {
            res.send(err);
        }
    }
}



module.exports = {
    findvehicle, filterVehicle, addReview, paginate, updateVehicle, deleteVehicle
}