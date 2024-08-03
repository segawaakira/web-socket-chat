import userModel from '../../database/models/Users';
import IReturn from "../../interfaces/returns.interface";
import IUser from "../../interfaces/user.interface";

const signupValidation = async ({ email, username }: IUser): Promise<IReturn<string>> => {
  const users = await userModel.findAll();
  const isEmailValid = users.find((u) => u.email === email);
  if (isEmailValid) return { type: 'INVALID_VALUE', message: 'Email is already in use'};
  const isUsernameValid = users.find((u) => u.username === username);
  if (isUsernameValid) return { type: 'INVALID_VALUE', message: 'Username is already in use'};
  return { type: null, message: ''};
}

export default signupValidation;