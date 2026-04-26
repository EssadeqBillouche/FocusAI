import User from '../models/user.model.js';

export const findUserByEmail = (email) => {
	return User.findOne({ email: email.toLowerCase() });
};

export const createUser = (payload) => {
	return User.create(payload);
};

export const findUserById = (id) => {
	return User.findById(id);
};
