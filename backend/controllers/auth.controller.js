import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/GenerateToken.js';
import User from "../models/user.model.js"
export const logout = async (req, res) => {
    res.send("Logout");
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
    res.send("Login");
}