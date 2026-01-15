
import { Response } from 'express';
interface ResponseData {
    [key: string]: unknown;
}

export const sendResponse = (res: Response, status: number, message: string, data?: any) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    ...data
  });
};
