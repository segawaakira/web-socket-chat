import chatsModel from '../database/models/Chats';
import userChatsModel from '../database/models/UserChat';
import userModel from '../database/models/Users';
import IMyChats from '../interfaces/myChats.interface';
import IReturn from '../interfaces/returns.interface';
import IUser from '../interfaces/user.interface';
import { newChatValidation } from './validations';

const getAll = async (id: number): Promise<IReturn<IMyChats[]>> => {
  const chats = await userChatsModel.findAll({
    where: { userId: id }
  });

  const promises = chats.map(async ({ chatId }) => {
    const userIds = await userChatsModel.findAll({
      where: { chatId }
    });
   return userIds;
  });

  const result = await Promise.all(promises)
  const onlyId = result.flat().map(({ userId }) => userId);
  const listOfuserId = [...new Set(onlyId)].filter((i) => i !== id);

  const usersChat = listOfuserId.map(async (u) => userModel.findByPk(u));
  const promiseUsersChat = await Promise.all(usersChat) as IUser[];
  
  const myUsersChat = promiseUsersChat.map((obj, index) => ({
    name: obj.name,
    lastName: obj.lastName,
    username: obj.username,
    image: obj.image,
    chatId: result[index][0].chatId,
    userId: obj.id,
  })) as IMyChats[];

  return { type: null, message: myUsersChat };
}

const createChat = async (): Promise<number | undefined> => {
  const { id: chatId } = await chatsModel.create();
  return chatId;
}

const create = async (username: string, id: number): Promise<IReturn<string>> => {
  const { type, message } = await newChatValidation(username, id);
  if (type) return { type, message };
  const chatId = await createChat();
  await userChatsModel.create({ userId: id, chatId });
  const result = await userModel.findOne({ where: { username }});
  const { id: userId } = result as IUser;
  await userChatsModel.create({ userId, chatId});
  return { type: null, message: 'Chat created successfully' };
}

export default {
  getAll,
  create,
};
