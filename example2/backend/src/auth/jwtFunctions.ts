import jwt from 'jsonwebtoken';
import IUser from '../interfaces/user.interface';

require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

const jwtConfig: object = {
  algorithm: 'HS256',
  expiresIn: '1d',
}

const createToken = (user: IUser): string => {
  const token = jwt.sign({ user }, secret, jwtConfig);
  return token;
}

export { createToken };
