import { registerUser, loginUser } from "../service/authService.js"

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || typeof name !== "string" || name.trim() === "")
            return res.status(400).json({ message: "Name is required" })
        if (!email || typeof email !== "string" || email.trim() === "")
            return res.status(400).json({ message: "Email is required" })
        if (!password || typeof password !== "string" || password.length < 6)
            return res.status(400).json({ message: "Password must be atleast 6 characters" })

        const User = await registerUser(name, email, password)
        if (!User)
            return res.status(400).json({ message: "Invalid request" })
        return res.status(201).json({ message: "Registration successful", user: User })

    } catch (err) {
        if (err.message === "Email is already registered")
            return res.status(400).json({ message: err.message })
        return res.status(500).json({ message: "Internal server error", err: err.message })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || typeof email !== "string" || email.trim() === "") return res.status(400).json("Email is required")
        if (!password || typeof password !== "string" || password.length <= 6)
            return res.status(400).json("Password must be atleat ")

        const result = await loginUser(email, password)
        return res.status(200).json({ message: "Login successful", ...result })
    } catch (err) {
        if (err.message === "Invalid credentials")
            return res.status(401).json({ message: err.message });
        return res.status(500).json({ message: "Internal server error", err: err.message });
    }

}

