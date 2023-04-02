const express = require("express");
const BotController = require("../controllers/BotController.js");
const router = express.Router();
const {
  registerValidationRules,
  validateRegister,
} = require("../validations/loginValidation.js");
const bot = new BotController();
router.get("/", (req, res) => {
  bot.index(req, res);
});
router.post(
  "/register",
  registerValidationRules,
  validateRegister,
  (req, res) => {
    bot.register(req, res);
  }
);
router.post("/login", (req, res) => {
  bot.login(req, res);
});

module.exports = router;
