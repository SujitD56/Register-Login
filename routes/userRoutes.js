const express = require("express");
const multer = require("multer");
const {
  registerUser,
  login,
  getUserDetails,
  getrefreshuserdetails,
} = require("../controllers/userController");
const userController = require("../controllers/userController");
const { authorize } = require("../middleware/authMiddleware");

const path = require("path");
const fs = require("fs");
const router = express.Router();

// router.use("/public/images", express.static("/public/images"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.use("/register", upload.single("image"), userController.registerUser);

router.use("/login", login);

// router.get("/user-details", getUserDetails, getrefreshuserdetails);

const imageDirectory = path.join(__dirname, "../public/images");

router.get("/image/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(imageDirectory, fileName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

router.get("/user-details", authorize("user"), userController.getUserDetails);
router.get(
  "/refresh-user-details",
  authorize("admin"),
  userController.getRefreshUserDetails
);

module.exports = router;
