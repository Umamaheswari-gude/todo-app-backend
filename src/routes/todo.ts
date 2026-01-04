import express from "express";
import { addTask, deleteTask, viewTask, editTask } from "../controllers/todoController";

const router = express.Router();

router.post("/", addTask);
router.get("/", viewTask);
router.delete("/:id", deleteTask);
router.put("/:id", editTask);

export default router;
