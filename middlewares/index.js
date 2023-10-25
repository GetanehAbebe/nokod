import jwt from "jsonwebtoken";
import { logger } from "../helpers/index.js";

export const validateTitle = (req, res, next) => {
  const { title } = req.body;
  if (title.trim().length <= 3) {
    return res.status(400).send({
      message: "Title's length must be more than 3 charterers",
    });
  }
  next();
};

export const eventsLogger = (req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
};

export const authentication = (req, res, next) => {
  const apiKey = req.headers["x-api-key"] || req.query.api_key;

  if (!apiKey) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Please enter API key." });
  } else {
    const decoded = jwt.decode(apiKey, process.env.TOKEN_SECRET, {
      complete: true,
    });
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized. Invalid API key." });
    }
  }
  next();
};
