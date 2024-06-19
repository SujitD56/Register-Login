const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const dotenv = require("dotenv").config();
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/authutils");

async function registerUser(userData) {
  const { Student_name, email, password, image, mobileno } = userData;
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    Student_name,
    email,
    password: hashedPassword,
    image,
    mobileno,
  });

  return { _id: user.id, email: user.email, image: user.image };
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password is incorrect");
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    throw new Error("Email or password is incorrect");
  }

  return {
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id),
  };
}

async function getUserDetails(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return { user };
}

async function getrefreshuserdetails(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return { user };
}

module.exports = {
  registerUser,
  login,
  getUserDetails,
  getrefreshuserdetails,
};
