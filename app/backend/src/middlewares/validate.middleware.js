import { body, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'fail',
			message: 'Validation failed',
			errors: errors.array(),
		});
	}

	return next();
};

export const registerValidation = [
	body('firstName').trim().notEmpty().withMessage('First name is required').isLength({ min: 2 }),
	body('lastName').trim().notEmpty().withMessage('Last name is required').isLength({ min: 2 }),
	body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
	body('password')
		.isString()
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters'),
	body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin'),
];

export const loginValidation = [
	body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
	body('password').notEmpty().withMessage('Password is required'),
];

export const createTaskValidation = [
	body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2, max: 120 }),
	body('description').optional().isString().isLength({ max: 1000 }),
	body('status').optional().isIn(['pending', 'completed']),
	body('priority').optional().isIn(['low', 'medium', 'high']),
	body('deadline').notEmpty().withMessage('Deadline is required').isISO8601(),
];

export const updateTaskValidation = [
	body('title').optional().trim().isLength({ min: 2, max: 120 }),
	body('description').optional().isString().isLength({ max: 1000 }),
	body('status').optional().isIn(['pending', 'completed']),
	body('priority').optional().isIn(['low', 'medium', 'high']),
	body('deadline').optional().isISO8601(),
];
