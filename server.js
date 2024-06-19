const express = require("express");
const app = express();
const mongoose = require("mongoose");
var routes = require("./routes/userRoutes");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected");
  })
  .catch((error) => {
    console.log("error connected to db", error);
  });

app.use(express.json());
app.use(routes);
app.listen(3010, function check(error) {
  if (error) console.log("Error....!!!!");
  else console.log("Started....!!!!");
});
