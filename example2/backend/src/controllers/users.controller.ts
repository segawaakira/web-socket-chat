import { Request, Response } from "express";
import userService from '../services/users.service';
import mapError from "../utils/mapError";

const getAll = async (_req: Request, res: Response) => {
  const { message } = await userService.getAll();
  res.status(200).json(message);
}

const getUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { user: { email: userEmail } } = req.body; 
  const { type, message } = await userService.getUser(email, userEmail);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
}

const login = async (req: Request, res: Response) => {
  const user = req.body; 
  const { type, message } = await userService.login(user);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json({ token: message });
}

const signup = async (req: Request, res: Response) => {
  const user = req.body;
  const { type, message } = await userService.signup(user);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json({ message });
}

const update = async (req: Request, res: Response) => {
  const user = req.body;
  const { email } = req.params;
  const { user: { email: userEmail } } = req.body; 
  const { type, message } = await userService.update(user, email, userEmail);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json(message);
}

export default {
  getAll,
  login,
  signup,
  getUser,
  update,
}