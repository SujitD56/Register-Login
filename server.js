const express = require("express");
const connectDb = require("./Config/dbconnection");
const dotenv = require("dotenv").config();
const path = require("path");

connectDb();
const app = express();

const port = process.env.PORT || 5010;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
