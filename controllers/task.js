import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { generateToken } from "../helpers/index.js";
const { DATA_FILE_NAME: fileName = "data.json" } = process.env;

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const data = await fs.readFile(fileName);
    const uniqueId = uuidv4(); //generated id
    const createDate = new Date().toUTCString();
    const newTask = {
      id: uniqueId,
      title,
      description,
      createDate,
    };
    const { tasks } = JSON.parse(data);
    tasks.push(newTask);
    const token = generateToken({ id: uniqueId }, "7d");
    await fs.writeFile(fileName, JSON.stringify({ tasks }));
    return res.status(201).json({ ...newTask, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const data = await fs.readFile(fileName);
    const { tasks } = JSON.parse(data);
    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await fs.readFile(fileName);
    const { tasks } = JSON.parse(data);
    const task = tasks.find((element) => element.id === id);
    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(200).json({
        error: "The task you asked not exist",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id, title, desctiption } = req.body;
    const data = await fs.readFile(fileName);
    const { tasks } = JSON.parse(data);
    const task = tasks.find((element) => element.id === id);
    if (task) {
      //need to find a better way
      task.title = title || task.title;
      task.description = desctiption || task.description;
      await fs.writeFile(fileName, JSON.stringify({ tasks }));
      return res.status(200).json(task);
    } else {
      return res.status(200).json({
        message: "The task you asked not exist",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await fs.readFile(fileName);
    const { tasks } = JSON.parse(data);
    const updatedTasks = tasks.filter((element) => element.id !== id);
    if (updatedTasks.length !== tasks.length) {
      await fs.writeFile(fileName, JSON.stringify({ tasks: updatedTasks }));
      return res.status(200).json({
        message: "The task deleted!",
      });
    } else {
      return res.status(200).json({
        message: "The task you asked not exist",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
