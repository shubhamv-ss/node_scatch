const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

router.get("/", (req, res) => {
  res.send("Owners Route");
});

router.post("/create", async (req, res) => {
  const owner = await ownerModel.find();
  if (owner.length > 0) {
    return res
      .status(403)
      .send("You don't have permission to create more than one owner");
  }

  const createdOwner = await ownerModel.create(req.body);
  res.status(201).send({
    message: "Owner created successfully",
    data: createdOwner,
  });
});

module.exports = router;
