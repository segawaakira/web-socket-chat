import bcrypt from 'bcrypt';
import userModel from '../../database/models/Users';
import IReturn from "../../interfaces/returns.interface";
import IUser from "../../interfaces/user.interface";

const loginValidation = async ({ email, password }: IUser): Promise<IReturn<string>> => {
  const users = await userModel.findAll(); 
  const user = users.find((u) => u.email === email);
  if (!user) return { type: 'INVALID_VALUE', message: 'Email or password are invalid'};
  const passwordIsValid = await bcrypt.compare(password as string, user.password);
  if (!passwordIsValid) return { type: 'INVALID_VALUE', message: 'Email or password are invalid'};
  return { type: null, message: ''};
}

export default loginValidation;
