const express = require("express");
const router = express.Router();

const isLoggedin = require("../middleware/isLoggedin");

router.get("/shop", isLoggedin, (req, res) => {
  //   console.log("res", res);
  res.send("Shop Route");
});

module.exports = router;
