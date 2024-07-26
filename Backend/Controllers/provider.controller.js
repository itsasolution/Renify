const providerModel = require("../models/provider.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bucket = require("../utils/firebase");

// Function to create JWT token
const createToken = (email) => {
    return jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

const signup = async (req, res) => {

    const { username, email, name, address, password } = req.body

    if (!username || !email || !address || !password) {
        return res.status(400).send('no data received');
    }

    try {
        const userExists = await providerModel.findOne({ username });
        // console.log((userExists))
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);//salt=10
        const userdata = await providerModel.create({ username, name, email, address, password: hashedPassword })

        // logging-in the user create token 
        const token = createToken(email);
        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200).json({ message: "Registration successful!", userdata: userdata });
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

const login = async (req, res) => {


    const { credential, password } = req.body;

    if (!credential || !password) {
        return res.status(400).send('Username and password are required');
    }
    try {
        const removeSpaces = (str) => str.replace(/\s+/g, '');
        const SearchCredential = removeSpaces(credential);

        let user = await providerModel.findOne({
            $or:
                [
                    { username: SearchCredential },
                    { email: new RegExp(`^${SearchCredential}$`, 'i') }
                ]
        }).populate('vehicles');

        if (!user) {
            return res.status(401).send('Invalid username/email or password');
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }

        const token = createToken(user.email);
        const cookie = res.cookie('token', token, { httpOnly: true, secure: true });
        // console.log("cookie:", cookie)

        res.status(200).json({ message: 'Login successful', userdata: user });
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

const myVehicles = async (req, res) => {
    if (!req.body.uid)
        res.status(401).send("User ID Needed")

    try {
        const provider = await providerModel.findOne({ _id: req.body.uid }).populate("vehicles");

        res.status(200).json({ vehicles: provider.vehicles })

    } catch (err) {
        res.send(err)
    }

}



const DeleteUser = async (req, res) => {
    if (!req.params.uid)
        return res.status(400).json({ err: "user id missing" })

    const user = await providerModel.findOne({ _id: req.params.uid })
    if (!user) {
        return res.status(404).send("User Not Found")
    }

    try {
        await providerModel.deleteOne({ _id: req.params.uid })
        res.status(200).send("User deleted successfully");

    } catch (err) {
        res.status(500).send(err)
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
        return new Promise((resolve, reject) => {
            if (req.file) {
                try {
                    const fileName = `Renify/Avatars/${Date.now()}-${req.file.originalname}`;

                    const blob = bucket.file(fileName);
                    const blobStream = blob.createWriteStream({
                        metadata: {
                            contentType: req.file.mimetype
                        }
                    });

                    blobStream.on('error', (err) => {
                        console.log("blob err")
                        res.status(500).send(err);
                    });

                    blobStream.on('finish', async () => {
                        await blob.makePublic();
                        publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                        resolve(publicUrl);
                    });

                    blobStream.end(req.file.buffer);
                }
                catch (error) {
                    reject(error);
                }
            }
        })
    }

    try {
        await uploadFile();

        // req.body contains data in form of obj {name:"Bhalu", address:"HOD cabin"}
        if (publicUrl) update["avatar"] = publicUrl;
        console.log(update)

        const user = await providerModel.findByIdAndUpdate(req.params.uid, update, { new: true }); // new return updated user details
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
    login, signup, myVehicles, updateUser, DeleteUser
}