import express from "express";
import dotenv from "dotenv";
import BotController from "../controllers/BotController.js";
const router = express.Router();
const bot = new BotController();
router.get("/", (req, res) => {
  bot.login(req, res);
});

export default router;
