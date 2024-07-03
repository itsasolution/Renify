const providerModel = require("../models/provider.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = {
    login, signup, myVehicles
}