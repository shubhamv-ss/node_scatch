const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  //   console.log("token", token);

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (err) {
    return res.send("User must be logged in to access this route");
  }
};
