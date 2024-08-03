import { Request, Response } from "express";
import { messagesService } from "../services";
import mapError from "../utils/mapError";

const getAll = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const { user: { id: userId } } = req.body;
  const { type, message } = await messagesService.getAll(+chatId, +userId);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
}

const create = async (req: Request, res: Response) => {
  const { message, user: { id: userId } } = req.body;
  const { chatId } = req.params;
  const { type, message: result } = await messagesService.create(+chatId, +userId, message)
  if (type) return res.status(mapError(type)).json({ message: result });
  res.status(201).json({ message: result });
}

export default {
  getAll,
  create,
}