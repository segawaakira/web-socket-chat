import messagesModel from '../database/models/Messages';
import userMessagesModel from '../database/models/UserMessages';
import usersModel from '../database/models/Users';
import IMessage from '../interfaces/messages.interface';
import IMsg from '../interfaces/msg.interface';
import IReturn from '../interfaces/returns.interface';
import IUser from '../interfaces/user.interface';
import { messagesValidation, newMessageValidation } from './validations';


const getAll = async (chatId: number, userId: number): Promise<IReturn<IMsg | string>> => {
  const { type, message } = await messagesValidation(chatId, userId);
  if (type) return { type, message };
  const userMessages = await userMessagesModel.findAll({ where: { chatId }});

  const messagesPromises = userMessages.map(async ({ messageId }) => {
    const messages = await messagesModel.findByPk(messageId);
    return messages;
  })

  const usernamesPromises = userMessages.map(async ({ userId }) => {
    const usernames = await usersModel.findByPk(userId);
    return usernames;
  })

  const usernames = await Promise.all(usernamesPromises) as IUser[];
  const messages = await Promise.all(messagesPromises) as IMessage[];

  const result = [] as IMsg;
  
  userMessages.map((_, index) => {
    result.push({
      message: messages[index].message,
      date: messages[index].date,
      username: usernames[index].username,
      name: usernames[index].name,
      lastName: usernames[index].lastName,
    });
  })

  return { type: null, message: result };
} 

const create = async (chatId: number, userId: number, message: string): Promise<IReturn<string>> => {
  const { type, message: errorMessage } = await newMessageValidation(userId, chatId);
  if (type) return { type, message: errorMessage };
  const { id: messageId } = await messagesModel.create({ message });
  await userMessagesModel.create({ userId, chatId, messageId });
  return { type: null, message: 'Message created successfully' };
}

export default {
  getAll,
  create,
}


