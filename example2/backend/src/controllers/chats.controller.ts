import { Request, Response } from "express";
import { chatsService } from "../services";
import mapError from "../utils/mapError";

const getAll = async (req: Request, res: Response) => {
  const { user: { id } } = req.body;
  const { message } = await chatsService.getAll(+id);
  res.status(200).json(message);
}

const create = async (req: Request, res: Response) => {
  const { user: { id } } = req.body;
  const { username } = req.params;
  const { type, message } = await chatsService.create(username, id);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json({ message });
}

export default {
  getAll,
  create,
}