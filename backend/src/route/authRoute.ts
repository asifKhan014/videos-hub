import { signUpUser } from '../controller/auth/authController.ts';
import express from 'express';
const router = express.Router();

router.post("/signup", signUpUser);

export default router;  