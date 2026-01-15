import { getUserDetails } from "../controller/user/uerController.ts";
import express from 'express';
const router = express.Router();

router.get("/profile",getUserDetails)




export default router;
