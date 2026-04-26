import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import { createUser, findUserByEmail } from "../repositories/user.repository.js";

export const creatUserService = async ({ firstName, lastName, email, password, role }) => {
    const existUser = await findUserByEmail(email);
    
    if (existUser) {
        throw new AppError("User exists with this email", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || "user"
    };

    return await createUser(newUser);
};

export const loginService = async (email, password) => {
    const user = await findUserByEmail(email).select('+password');
    
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    
    return user;
};