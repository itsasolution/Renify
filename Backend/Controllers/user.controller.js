const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const bucket = require("../utils/firebase");
require("dotenv").config();

// Utility function to remove spaces from a string
const removeSpaces = (str) => str.replace(/\s+/g, '');

// Function to create JWT token
const createToken = (email) => {
    return jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

const signup = async (req, res) => {
    const { username, email, name, password } = req.body;

    if (!username || !email || !name || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const userExists = await userModel.findOne({ username });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userdata = await userModel.create({ username, name, email, password: hashedPassword });

        const token = createToken(email);
        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(200).json({ message: "Registration successful!", userdata });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const login = async (req, res) => {
    const { credential, password } = req.body;

    if (!credential || !password) {
        return res.status(400).send('Username/email and password are required');
    }

    try {
        const SearchCredential = removeSpaces(credential);
        let user = await userModel.findOne({ username: SearchCredential }).populate('myRides');

        if (!user) {
            user = await userModel.findOne({ email: new RegExp(`^${SearchCredential}$`, 'i') }).populate('myRides');
            if (!user) {
                return res.status(401).send('Invalid username/email or password');
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username/email or password');
        }

        const token = createToken(user.email);
        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200).json({ message: 'Login successful', userdata: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DeleteUser = async (req, res) => {
    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" })

    const user = await userModel.findOne({ _id: req.params.uid })
    if (!user) {
        return res.status(404).send("User Not Found")
    }

    try {
        await userModel.deleteOne({ _id: req.params.uid })
        res.status(200).send("User deleted successfully");

    } catch (err) {
        res.status(500).send(err)
    }

}
const myrides = async (req, res) => {
    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" })

    try {
        const user = await userModel.findOne({ _id: req.params.uid })
            .populate({
                path: 'myRides',   // Populates the 'myRides' field which references bookings
                populate: {
                    path: 'vehicle', // Populates the 'vehicle' field inside each booking
                    model: 'Vehicle'
                }
            });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Extract vehicles from the populated myRides(bookings arr)
        const vehicles = user.myRides.map(ride => ride.vehicle);

        return res.status(200).json(vehicles);

    } catch (err) {
        console.error("Error fetching user with bookings and vehicles:", err);
        return res.status(500).send("Internal server error");
    }
}
// in user route file multer setup 
const updateUser = async (req, res) => {

    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" })

    // console.log(req.body);
    let publicUrl;
    let update = { ...req.body }


    const uploadFile = async () => {
        if (req.file) {

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
        }
    }

    try {
        // await uploadFile();

        // req.body contains data in form of obj {name:"Bhalu", address:"HOD cabin"}
        if (publicUrl) update["avatar"] = publicUrl;
        console.log(update)

        const user = await userModel.findByIdAndUpdate(req.params.uid, update, { new: true }); // new return updated user details
        if (!user) {
            return res.status(404).send('User not found');
        }
        await user.save();

        res.status(200).json({ user }); // always use that fu***ng  json to send objs
    }
    catch (err) {
        res.status(300).send(err);
    }

}

module.exports = {
    login, signup, DeleteUser, updateUser, myrides
}