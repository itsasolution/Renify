const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bucket = require("../utils/firebase");
require("dotenv").config();
const BookingModel = require("../models/bookings.model");
const vehiclesModel = require("../models/vehicles.model");


// Utility function to remove spaces from a string
const removeSpaces = (str) => str.replace(/\s+/g, '');

// Function to create JWT token
const createToken = (email) => {
    return jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '7d' });
};

// Helper: strip password from user object before sending to client
const sanitizeUser = (userDoc) => {
    const obj = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
    delete obj.password;
    return obj;
};

const signup = async (req, res) => {
    const { username, email, name, password } = req.body;

    if (!username || !email || !name || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await userModel.findOne({ username });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userdata = await userModel.create({ username, name, email, password: hashedPassword });

        const token = createToken(email);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });

        res.status(201).json({ message: "Registration successful!", userdata: sanitizeUser(userdata) });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { credential, password } = req.body;

    if (!credential || !password) {
        return res.status(400).json({ message: 'Username/email and password are required' });
    }

    try {
        const SearchCredential = removeSpaces(credential);
        let user = await userModel.findOne({ username: SearchCredential }).populate('myRides');

        if (!user) {
            user = await userModel.findOne({ email: new RegExp(`^${SearchCredential}$`, 'i') }).populate('myRides');
            if (!user) {
                return res.status(401).json({ message: 'Invalid username/email or password' });
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username/email or password' });
        }

        const token = createToken(user.email);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        res.status(200).json({ message: 'Login successful', userdata: sanitizeUser(user) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const DeleteUser = async (req, res) => {
    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" });

    const user = await userModel.findOne({ _id: req.params.uid });
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    try {
        await userModel.deleteOne({ _id: req.params.uid });
        res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// delete files from firebase
async function deleteImage(publicUrl) {
    const filePath = publicUrl.split(`https://storage.googleapis.com/${bucket.name}/`)[1];
    await bucket.file(filePath).delete();
}


// in user route file multer setup
const updateUser = async (req, res) => {

    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" });

    const user = await userModel.findById(req.params.uid);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    let publicUrl;
    let update = { ...req.body };

    if (user.avatar && req.file) {
        await deleteImage(user.avatar).catch(err => {
            console.log("err: ", err);
        });
    }

    const uploadFile = async () => {
        const fileName = `Renify/Avatars/${Date.now()}-${req.file.originalname}`;

        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        await new Promise((resolve, reject) => {
            blobStream.on('error', (err) => {
                reject(err);
            });

            blobStream.on('finish', async () => {
                publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                await blob.makePublic();
                resolve();
            });

            blobStream.end(req.file.buffer);
        });
    };

    try {
        if (req.file) {
            await uploadFile();
        }

        if (publicUrl) update["avatar"] = publicUrl;

        const updatedUser = await userModel.findByIdAndUpdate(req.params.uid, update, { new: true });

        res.status(200).json({ user: sanitizeUser(updatedUser) });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// BOOKING SECTION

const bookVehicle = async (req, res) => {
    const { id, userId, bookingDate, journeyTime, passCode, cost, startDate, endDate } = req.body;

    try {
        const vehicle = await vehiclesModel.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        if (vehicle.availability === false)
            return res.status(409).json({ message: "Vehicle Not Available" });

        const booking = await BookingModel.create({
            user: userId,
            vehicle: id,
            provider: vehicle.providerId,
            bookingDate, startDate, endDate, journeyTime, cost, passCode
        });

        vehicle.bookings.push(booking._id);
        vehicle.availability = false;
        await vehicle.save();

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.myRides.push(booking._id);
        await user.save();

        booking.provider = vehicle.providerId;
        await booking.save();

        res.status(201).json({ booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const myrides = async (req, res) => {
    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" });

    try {
        const user = await userModel.findOne({ _id: req.params.uid })
            .populate({
                path: 'myRides',
                populate: {
                    path: 'vehicle',
                    model: 'Vehicle'
                }
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const bookings = user.myRides;
        return res.status(200).json(bookings);

    } catch (err) {
        console.error("Error fetching user with bookings and vehicles:", err);
        return res.status(500).json({ error: err.message });
    }
};

// FindBooking User for current vehicle
const checkUserBooking = async (req, res) => {
    const { uid, vid } = req.body;

    try {
        const booking = await BookingModel.findOne({
            user: uid,
            vehicle: vid,
            status: { $in: ['Ongoing', 'Booked'] }
        }).populate("provider");

        if (!booking) {
            return res.status(404).json({ message: "No bookings found" });
        }
        res.status(200).json({ booking });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const cancelBooking = async (req, res) => {
    if (!req.params.bookingId) {
        return res.status(400).json({ message: "Booking id missing" });
    }
    try {
        const booking = await BookingModel.findByIdAndDelete(req.params.bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Remove booking from user's myRides
        const user = await userModel.findById(booking.user);
        if (user) {
            user.myRides.pull(booking._id);
            await user.save();
        }

        // Update vehicle's availability
        const vehicle = await vehiclesModel.findById(booking.vehicle);
        if (vehicle) {
            vehicle.bookings.pull(booking._id);
            vehicle.availability = true;
            await vehicle.save();
        }

        res.status(200).json({ message: "Booking cancelled" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports = {
    login, signup, DeleteUser, updateUser, myrides, checkUserBooking, cancelBooking, bookVehicle
};
