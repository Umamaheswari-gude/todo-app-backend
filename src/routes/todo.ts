import express from "express";
import { addTask } from "../controllers/todoController";

const router = express.Router();

router.post("/", addTask);

export default router;
