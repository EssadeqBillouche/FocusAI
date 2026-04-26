import express from "express"
import { register, login } from "../controllers/auth.controller.js"
import {
	loginValidation,
	registerValidation,
	validateRequest,
} from "../middlewares/validate.middleware.js";

const router = express.Router();


router.post('/register', registerValidation, validateRequest, register)
router.post('/login', loginValidation, validateRequest, login);


export default router;
