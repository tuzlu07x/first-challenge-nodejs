import express from "express";
import BotController from "../controllers/BotController.js";
import dotenv from "dotenv";
const router = express.Router();
const bot = new BotController();
const result = dotenv.config();

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;
