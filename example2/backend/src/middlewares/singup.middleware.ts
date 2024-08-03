import { NextFunction, Request, Response } from "express";
import mapError from "../utils/mapError";
import { signupSchema } from '../utils/schemas';

const signupMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const user = req.body;
  const { error } = signupSchema.validate(user);
  if (error) {
    const { type, message } = error.details[0];   
    return res.status(mapError(type)).json({ message });
  } 
  next();
}

export default signupMiddleware;