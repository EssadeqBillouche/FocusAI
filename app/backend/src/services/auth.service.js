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