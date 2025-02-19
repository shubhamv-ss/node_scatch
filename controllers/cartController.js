const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

module.exports.getProducts = async (req, res) => {
  // /shop?sortBy=price&order=asc
  // /shop?sortBy=price&order=desc
  // /shop?minDiscount=10
  try {
    const { sortBy, order, minDiscount } = req.query;
    let query = {};
    let sort = {};
    if (minDiscount) {
      query.discount = { $gte: Number(minDiscount) };
    }
    if (sortBy) {
      sort[sortBy] = order === "desc" ? -1 : 1;
    }
    const products = await productModel.find(query).sort(sort);
    res.status(200).send({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

module.exports.addToCart = async (req, res) => {
  const productId = req.params.id;
  const user = await userModel.findOne({ email: req.user.email });
  user.cart.push(productId);
  await user.save();

  const product = await productModel.findOne({ _id: productId });

  res.status(200).send({
    message: "Product added to cart successfully",
    data: product,
  });
};

module.exports.removeCart = async (req, res) => {
  const productId = req.params.id;
  const user = await userModel.findOne({ email: req.user.email });
  user.cart = user.cart.filter((id) => id.toString() !== productId);
  await user.save();
  res.status(200).send({
    message: "Product removed from cart successfully",
  });
};
module.exports.getCarts = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email }).populate({
      path: "cart",
      model: "Product",
      select: "name price description",
    });
    res.status(200).send({
      message: "Cart fetched successfully",
      data: user.cart,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error fetching cart",
      error: error.message,
    });
  }
};
