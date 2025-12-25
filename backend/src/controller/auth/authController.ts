import User from '../../model/userSchema.ts';
import { sendResponse } from '../../utils/sendResponse.ts';
import { Request, RequestHandler } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
interface RegisterReq extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginReq extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const signUpUser : RequestHandler = async (req: RegisterReq, res)=>{
try {
    const { username, email, password } = req.body;
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, 'User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword,token: crypto.randomBytes(16).toString('hex') });
    await newUser.save();
    return sendResponse(res, 201, 'User registered successfully');
} catch (error) {
  
    return sendResponse(res, 500, 'Server error', error);
}
}