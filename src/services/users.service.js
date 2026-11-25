const User = require("../models/users.model");
const AppError = require("../utils/AppError");

class UserService {
  constructor() {}

  createUser = async (fullName, email, phoneNumber, password) => {
    console.log("create user data coming", fullName, email, phoneNumber);

    const exists = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (exists) {
      throw new AppError("Email already exists", 400);
    }

    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password,
    });

    return user;
  };

  getAllUsers = async () => {
    const users = await User.find();

    return users;
  };

  getUserById = async (id) => {
    const user = await User.findById(id);

    if (!user) {
      throw new AppError("User does not exist", 400);
    }

    return user;
  };

  updateUser = async (id, fullName, email, phoneNumber, password) => {
    const exists = await User.findOne({
      email: email.trim().toLowerCase(),
      _id: { $ne: id },
    });

    if (exists) {
      throw new AppError("Email already exists", 400);
    }

    const updateData = {
      fullName,
      email,
      phoneNumber,
    };

    if (password) {
      updateData.password = password;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    return user;
  };

  deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new AppError("User does not exist", 400);
    }

    return user;
  };

  statusChange = async (id, status) => {
    const user = await User.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
      },
    );

    return user;
  };
}

module.exports = UserService;
