import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: true,
        },
        lName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        addresses: [
            {
                name: { type: String, required: true },
                phoneNumber: { type: String, required: true },
                street: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                country: { type: String, required: true },
                zipCode: { type: String, required: true },
                isPrimary: { type: Boolean, default: false }, // Indicates default shipping address
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
