import express from "express";
import { addTask, viewTask } from "../controllers/todoController";

const router = express.Router();

router.post("/", addTask);
router.get("/", viewTask);

export default router;
