const userModel = require("../model/userModel");
const key = "123456789trytryrtyr";
const encryptor = require("simple-encryptor")(key);

const createUserDBService = async (userDetails) => {


  const userModelData = new userModel();

  userModelData.name = userDetails.name;
  userModelData.designation = userDetails.designation;
  userModelData.role = userDetails.role;
  userModelData.salary = userDetails.salary;
  userModelData.email = userDetails.email;
  userModelData.password = encryptor.encrypt(userDetails.password);

  const result = await userModelData.save();
  return "User created successfully";
 
};

const loginUserDBService = async (userDetails) => {
  try {
    const user = await userModel.findOne({ email: userDetails.email });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by email");
  }
};

const getAllUsersDBService = async () => {
  try {
    const allUsers = await userModel.find();
    return allUsers;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all users");
  }
};

module.exports = {
  createUserDBService,
  loginUserDBService,
  getAllUsersDBService,
};
