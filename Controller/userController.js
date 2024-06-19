const userService = require("../service/userService");
const key = "123456789trytryrtyr";
const encryptor = require("simple-encryptor")(key);
const { validationResult } = require("express-validator");

// const loginValidation = require("../validation/uservalidation");

const createUserControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    const status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
      res.send({ status: 200, message: "User created successfully" });
    } else {
      res.send({ status: 404, message: "Error creating user" });
    }
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: err.msg });
  }
};

const loginUserControllerFn = async (req, res, next) => {
  if (
    !("email" in req.body) ||
    !("password" in req.body) ||
    Object.keys(req.body).length !== 2
  ) {
    return res.status(400).json({
      status: 400,
      message: "Invalid request. Only email and password are allowed.",
    });
  }
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userService.loginUserDBService({ email, password });

    if (user && encryptor.decrypt(user.password) === password) {
      console.log("User authenticated successfully");
      res.send({ status: 200, message: "User authenticated successfully" });
    } else {
      res.send({ status: 404, message: "Authentication failed" });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: 500, message: "Invalid Data" });
  }
};

module.exports = {
  createUserControllerFn,
  loginUserControllerFn,
};
