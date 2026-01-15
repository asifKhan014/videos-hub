
import express from 'express';
const router = express.Router();
import authRoute from './authRoute.ts';
import passport from 'passport';
import userRoute from './userRoute.ts';

router.use("/auth", authRoute);
router.use("/users",passport.authenticate('jwt', { session: false }), userRoute);

export default router;