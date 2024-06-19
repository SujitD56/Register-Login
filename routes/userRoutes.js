var express = require("express");
var userController = require("../Controller/userController");

const router = express.Router();

router.route("/user/login").post(userController.loginUserControllerFn);
router.route("/user/register").post(userController.createUserControllerFn);

module.exports = router;
