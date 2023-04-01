const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();

// Middleware to parse request body as JSON
app.use(express.json());

// Login form validation rules
const registerValidationRules = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 chars long"),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      if (value === req.body.email) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long"),
];

const validateRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  registerValidationRules,
  validateRegister,
};
