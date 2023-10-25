import { Router } from "express";
import { validateTitle, authentication } from "../middlewares/index.js";

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task.js";

const router = Router();


router.get("/tasks", authentication, getTasks);
router.post("/task", validateTitle, createTask);
router.get("/task", getTaskById);
router.put("/task", validateTitle, updateTask);
router.delete("/task", deleteTask);

export default router;
