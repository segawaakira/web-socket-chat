import userChatModel from '../../database/models/UserChat';
import IReturn from '../../interfaces/returns.interface';

const messagesValidation = async (chatId: number, userId: number): Promise<IReturn<string>> => {
  const userMessages = await userChatModel.findAll({ where: { chatId }});
  const isValid = userMessages.find((userMessage) => userMessage.userId === userId);
  if (!isValid) return { type: 'INVALID_VALUE', message: 'Not authorized'};
  return { type: null, message: '' };
}

export default messagesValidation;