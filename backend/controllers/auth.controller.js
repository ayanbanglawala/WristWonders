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
        const { fName, lName, email, password, cPassword, phone, isAdmin } = req.body;
        if (password != cPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const phoneExist = await User.findOne({ phone });
        if (phoneExist) {
            return res.status(400).json({ error: "Phone Number already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ fName, lName, email, password: hashedPassword, phone, isAdmin });
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

export const profile = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

export const profileUpdate = async (req, res)=>{
    try {
        const user = await User.findOne(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { fName, lName, email, phone } = req.body;
        user.fName = fName;
        user.lName = lName;
        user.email = email;
        user.phone = phone;

        await user.save();
        res.status(200).json({message:"User updated successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}