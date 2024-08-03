import usersModel from '../../database/models/Users';
import IReturn from "../../interfaces/returns.interface";
import IUser from '../../interfaces/user.interface';
import chatsService from "../chats.service";

const newChatValidation = async (username: string, id: number): Promise<IReturn<string>> => {
  const { message: chats } = await chatsService.getAll(id);
  const doesTheChatExist = chats.find((chat) => chat.username === username);
  if (doesTheChatExist) return { type: 'INVALID_VALUE', message: 'Chat already exists' };
  const userLogged = await usersModel.findByPk(id);
  const { username: usernameIsValid } = userLogged as IUser;
  if (usernameIsValid === username) return { type: 'INVALID_VALUE', message: 'Invalid username' };
  const users = await usersModel.findAll();
  const doesTheUserExist = users.find((u) => u.username === username);
  if (!doesTheUserExist) return { type: 'INVALID_VALUE', message: 'Invalid username' };
  return { type: null, message: '' };
}

export default newChatValidation;