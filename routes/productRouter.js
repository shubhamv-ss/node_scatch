const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const productExist = await productModel.findOne({ name: req.body.name });
    if (productExist) {
      return res.status(400).send({
        message: "Product already exists",
      });
    } else {
      const product = await productModel.create(req.body);
      res.status(201).send({
        message: "Product created successfully",
        data: product,
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "Error creating product",
      error: err.message,
    });
  }
});

module.exports = router;
