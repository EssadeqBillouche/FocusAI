import jwt from 'jsonwebtoken';

export const generateToken = (payload) =>{
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    return token;
}

export const verifyToken = (token) =>{
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.verify(token, process.env.JWT_SECRET);
}