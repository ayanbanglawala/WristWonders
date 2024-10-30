import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/GenerateToken.js';
import User from "../models/user.model.js"
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const signup = async (req, res) => {
    console.log(req.body);
    try {
        const { fName, lName, email, password, cPassword, phone } = req.body;
        if (password != cPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ fName, lName, email, password: hashedPassword, phone });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fName: newUser.fName,
                lName: newUser.lName,
                email: newUser.email,
                phone: newUser.phone,
                token: generateTokenAndSetCookie(newUser._id, res),
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Password" });
        }
        generateTokenAndSetCookie(user._id, res);
        res.json({
            _id: user._id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            phone: user.phone,
            token: generateTokenAndSetCookie(user._id, res),
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}