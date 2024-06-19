const jwt = require("jsonwebtoken");
const userService = require("../Service/userService");
const path = require("path");

const registerUser = async (req, res) => {
  try {
    const { Student_name, email, password, mobileno } = req.body;
    if (!Student_name || !email || !password || !mobileno) {
      throw new Error("All fields are mandatory!");
    }

    const imageFileName = req.file ? req.file.filename : null;
    const imagepath = imageFileName
      ? path.join(__dirname, "../public/images", imageFileName)
      : null;
    const userData = {
      Student_name,
      email,
      password,
      image: imagepath,
      mobileno,
    };
    const user = await userService.registerUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokens = await userService.login(email, password);
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const getUserDetails = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     const token = authHeader.split(" ")[1];
//     console.log("token--", token);
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log("tdecoded--", decoded);
//     if (Date.now() >= decoded.exp * 10000) {
//       return res.status(403).json({ error: "Token expired" });
//     }
//     const userDetails = await userService.getUserDetails(decoded.userId);
//     res.json(userDetails);
//   } catch (error) {
//     // res.status(400).json({ error: error.message });
//     if (error.name === "TokenExpiredError") {
//       return res.status(403).json({ error: "Token expired" });
//     } else {
//       return res.status(403).json({ error: "Invalid token" });
//     }
//   }
// };

// const getrefreshuserdetails = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     const retoken = authHeader.split(" ")[1];
//     console.log("token--", retoken);
//     const decoded = jwt.verify(retoken, process.env.REFRESH_TOKEN_SECRET);

//     const userDetails = await userService.getrefreshuserdetails(decoded.userId);
//     res.json(userDetails);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

async function getUserDetails(req, res) {
  try {
    const userDetails = await userService.getUserDetails(req.user.userId);
    res.json(userDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getRefreshUserDetails(req, res) {
  try {
    const userDetails = await userService.getRefreshUserDetails(
      req.user.userId
    );
    res.json(userDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
  login,
  getUserDetails,
  getRefreshUserDetails,
};
