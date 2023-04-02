const express = require("express");
const jwt = require("jsonwebtoken");
const AuthController = require("../controllers/AuthController.js");
const router = express.Router();
const app = express();

const {
  registerValidationRules,
  validateRegister,
} = require("../validations/loginValidation.js");

const auth = new AuthController();

router.middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.json({ error: "Invalid token", status: 403 });
      req.user = user;
    });

    next();
  } else {
    res.sendStatus(401);
  }
};

router.get("/users", router.middleware, (req, res) => {
  auth.index(req, res);
});

router.get("/", (req, res) => {
  auth.index(req, res);
});
router.post(
  "/register",
  registerValidationRules,
  validateRegister,
  (req, res) => {
    auth.register(req, res);
  }
);

router.post("/login", (req, res) => {
  bot.login(req, res);
});

module.exports = router;
