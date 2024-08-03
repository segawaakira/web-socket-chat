import hashPassword from '../auth/hashPassword';
import { createToken } from '../auth/jwtFunctions';
import userModel from '../database/models/Users';
import IReturn from '../interfaces/returns.interface';
import IUser from '../interfaces/user.interface';
import { loginValidation, signupValidation, userValidation } from './validations';

const getAll = async (): Promise<IReturn<IUser[]>> => {
  const users = await userModel.findAll({ attributes: { exclude: ['password'] } });
  return { type: null, message: users };
}

const getUser = async (requestedEmail: string, userEmail: string): Promise<IReturn<IUser | null | string>> => {
  const { type, message } = userValidation(requestedEmail, userEmail);
  if (type) return { type, message };

  const user = await userModel.findOne({
    where: { email: requestedEmail },
    attributes: { exclude: ['password', 'id'] },
  });

  return { type: null, message: user };
}

const login = async (user: IUser): Promise<IReturn<string>> => {
  const { type, message } = await loginValidation(user);
  if (type) return { type, message };
  const userLoged = await userModel.findOne({ where: { email: user.email }});
  const token = createToken(userLoged as IUser);
  return { type: null, message: token };
}

const signup = async (user: IUser): Promise<IReturn<string>> => {
  const { type, message } = await signupValidation(user);
  if (type) return { type, message };
  const { password: pw } = user;
  const hashedPassword = hashPassword(user.password as string);
  user.password = hashedPassword;
  await userModel.create({ ...user });
  return { type: null, message: 'successfully registered user' };
}

const update = async ({ name, lastName, image}: IUser, email: string, requestedEmail: string): Promise<IReturn<IUser | null | string>> => {
  const { type, message } = userValidation(requestedEmail, email);
  if (type) return { type, message };
  await userModel.update({ name, lastName, image }, { where: { email }});
  const userUpdated = await userModel.findOne({
    where: { email },
    attributes: { exclude: ['password', 'id'] },
  });
  
  return { type: null, message: userUpdated };
}

export default {
  getAll,
  login,
  signup,
  getUser,
  update,
};
