import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";

export const creatUserService = async ({ firstName, lastName, email, password, role }) => {
    const existUser = await User.findOne({ email });
    
    if (existUser) {
        throw new AppError("User exists with this email", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || "user"
    });

    return await newUser.save();
};

export const loginService = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    
    return user;
};