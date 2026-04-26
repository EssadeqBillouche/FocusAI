import { creatUserService, loginService } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    const { email, firstName, lastName, password, role } = req.body;
    
    try {
        const user = await creatUserService({ 
            email, 
            firstName, 
            lastName, 
            password, 
            role 
        });

        // Generate the token
        const token = generateToken({ userId: user._id, role: user.role });

        // Don't return the password to the client!
        user.password = undefined;

        return res.status(201).json({
            status: "success",
            token, // <-- send the token back
            data: { user }
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: error.status || "error",
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Please provide email and password"
            });
        }

        const user = await loginService(email, password);

        // Generate the token
        const token = generateToken({ userId: user._id, role: user.role });

        user.password = undefined;

        return res.status(200).json({
            status: "success",
            token,
            data: { user }
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: error.status || "error",
            message: error.message
        });
    }
};

export const me = async (req, res) => {
    try {
        const user = req.user.toObject ? req.user.toObject() : req.user;

        return res.status(200).json({
            status: "success",
            data: { user },
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: error.status || "error",
            message: error.message,
        });
    }
};