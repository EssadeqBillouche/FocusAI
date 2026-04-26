import { verifyToken } from "../utils/jwt.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const protectRoute = async (req, res, next) => {
    try {
        let token;
        
        // 1. Check if token exists in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AppError("You are not logged in! Please log in to get access.", 401);
        }

        // 2. Verify the token
        const decoded = verifyToken(token);
        const userId = decoded.userId || decoded.id;

        if (!userId) {
            throw new AppError("Invalid token payload.", 401);
        }

        // 3. Check if user still exists (in case they were deleted since the token was issued)
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            throw new AppError("The user belonging to this token no longer exists.", 401);
        }

        // Grant access to protected route by attaching user to request
        req.user = currentUser;
        next();
    } catch (error) {
        next(error);
    }
};