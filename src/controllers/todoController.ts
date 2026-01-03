import { Request, Response } from "express";
import { addTasks, deleteTasks, editTasks, viewTasks } from "../services/todoService";

export const addTask = async (req: Request, res: Response) => {
  const { name, description, status, priority, deadline } = req.body;
  if (!name || !description || !status || !priority || !deadline) {
    res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const task = await addTasks(req.body);
    res.status(201).json(task);
  } catch {
    res.status(500).json({ error: "Failed to add tasks" });
  }
};

export const viewTask = async (req: Request, res: Response) => {
    try {
        const tasks = await viewTasks();
        res.status(200).json(tasks);
    } catch {
        res.status(500).json({ error: "Failed to fetch tasks" })
    }  
};

export const deleteTask = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        await deleteTasks(id);
        res.status(200).json({ message: "Task deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the task" })
    }
}

export const editTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedTask = await editTasks(id, req.body);
      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };