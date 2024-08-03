import IReturn from "../../interfaces/returns.interface";
import chatsService from "../chats.service";

const newMessageValidation = async (userId: number, chatId: number): Promise<IReturn<string>> => {
  const { message: userChats } = await chatsService.getAll(userId);
  const isValid = userChats.find((userChat) => userChat.chatId === chatId);
  if (!isValid) return { type: 'INVALID_VALUE', message: 'Not authorized' };
  return { type: null, message: '' };
};

export default newMessageValidation;