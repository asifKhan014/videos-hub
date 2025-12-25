
import express from 'express';
const router = express.Router();
import authRoute from './authRoute.ts';
router.use("/auth", authRoute);

export default router;