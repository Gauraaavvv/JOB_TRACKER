import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email })
    if (existingUser)
        throw new Error("Email is already registered")

    const registeredUser = await User.create({ name, email, password })
    return registeredUser
}

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select("+password")
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        throw new Error("Invalid credentials")
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return {
        token,
        user: { id: user._id, name: user.name, email: user.email }
    }
}