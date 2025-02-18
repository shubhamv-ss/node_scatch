const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).send({
        message: "User Already Exists",
        data: [],
      });
    }

    bcrypt.genSalt(process.env.SALT_ROUND, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).send({
            message: err.message,
          });
        } else {
          const user = await userModel.create({ name, email, password: hash });
          const token = generateToken(user);

          res.cookie("token", token);
          res.status(200).send({
            message: "User Created Successfully",
            data: user,
          });
        }
      });
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        message: "User Not Found",
        data: [],
      });
    }
    console.log(user.password);
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = generateToken(user);
        res.cookie("token", token);
        res.status(200).send({
          message: "User Logged In Successfully",
          data: user,
        });
      } else {
        res.status(401).send({
          message: "Invalid Credentials",
          data: [],
        });
      }
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    message: "User Logged Out Successfully",
  });
};
