const providerModel = require("../models/provider.model");
const BookingModel = require("../models/bookings.model");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bucket = require("../utils/firebase");

// Function to create JWT token
const createToken = (email) => {
    return jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '7d' });
};

// Helper: strip password before sending to client
const sanitizeUser = (userDoc) => {
    const obj = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
    delete obj.password;
    return obj;
};

const signup = async (req, res) => {
    const { username, email, name, address, password, mobileNumber } = req.body;

    if (!username || !email || !address || !password) {
        return res.status(400).json({ message: 'Required fields missing: username, email, address, password' });
    }

    try {
        const userExists = await providerModel.findOne({ username });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userdata = await providerModel.create({ username, name, email, address, mobileNumber, password: hashedPassword });

        const token = createToken(email);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        res.status(201).json({ message: "Registration successful!", userdata: sanitizeUser(userdata) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { credential, password } = req.body;

    if (!credential || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const removeSpaces = (str) => str.replace(/\s+/g, '');
        const SearchCredential = removeSpaces(credential);

        let user = await providerModel.findOne({
            $or: [
                { username: SearchCredential },
                { email: new RegExp(`^${SearchCredential}$`, 'i') }
            ]
        }).populate('vehicles');

        if (!user) {
            return res.status(401).json({ message: 'Invalid username/email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = createToken(user.email);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        res.status(200).json({ message: 'Login successful', userdata: sanitizeUser(user) });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const myVehicles = async (req, res) => {
    if (!req.body.uid)
        return res.status(400).json({ message: "User ID Needed" });

    try {
        const provider = await providerModel.findById(req.body.uid).populate("vehicles");
        if (provider)
            res.status(200).json({ vehicles: provider.vehicles });
        else
            res.status(404).json({ message: "Provider not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const DeleteUser = async (req, res) => {
    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" });

    const user = await providerModel.findOne({ _id: req.params.uid });
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    try {
        await providerModel.deleteOne({ _id: req.params.uid });
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
    let publicUrl;
    let update = { ...req.body };

    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" });

    const user = await providerModel.findById(req.params.uid);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // deleting previous avatar
    if (user.avatar && req.file) {
        await deleteImage(user.avatar).catch(err => {
            console.error("err: ", err);
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

    if (req.file)
        await uploadFile();

    try {
        if (publicUrl) update["avatar"] = publicUrl;

        const updatedUser = await providerModel.findByIdAndUpdate(req.params.uid, update, { new: true });
        await updatedUser.save();

        res.status(200).json({ user: sanitizeUser(updatedUser) });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// BOOKING PART
// fetching active booking of currently available vehicle PROVIDER BOOKING PAGE
const currentBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await BookingModel.findOne({
            _id: bookingId,
            $or: [
                { status: "Booked" },
                { status: "Ongoing" }
            ]
        }).populate('user vehicle');

        if (!booking) {
            return res.status(404).json({ message: 'No booking found for this user and vehicle' });
        }

        res.status(200).json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    login, signup, myVehicles, updateUser, DeleteUser, currentBooking
};
