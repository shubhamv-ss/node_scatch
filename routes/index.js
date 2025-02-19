const express = require("express");
const router = express.Router();

const isLoggedin = require("../middleware/isLoggedin");

const {
  addToCart,
  getCarts,
  getProducts,
  removeCart,
} = require("../controllers/cartController");

router.get("/shop", isLoggedin, getProducts);

router.get("/addtocart/:id", isLoggedin, addToCart);

router.get("/removecart/:id", isLoggedin, removeCart);
router.get("/cart", isLoggedin, getCarts);

module.exports = router;
