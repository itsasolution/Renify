const vehiclesModel = require("../models/vehicles.model");
const VehicleModel = require("../models/vehicles.model");


const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await vehiclesModel.find({ availability: true })?.populate('providerId');
        if (!vehicles) {
            return res.status(404).json({ message: "Vehicle Not found !" });
        }
        res.status(200).json(vehicles);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// FIX: recalculate after adding the new review (called after push), not before
const calculateOverallRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
};

const addReview = async (req, res) => {
    try {
        const vehicle = await VehicleModel.findById(req.params.vid);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        // Push first, THEN recalculate so the new review is counted
        vehicle.reviews.push(req.body);
        vehicle.overallRating = calculateOverallRating(vehicle.reviews);

        await vehicle.save();
        res.status(201).json(vehicle);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function findvehicle(req, res) {
    try {
        const vehicle = await VehicleModel.findOne({ _id: req.params.vid })?.populate("providerId");
        if (!vehicle)
            return res.status(404).json({ message: "No such vehicle available" });

        vehicle.overallRating = calculateOverallRating(vehicle.reviews);

        res.status(200).json(vehicle);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const filterVehicle = async (req, res) => {
    res.json(res.paginatedResults);
};

// Pagination middleware
const paginate = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filterParams = {};

    if (req.query.type && req.query.type !== "all") {
        filterParams.type = req.query.type;
    }

    if (req.query.availability && req.query.availability !== "all") {
        filterParams.availability = req.query.availability === "true";
    }

    try {
        const results = await VehicleModel.find(filterParams).limit(limit).skip(skip).exec();
        const totalDocuments = await VehicleModel.countDocuments(filterParams).exec();

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
        res.status(500).json({ error: e.message });
    }
};


const updateVehicle = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Vehicle ID required" });
    }
    try {
        const vehicle = await vehiclesModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })?.populate('providerId');
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle Not found !" });
        }
        res.status(200).json(vehicle);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteVehicle = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Vehicle ID required" });
    }
    try {
        const vehicle = await vehiclesModel.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle Not found !" });
        }
        res.status(200).json({ message: "Deleted Successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    findvehicle, filterVehicle, addReview, paginate, updateVehicle, deleteVehicle, getAllVehicles
};
