const express = require('express');
const multer = require('multer');
const router = express.Router();
const providerModel = require("../models/provider.model")
const sharp = require('sharp');
const bucket = require("../utils/firebase");
const vehiclesModel = require('../models/vehicles.model');

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
}).array('images', 10);

// Route to handle file upload and resizing
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ message: 'No files uploaded' });
        }


        try {
            // finding provider
            const provider = await providerModel.findOne({ _id: req.body.PID });

            const uploadPromises = req.files.map(async (file) => {
                // Resize image using Sharp
                const resizedImageBuffer = await sharp(file.buffer)
                    .resize(800) // Resize to a width of 800 pixels, height will be adjusted automatically
                    .toBuffer();

                // Create a file name
                const fileName = `Renify/${provider.username}/${Date.now()}-${file.originalname}`;

                // Create a file in Firebase Storage and upload the resized image
                const fileRef = bucket.file(fileName);
                await fileRef.save(resizedImageBuffer, {
                    contentType: file.mimetype,
                });

                // Get the public URL of the uploaded file
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                await fileRef.makePublic();

                // return { fileName, publicUrl };
                return publicUrl;
            });

            const ImageList = await Promise.all(uploadPromises);

            const { type, brand, model, registrationNumber, rentPerDay, rentPerHour,location } = req.body;

            const vehicle = await vehiclesModel.create({
                providerId: provider._id,
                images: ImageList, // Store the array of image URLs
                type, model, registrationNumber, rentPerDay, brand, rentPerHour,location
            });

            provider.vehicles.push(vehicle._id);
            await provider.save();

            // created
            res.status(201).json({
                message: 'Vehicle added successfully',
                newVehicle: vehicle
            });

        } catch (error) {
            // invalid data
            if (error.code === 11000)
                res.status(422).json({ res: "Registration number is already used" })

            else
                res.status(500).send({ message: error.message });
        }
    });
});
module.exports = router