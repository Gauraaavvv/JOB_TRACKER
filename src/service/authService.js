import User from "../models/userModel.js"

export const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email })
    if (existingUser)
        throw new Error("Email is already registered")

    const registeredUser = await User.create({ name, email, password })
    return registeredUser
}
