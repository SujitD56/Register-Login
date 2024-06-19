const uservalidation = require("express-validator");

const validationResultfn = () => {
  return [
    body("email").not().isEmpty().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ];
};

module.exports = { validationResultfn };
