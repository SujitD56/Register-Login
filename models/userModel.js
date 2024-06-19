const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { required } = require("joi");

const userSchema = mongoose.Schema(
  {
    Student_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email address already taken"],
    },

    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    mobileno: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("employees", userSchema);
