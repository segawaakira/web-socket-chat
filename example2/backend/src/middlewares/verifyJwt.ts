import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import IToken from '../interfaces/token.interface';

const secret = process.env.JWT_SECRET || 'chatRoom';

export default (req: Request, res: Response, next: NextFunction): void | Response => {
  const { authorization: token } = req.headers;
  
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const user = jwt.verify(token, secret) as IToken;
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.body = { ...user, ...req.body };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });    
  }
};