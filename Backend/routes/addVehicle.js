const VehicleModel = require("../models/vehicles.model");
const bucket = require("../utils/firebase")
const upload = require('../utils/multer');
const express = require('express');
const router = express.Router();
const providerModel = require("../models/provider.model")


router.post("/", upload.array('images', 5), async (req, res, next) => {

    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    try {
        // making array to store urls
        const publicUrls = [];
        req.files.forEach(async (file) => {

            const blob = bucket.file(Date.now() + '-' + file.originalname);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            await new Promise((resolve, reject) => {
                blobStream.on('error', (err) => {
                    reject(err);
                });

                blobStream.on('finish', async () => {
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    await blob.makePublic();
                    publicUrls.push(publicUrl); //working publicurls

                    resolve();
                });
                
                console.log(publicUrls) // empty why 
                blobStream.end(file.buffer);
            });
        })

        const { PID, type, brand, model, registrationNumber, rentPerDay, rentPerHour } = req.body;

        const provider = await providerModel.findOne({ _id: PID });

        const vehicle = await VehicleModel.create({
            providerId: provider._id,
            images: publicUrls, // Store the array of image URLs
            type, model, registrationNumber, rentPerDay, brand, rentPerHour,
        });

        provider.vehicles.push(vehicle._id);
        await provider.save();

        res.status(200).json({ message: 'Vehicle added successfully', url: publicUrls });

    } catch (err) {

        if (err.code === 11000)
            res.status(400).json({ res: "Registration Number is already registered" })

        else
            res.status(500).json({ error: err });
    }
})

module.exports = router