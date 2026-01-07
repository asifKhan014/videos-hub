import User from '../../model/userSchema.ts';
import { sendResponse } from '../../utils/sendResponse.ts';
import { Request, RequestHandler } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../utils/generateJwtToken.ts';
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



export const signInUser: RequestHandler = async (req: LoginReq, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, "Account doesnot exist");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return sendResponse(res, 400, "Password doesnot match");
    }
    const jwtToken = await generateJwtToken(user);
    sendResponse(res, 200, "Logged in succsfully", {
      user: { token: jwtToken },
    });
  } catch (error) {
    console.error(`ERrror in authentication ${error}`);
    return sendResponse(res, 500, "Internal server errro");
  }
};