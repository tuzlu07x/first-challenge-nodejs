const express = require("express");
const BotController = require("../controllers/BotController.js");
const router = express.Router();
const bot = new BotController();
router.get("/", (req, res) => {
  bot.login(req, res);
});

module.exports = router;
