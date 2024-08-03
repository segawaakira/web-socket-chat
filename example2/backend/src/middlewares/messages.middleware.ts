import { NextFunction, Request, Response } from "express";
import mapError from "../utils/mapError";
import { messagesSchema } from '../utils/schemas';


const messagesMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { message } = req.body;
  const { chatId } = req.params;
  const { error } = messagesSchema.validate({ message, chatId });
  if (error) {
    const { type, message } = error.details[0];    
    return res.status(mapError(type)).json({ message });
  } 
  next();
}

export default messagesMiddleware;