interface IMessage {
  id?: number;
  userId: number;
  chatId: number;
  message: string;
  date: string;
}

export default IMessage;