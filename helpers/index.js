import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import winston from "winston";

export const createLocalDB = async (fileName) => {
  try {
    // Check if the file exists
    await fs.access(fileName);
  } catch (err) {
    try {
      await fs.writeFile(fileName, JSON.stringify({ tasks: [] }));
      return;
    } catch (writeErr) {
      console.error("Error writing the file:", writeErr);
    }
  }
};


export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});


export const generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};
