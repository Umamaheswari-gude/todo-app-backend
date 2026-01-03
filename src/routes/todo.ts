import express from "express";
import { addTask, deleteTask, viewTask } from "../controllers/todoController";

const router = express.Router();

router.post("/", addTask);
router.get("/", viewTask);
router.delete("/:id", deleteTask);

export default router;
