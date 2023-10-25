import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { createLocalDB } from "./helpers/index.js";
import { eventsLogger } from "./middlewares/index.js";

dotenv.config();

const { SERVER_PORT, DATA_FILE_NAME } = process.env;
const app = express();

createLocalDB(DATA_FILE_NAME);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(eventsLogger);

readdirSync("./routes").map(async (route) => {
  app.use("/api/v1/", (await import(`./routes/${route}`)).default);
});

app.listen(SERVER_PORT, () => {
  console.log("server is lestining on ..." + SERVER_PORT);
});

export default app;
