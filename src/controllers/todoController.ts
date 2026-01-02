import { Request, Response } from "express";
import { addTasks } from "../services/todoService";

export const addTask = async (req: Request, res: Response) => {
  try {
    const task = await addTasks(req.body);
    res.status(201).json(task);
  } catch {
    res.status(500).json({ error: "Failed to add tasks" });
  }
};
