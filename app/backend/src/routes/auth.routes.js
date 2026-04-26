import express from "express"
import { register, login, me } from "../controllers/auth.controller.js"
import {
	loginValidation,
	registerValidation,
	validateRequest,
} from "../middlewares/validate.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post('/register', registerValidation, validateRequest, register)
router.post('/login', loginValidation, validateRequest, login);
router.get('/me', protectRoute, me);


export default router;
