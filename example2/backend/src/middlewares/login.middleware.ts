import { NextFunction, Request, Response } from "express";
import mapError from "../utils/mapError";
import { loginSchema } from '../utils/schemas';

const loginMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const user = req.body; 
  const { error } = loginSchema.validate(user);
  if (error) {
    const { type, message } = error.details[0];  
    return res.status(mapError(type)).json({ message });
  } 
  next();
}

export default loginMiddleware;